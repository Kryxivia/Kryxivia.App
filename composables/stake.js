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
  const stakingContractAddress = "0xbbbe904a9d55c2ecca2abab4111750fc5e59cbf7";
  const contractInstance =
    web3.value &&
    new web3.value.eth.Contract(kryxiviaStakingABI, stakingContractAddress);

  const kxaContractAddress = "0x2223bF1D7c19EF7C06DAB88938EC7B85952cCd89";
  const kxaContractInstance =
    web3.value && new web3.value.eth.Contract(erc20ABI, kxaContractAddress);

  const stakedKXA = ref(0);
  const totalStakedKXA = ref(0);
  const totalStakers = ref(0);
  const waitingPercentAPR = ref(0);
  const claimableKXA = computed(() => {
    return stakedKXA.value * waitingPercentAPR.value;
  });

  const stakeKXA = async (amount, lock) => {
    console.log("amount", amount, lock);
    // allowance for kxa contract
    const allowance = await kxaContractInstance.methods
      .allowance(account.value, stakingContractAddress)
      .call();
    if (allowance < amount) {
      const tx = await kxaContractInstance.methods
        .approve(stakingContractAddress, amount)
        .send({ from: account.value });
      console.log("approve tx", tx);
    }

    // gas price
    const gasPrice = await web3.value.eth.getGasPrice();

    console.log(gasPrice);

    const tx = await contractInstance.methods
      .stakeKXA(amount, lock)
      .send({ from: account.value });
    console.log("stake tx", tx);
  };

  const unStakeKXA = async () => {
    const tx = await contractInstance.methods
      .unStakeKXA()
      .send({ from: account.value });
    console.log("unstake tx", tx);
  };

  const getStakerInfos = async () => {
    const stakerInfo = await contractInstance.methods
      .getStakerInfos(account.value)
      .call();
    stakedKXA.value = stakerInfo.amount;
    console.log("staker info", stakerInfo);
    console.log("staker amount staked", stakerInfo.amount);
  };

  const getTotalStakedKXA = async () => {
    const totalStakedRes = await contractInstance.methods
      ._totalStacked()
      .call();
    totalStakedKXA.value = totalStakedRes;
    console.log("total amount staked", totalStakedRes);
  };

  const getTotalStakers = async () => {
    const totalStakersRes = await contractInstance.methods
      .getTotalStakers()
      .call();
    totalStakers.value = totalStakersRes;
    console.log("totale amount of users staking", totalStakersRes);
  };

  const getWaitingPercentAPR = async () => {
    const waitingPercentAPRRes = await contractInstance.methods
      .getWaitingPercentAPR(account.value)
      .call()
      .catch((err) => {
        // console.log(err);
      });
    waitingPercentAPR.value = waitingPercentAPRRes;
    console.log(
      "waiting percent apr (apr claimable by user right now)",
      waitingPercentAPRRes
    );
  };

  const claimRewards = async () => {
    const tx = await contractInstance.methods
      .claimAPR()
      .send({ from: account.value });
    console.log("claim tx", tx);
  };

  watchEffect(async () => {
    if (account.value) {
      getStakerInfos();
      getTotalStakers();
      getTotalStakedKXA();
      getWaitingPercentAPR();
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
  };
};
