import Web3 from "web3";
import erc20ABI from "~~/abi/erc20ABI";

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

  // kxa price calculation
  const kxaPrice = () => {
    const ETHKXAPoolAddress = "0x0b1A02b8CaD71BeE94e7fd0845Fd9853Fa1b46ff";
    const ETHKXAPoolContract = new web3.value.eth.Contract(
      erc20ABI,
      ETHKXAPoolAddress
    );

    const ETHUSDCPoolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
    const ETHUSDCPoolContract = new web3.value.eth.Contract(
      erc20ABI,
      ETHUSDCPoolAddress
    );

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
        console.error(error);
        // Handle error
      });
  };

  watch(balance, () => {
    console.log("called price");
    kxaPrice();
  });

  return {
    kxa,
    kxs,
  };
};
