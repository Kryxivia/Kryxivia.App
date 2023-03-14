import { ref } from "vue";
import Web3 from "web3";
import kryxiviaStakingABI from "@/abi/kryxiviaStakingABI";
import erc20ABI from "~~/abi/erc20ABI";
// import { ethers } from "ethers";
// import { Web3Provider } from "@ethersproject/providers";

export const useStake = () => {
  const { account } = useUser();

  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const web3 = computed(() => {
    if (provider.value) {
      return new Web3(provider.value);
    }
  });

  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETHUSDCPoolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
  const WETHKXAPoolAddress = "0x0b1A02b8CaD71BeE94e7fd0845Fd9853Fa1b46ff";

  // staking contract
  const stakingContractAddress = "0xbbbe904a9d55c2ecca2abab4111750fc5e59cbf7";
  const contractInstance =
    web3.value &&
    new web3.value.eth.Contract(kryxiviaStakingABI, stakingContractAddress);

  // const providerEthers =
  //   typeof window !== "undefined" && new Web3Provider(window.ethereum);
  // const signer = providerEthers && providerEthers.getSigner();
  // const stakeContractKXAEthers =
  //   providerEthers &&
  //   new ethers.Contract(stakingContractAddress, kryxiviaStakingABI, signer);

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

  // const stakeKXA = async (amount, lock) => {
  //   console.log("amount", amount, lock);
  //   // allowance for kxa contract
  //   const allowance = await kxaContractInstance.methods
  //     .allowance(account.value, stakingContractAddress)
  //     .call();

  //   if (allowance < amount) {
  //     const tx = await kxaContractInstance.methods
  //       .approve(stakingContractAddress, amount)
  //       .send({ from: account.value });
  //     console.log("approve tx", tx);
  //   }

  //   const tx = await stakeContractKXAEthers.stakeKXA(String(amount), false);
  //   console.log("stake tx", tx);
  // };

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
