import Web3 from "web3";
import erc20ABI from "~~/abi/erc20ABI";
import ETHUSDCPoolABI from "~~/abi/ethUsdcPoolABI";

export const usePriceToken = () => {
  const { balance } = useUser();
  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const web3 = computed(() => {
    if (provider.value) {
      return new Web3(provider.value);
    }
  });

  /** Price per KXA */
  const kxa = useState("priceKxa", () => {
    return {
      EUR: 0.01466,
      USD: 0.01567,
    };
  });

  /** Price per KXS */
  const kxs = useState("priceKxs", () => {
    return {
      EUR: 0.00001466,
      USD: 0.00001567,
    };
  });

  // fallback price getter for kxa
  const fetchKxaPrice = () => {
    fetch("https://api.coinbrain.com/public/coin-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        1: ["0x2223bF1D7c19EF7C06DAB88938EC7B85952cCd89"],
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          const kxaPrice = data[0].priceUsd;
          kxa.value.USD = kxaPrice;
        });
      })
      .catch((error) => {
        console.error("Unable to get accurate KXA price", error);
      });
  };

  // kxa price calculation
  const kxaPrice = async () => {
    const WETHKXAPoolAddress = "0x0b1A02b8CaD71BeE94e7fd0845Fd9853Fa1b46ff";

    const WETHUSDCPoolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";

    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const WETHContract = new web3.value.eth.Contract(erc20ABI, WETHAddress);

    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const USDCContract = new web3.value.eth.Contract(erc20ABI, USDCAddress);

    const kxaContractAddress = "0x2223bF1D7c19EF7C06DAB88938EC7B85952cCd89";
    const kxaContract = new web3.value.eth.Contract(
      erc20ABI,
      kxaContractAddress
    );

    try {
      const [
        wethQuantityInWETHUSDCPool,
        usdcQuantityWETHUSDCInPool,
        wethQuantityInWETHKXAPool,
        kxaQuantityInWETHKXAPool,
      ] = await Promise.all([
        WETHContract.methods.balanceOf(WETHUSDCPoolAddress).call(),
        USDCContract.methods.balanceOf(WETHUSDCPoolAddress).call(),
        WETHContract.methods.balanceOf(WETHKXAPoolAddress).call(),
        kxaContract.methods.balanceOf(WETHKXAPoolAddress).call(),
      ]);

      const kxaPriceInUsdc =
        ((usdcQuantityWETHUSDCInPool /
          1e6 /
          (wethQuantityInWETHUSDCPool / 1e18)) *
          (wethQuantityInWETHKXAPool / 1e18)) /
        (kxaQuantityInWETHKXAPool / 1e18);

      kxa.value.USD = kxaPriceInUsdc;
      console.log("KXA price in USD:", kxaPriceInUsdc);
    } catch (error) {
      console.error(
        "Error occurred while fetching or calculating KXA price:",
        error
      );
      console.error("Falling back to API price fetch...");
      fetchKxaPrice();
    }
  };

  onMounted(() => {
    if (balance.value) {
      kxaPrice();
    }
  });

  return {
    kxa,
    kxs,
  };
};
