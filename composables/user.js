import { ref } from "vue";
import { onMounted } from "@vue/composition-api";
import Web3 from "web3";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import erc20ABI from "@/abi/erc20ABI";

export const useUser = () => {
  const account = ref(null);
  const connector = ref(null);
  const isConnectLoading = ref(true);
  const isMetamask = ref(false);

  /** State address */
  const address = useState("userAddress", () => {
    // return '0x2b4d87eff06f22798c30dc4407c7d83429aaa9abc'
    return "";
  });

  /** Currency Fiat */
  const currency = useState("userCurrency", () => {
    return "USD";
  });

  /** If user connected */
  const isConnect = computed(() => Boolean(account.value));

  /* web3Login */
  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const web3 = computed(() => {
    if (provider.value) {
      return new Web3(provider.value);
    }
  });

  watchEffect(async (onInvalidate) => {
    if (typeof window !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        account.value = accounts[0];
      });

      window.web3.currentProvider.on("accountsChanged", (accounts) => {
        account.value = accounts[0];
      });
    }

    onInvalidate(() => {
      typeof window !== "undefined" &&
        window?.ethereum?.removeAllListeners("accountsChanged");
    });
  });

  onMounted(async () => {
    if (typeof window !== "undefined") {
      const accounts = await web3.value.eth.getAccounts();
      if (accounts[0]) {
        account.value = accounts[0];
        address.value = accounts[0];
      }

      const metamaskAccounts = await new Web3(
        window.web3.currentProvider
      ).eth.getAccounts();
      if (metamaskAccounts[0]) {
        account.value = metamaskAccounts[0];
        address.value = metamaskAccounts[0];
      }

      if (account.value) {
        address.value = accounts[0];
      }
      isConnectLoading.value = false;
    }
  });

  onUnmounted(() => {
    typeof window !== "undefined" &&
      window?.ethereum?.removeAllListeners("accountsChanged");
  });

  async function connectMetamask() {
    if (provider.value) {
      await window.web3.currentProvider.request({
        method: "eth_requestAccounts",
      });
      const accounts = await new Web3(
        window.web3.currentProvider
      ).eth.getAccounts();
      account.value = accounts[0];
      if (account.value) {
        address.value = accounts[0];
      }
    }
  }

  async function connectFormatic() {
    if (provider.value) {
      const apiKey = "YOUR_API_KEY";
      const rpcUrl = "https://rpc-mainnet.maticvigil.com";
      provider.value.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x1",
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: ["https://etherscan.io"],
          },
        ],
      });
      const accounts = await web3.value.eth.getAccounts();
      account.value = accounts[0];
    }
  }

  async function connectBinanceWallet() {
    if (provider.value) {
      const accounts =
        typeof window !== "undefined" &&
        (await window?.BinanceChain.request({
          method: "eth_requestAccounts",
        }));
      account.value = accounts[0];
    }
  }

  async function connectWalletConnect() {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },
    });
    // await connector.connect(); //TODO fix problem when multiple wallets are available in browser
    // await provider.value.request({
    //   method: "wallet_switchEthereumChain",
    //   params: [{ chainId: "0x38" }],
    // });
    // const accounts = await web3.value.eth.getAccounts();
    account.value = connector.accounts[0];
    connector.value = connector;
  }

  const connectOKXWallet = async () => {
    if (provider.value) {
      const accounts = await window.okxwallet.request({
        method: "eth_requestAccounts",
      });
      account.value = accounts[0];
      address.value = accounts[0];
    }
  };

  async function disconnect() {
    await provider.value.request({ method: "wallet_disconnect" });
    account.value = null;
    connector.value = null;
  }

  /** State balance */
  const balance = useState("userBalance", () => {
    return {
      kxa: 0,
      kxs: 0,
    };
  });

  /** State perso */
  const perso = useState("userPerso", () => {
    return {
      name: "Orichy",
      ilvl: 658,
    };
  });

  /** State NFT */
  const nft = [
    {
      type: "uncommon",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Bash",
      purity: 25,
    },
    {
      type: "common",
      illu: "https://i.seadn.io/gcs/files/c7fecc470f3878851d1117397dbc5873.png?auto=format&w=750",
      category: "Chestplate",
      title: "Archer Chest",
      ilvl: 145,
    },
    {
      type: "epic",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Rain of Arrows",
      purity: 25,
    },
    {
      type: "uncommon",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Bash",
      purity: 25,
    },
  ];

  // KXA contract
  const kxaContractAddress = "0x2223bF1D7c19EF7C06DAB88938EC7B85952cCd89";
  const kxaContractInstance =
    web3.value && new web3.value.eth.Contract(erc20ABI, kxaContractAddress);

  const getKXAUserBalance = async () => {
    const userBalance = await kxaContractInstance.methods
      .balanceOf(account.value)
      .call();

    balance.value.kxa = Number(web3.value.utils.fromWei(userBalance));
    return userBalance;
  };

  watch(account, () => {
    if (account.value) {
      getKXAUserBalance();
    }
  });

  // 15 seconds interval to get user balance
  watchEffect(async (onInvalidate) => {
    const refreshBalanceInterval = setInterval(() => {
      if (account.value) {
        getKXAUserBalance();
      }
    }, 15000);

    onInvalidate(() => {
      clearInterval(refreshBalanceInterval);
    });
  });

  return {
    connectMetamask,
    connectFormatic,
    connectBinanceWallet,
    connectWalletConnect,
    connectOKXWallet,
    disconnect,
    account,
    currency,
    address,
    isConnect,
    balance,
    perso,
    nft,
    isConnectLoading,
  };
};
