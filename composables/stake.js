import { ref } from "vue";
import Web3 from "web3";
import kryxiviaStakingABI from "@/abi/kryxiviaStakingABI";
import erc20ABI from "~~/abi/erc20ABI";

export const useStake = () => {
  const { account } = useUser();

  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const metamaskProvider =
    typeof window !== "undefined" && ref(window?.web3.currentProvider);
  const web3 = computed(() => {
    const address = account.value;
    if (metamaskProvider.value && metamaskProvider.value.selectedAddress) {
      return new Web3(metamaskProvider.value);
    } else {
      return new Web3(provider.value);
    }
  });

  // staking contract
  const stakingContractAddressSepolia =
    "0xcC6621bD7706c5AD2040B04D0Fa7065B6280139c";
  const stakingContractAddress = "0x76725d7d77Fa2074Fb40963Da6EB3106FF6eCb4C";
  const stakingContractInstance =
    web3.value &&
    new web3.value.eth.Contract(kryxiviaStakingABI, stakingContractAddress);

  const kxaContractAddress = "0x2223bF1D7c19EF7C06DAB88938EC7B85952cCd89";
  const kxaContractInstance =
    web3.value && new web3.value.eth.Contract(erc20ABI, kxaContractAddress);

  const stakedKXA = ref(0);
  const unlockedAPR = ref(0);
  const lockedAPR = ref(0);
  const amountLockDays = ref(undefined);
  const isStakedLocked = ref(null);
  const kxaLockEndTimestampMs = ref(0);
  const totalStakedKXA = ref(0);
  const totalStakers = ref(0);
  const waitingPercentAPR = ref(0);
  const claimableKXA = computed(() => {
    return (stakedKXA.value * waitingPercentAPR.value) / 100;
  });

  // txns states
  const stakeTxState = ref({
    loading: false,
    message: null,
  });
  const unstakeTxState = ref({
    loading: false,
    message: null,
  });
  const claimTxState = ref({
    loading: false,
    message: null,
  });

  // txhash for completed tx
  const txHash = ref(null);

  // error messages
  const stakeError = ref(null);
  const unstakeError = ref(null);
  const claimError = ref(null);

  const getAmountOfBlocksDaily = async () => {
    const amountOfBlocksDaily = await stakingContractInstance.methods
      ._amountOfBlocksDaily()
      .call();

    return amountOfBlocksDaily;
  };

  const getStakerInfos = async () => {
    if (!account.value) return;
    const stakerInfo = await stakingContractInstance.methods
      .getStakerInfos(account.value)
      .call();
    stakedKXA.value = web3.value.utils.fromWei(stakerInfo.amount, "ether");

    const amountOfBlocksDaily = await getAmountOfBlocksDaily();
    
    // get current block
    const currentBlock = await web3.value.eth.getBlockNumber();

    // calculation for end block timestamp
    const endBlockTimestamp =
      ((Number(stakerInfo.end_block) - currentBlock) /
        Number(amountOfBlocksDaily)) *
        24 *
        60 *
        60 *
        1000 +
      Date.now();

    kxaLockEndTimestampMs.value = endBlockTimestamp;
    isStakedLocked.value = stakerInfo.locked;
  };

  const getTotalStakedKXA = async () => {
    const totalStakedRes = await stakingContractInstance.methods
      ._totalStacked()
      .call()
      .catch((err) => {
        console.log(err);
      });
    totalStakedKXA.value = web3.value.utils.fromWei(totalStakedRes, "ether");
  };

  const getTotalStakers = async () => {
    const totalStakersRes = await stakingContractInstance.methods
      .getTotalStakers()
      .call()
      .catch((err) => {
        console.log(err);
      });
    totalStakers.value = totalStakersRes;
  };

  const getWaitingPercentAPR = async () => {
    if (!account.value) return;
    const waitingPercentAPRRes = await stakingContractInstance.methods
      .getWaitingPercentAPR(account.value)
      .call()
      .catch((err) => {
        console.log(err);
      });
    waitingPercentAPR.value = web3.value.utils.fromWei(
      waitingPercentAPRRes,
      "ether"
    );
  };

  const getStakingAPR = async () => {
    const stakingAPRRes = await stakingContractInstance.methods
      .getStakingAPR()
      .call()
      .catch((err) => {
        console.log(err);
      });

    unlockedAPR.value = web3.value.utils.fromWei(
      stakingAPRRes.unlockedAPR,
      "ether"
    );
    lockedAPR.value = web3.value.utils.fromWei(
      stakingAPRRes.lockedAPR,
      "ether"
    );
  };

  const getAmountLockDays = async () => {
    try {
      const amountLockDaysRes = await stakingContractInstance.methods
        ._amountLockDays()
        .call();
      amountLockDays.value = amountLockDaysRes;
    } catch (err) {
      console.log(err);
    }
  };

  const stakeKXA = async (amount, lock) => {
    const amountWei = web3.value.utils.toWei(String(amount), "ether");

    // allowance for kxa contract
    const allowance = await kxaContractInstance.methods
      .allowance(account.value, stakingContractAddress)
      .call();
    if (Number(allowance) < Number(amountWei)) {
      try {
        stakeTxState.value.loading = true;
        stakeTxState.value.message = "Approving KXA allowance...";
        const tx = await kxaContractInstance.methods
          .approve(stakingContractAddress, amountWei)
          .send({ from: account.value });
      } catch (err) {
        stakeTxState.value.loading = false;
        stakeError.value = err.message;
        console.log(err);
      }
    }

    // gas price
    // const gasPrice = await web3.value.eth.getGasPrice();

    try {
      stakeTxState.value.loading = true;

      // test call to detect errors
      const txCall = await stakingContractInstance.methods
        .stakeKXA(amountWei, lock)
        .call({ from: account.value });

      stakeTxState.value.message = "Staking, waiting for confirmations...";

      const tx = await stakingContractInstance.methods
        .stakeKXA(amountWei, lock)
        .send({ from: account.value });

      stakeTxState.value.message = "Successfully completed!";
      txHash.value = tx.transactionHash;
      stakeTxState.value.loading = false;
      stakeError.value = null;

      // refresh data
      getStakerInfos();
      getTotalStakers();
      getTotalStakedKXA();
    } catch (err) {
      stakeTxState.value.loading = false;
      stakeTxState.value.message = null;
      stakeError.value = err.message.split("{")[0];
      console.log(err.message.split("{")[0]);
    }
  };

  const unStakeKXA = async () => {
    try {
      unstakeTxState.value.loading = true;

      // test call to detect errors
      const txCall = await stakingContractInstance.methods
        .unStakeKXA()
        .call({ from: account.value });

      unstakeTxState.value.message = "Unstaking, waiting for confirmations...";

      const tx = await stakingContractInstance.methods
        .unStakeKXA()
        .send({ from: account.value });

      unstakeTxState.value.message = "Successfully completed!";
      txHash.value = tx.transactionHash;
      unstakeTxState.value.loading = false;
      unstakeError.value = null;

      // refresh data
      getStakerInfos();
      getTotalStakers();
      getTotalStakedKXA();
    } catch (err) {
      unstakeTxState.value.loading = false;
      unstakeTxState.value.message = null;
      unstakeError.value = err.message.split("{")[0];
      console.log(err.message.split("{")[0]);
    }
  };

  const claimRewards = async () => {
    try {
      claimTxState.value.loading = true;

      // test call to detect errors
      const txCall = await stakingContractInstance.methods
        .claimAPR()
        .call({ from: account.value });

      claimTxState.value.message =
        "Claiming rewards, waiting for confirmations...";

      const tx = await stakingContractInstance.methods
        .claimAPR()
        .send({ from: account.value });

      claimTxState.value.message = `Successfully completed!`;
      txHash.value = tx.transactionHash;
      claimTxState.value.loading = false;
      claimError.value = null;

      console.log(tx);

      // refresh data
      getWaitingPercentAPR();
    } catch (err) {
      claimTxState.value.loading = false;
      claimTxState.value.message = null;
      claimError.value = err.message.split("{")[0];
      console.log(err.message.split("{")[0]);
    }
  };

  // 15 second interval to refresh data
  watchEffect(async (onInvalidate) => {
    const refreshDataInterval = setInterval(() => {
      getStakerInfos();
      getTotalStakers();
      getTotalStakedKXA();
      getWaitingPercentAPR();
      getStakingAPR();
      getAmountLockDays();
    }, 15000);

    onInvalidate(() => {
      clearInterval(refreshDataInterval);
    });
  });

  watchEffect(async () => {
    if (account.value) {
      getStakerInfos();
      getTotalStakers();
      getTotalStakedKXA();
      getWaitingPercentAPR();
      getStakingAPR();
      getAmountLockDays();
    }
  });

  return {
    stakedKXA,
    totalStakedKXA,
    totalStakers,
    waitingPercentAPR,
    claimableKXA,
    claimRewards,
    stakeKXA,
    unStakeKXA,
    unlockedAPR,
    lockedAPR,
    isStakedLocked,
    kxaLockEndTimestampMs,
    amountLockDays,
    stakeTxState,
    unstakeTxState,
    claimTxState,
    stakeError,
    unstakeError,
    claimError,
    txHash,
  };
};
