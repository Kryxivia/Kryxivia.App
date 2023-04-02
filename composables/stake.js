import { ref } from "vue";
import Web3 from "web3";
import kryxiviaStakingABI from "@/abi/kryxiviaStakingABI";
import erc20ABI from "~~/abi/erc20ABI";

export const useStake = () => {
  const { account } = useUser();

  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const web3 = computed(() => {
    if (provider.value) {
      return new Web3(provider.value);
    }
  });

  // staking contract
  const stakingContractAddress = "0xcC6621bD7706c5AD2040B04D0Fa7065B6280139c";
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
    return stakedKXA.value * waitingPercentAPR.value;
  });

  const getStakerInfos = async () => {
    const stakerInfo = await stakingContractInstance.methods
      .getStakerInfos(account.value)
      .call();
    stakedKXA.value = web3.value.utils.fromWei(stakerInfo.amount, "ether");
    const endBlockTimestamp = await web3.value.eth.getBlock(
      stakerInfo.end_block
    );
    kxaLockEndTimestampMs.value = endBlockTimestamp.timestamp * 1000;
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
      const tx = await kxaContractInstance.methods
        .approve(stakingContractAddress, amountWei)
        .send({ from: account.value });
    }

    // gas price
    // const gasPrice = await web3.value.eth.getGasPrice();

    const tx = await stakingContractInstance.methods
      .stakeKXA(amountWei, lock)
      .send({ from: account.value });

    // refresh data
    getStakerInfos();
    getTotalStakers();
    getTotalStakedKXA();
  };

  const unStakeKXA = async () => {
    const tx = await stakingContractInstance.methods
      .unStakeKXA()
      .send({ from: account.value });

    // refresh data
    getStakerInfos();
    getTotalStakers();
    getTotalStakedKXA();
  };

  const claimRewards = async () => {
    const tx = await stakingContractInstance.methods
      .claimAPR()
      .send({ from: account.value });

    getWaitingPercentAPR();
  };

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
  };
};
