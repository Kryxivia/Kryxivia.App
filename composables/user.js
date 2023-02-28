import { ref } from "vue";
import Web3 from "web3";
import WalletConnect from "@walletconnect/client";

export const useUser = () => {
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
  const isConnect = computed(() =>
    typeof window !== "undefined" ? account.value : false
  );

  /* web3Login */
  const provider = typeof window !== "undefined" && ref(window?.ethereum);
  const web3 = computed(() => {
    if (provider.value) {
      return new Web3(provider.value);
    }
  });
  const account = ref(null);
  const connector = ref(null);

  watchEffect(async () => {
    if (typeof window !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        account.value = accounts[0];
      });
      const accounts = await web3.value.eth.getAccounts();
      account.value = accounts[0];
    }

    return () => {
      typeof window !== "undefined" &&
        window?.ethereum?.removeAllListeners("accountsChanged");
    };
  });

  async function connectMetamask() {
    if (provider.value) {
      await provider.value.request({ method: "eth_requestAccounts" });
      const accounts = await web3.value.eth.getAccounts();
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
    await connector.createSession();
    await provider.value.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
    const accounts = await web3.value.eth.getAccounts();
    account.value = accounts[0];
    connector.value = connector;
  }
  async function disconnect() {
    await provider.value.request({ method: "wallet_disconnect" });
    account.value = null;
    connector.value = null;
  }

  /** State balance */
  const balance = useState("userBalance", () => {
    return {
      kxa: 14848978.054,
      kxs: 74854966,
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

  return {
    connectMetamask,
    connectFormatic,
    connectBinanceWallet,
    connectWalletConnect,
    disconnect,
    account,
    currency,
    address,
    isConnect,
    balance,
    perso,
    nft,
  };
};
