export const useUser = () => {

  /** State address */
  const address = useState('userAddress', () => {
    // return '0x2b4d87eff06f22798c30dc4407c7d83429aaa9abc'
    return ''
  })

  /** Currency Fiat */
  const currency = useState('userCurrency', () => {
    return 'USD'
  })

  /** If user connected */
  const isConnect = computed(() => address.value !== '' ? true : false)

  /** Fake loggin */
  function fakeLogin() {
    address.value = '0x2b4d87eff06f22798c30dc4407c7d83429aaa9abc'
  }

  /** State balance */
  const balance = useState('userBalance', () => {
    return {
      kxa: 14848978.054,
      kxs: 74854966
    }
  })

  /** State perso */
  const perso = useState('userPerso', () => {
    return {
      name: 'Orichy',
      ilvl: 658
    }
  })

  /** State NFT */
  const nft = [
    {
      type: "uncommon",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Bash",
      purity: 25
    },
    {
      type: "common",
      illu: "https://i.seadn.io/gcs/files/c7fecc470f3878851d1117397dbc5873.png?auto=format&w=750",
      category: "Chestplate",
      title: "Archer Chest",
      ilvl: 145
    },
    {
      type: "epic",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Rain of Arrows",
      purity: 25
    },
    {
      type: "uncommon",
      illu: "https://i.seadn.io/gcs/files/3c93079829c16720fecf41ac780e0ff3.png?auto=format&w=750",
      category: "gem",
      title: "Gem of Bash",
      purity: 25
    }
  ]

  return {
    fakeLogin,
    currency,
    address,
    isConnect,
    balance,
    perso,
    nft
  }

}