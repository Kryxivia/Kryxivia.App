export const useNavigation = () => {

  /**
   * State navigation
   * Open = true / Close = false
   */
  const stateNavigation = useState('stateNavigation', () => false)

  /** Items menu navigation */
  const menuItems = {
    kryxivia: {
      title: "Kryxivia",
      list: {
        home: { name: 'nav.kryxivia.home', link: "/" },
        kxa: { name: 'nav.kryxivia.kxa', link: "/token/kxa" },
        kxs: { name: 'nav.kryxivia.kxs', link: "/token/kxs" },
        team: { name: 'nav.kryxivia.team', link: "/team" },
        devblog: { name: 'nav.kryxivia.dev', link: "/devblog" },
        roadmap: { name: 'nav.kryxivia.road', link: "/roadmap" },
        litepaper: { name: 'nav.kryxivia.lite', link: "/pdf/kryxivia_litepaper.pdf", blank: true }
      }
    },
    game: {
      title: 'header.game',
      list: {
        patchnote: { name: 'patchnotes.nav', link: "/patchnotes" },
        kryxivia: { name: 'nav.game.kryxivia', link: "/kryxivia" },
        faction: { name: 'nav.game.faction', link: "/factions" },
        mine: { name: 'nav.game.dungeon', link: "/dungeons" },
        boss: { name: 'nav.game.boss', link: "/bosses" },
        kryxit: { name: 'nav.game.kryxit', link: "/#" },
        equipment: { name: 'nav.game.equipment', link: "/#" },
        pvp: { name: 'nav.game.pvp', link: "/#" }
      }
    },
    apps: {
      title: 'header.apps',
      list: {
        marketplace: { name: 'nav.apps.market', link: "/app/marketplace" },
        staking: { name: 'nav.apps.staking', link: "https://app.kryxivia.io/stake", blank: true},
        nft: { name: 'nav.apps.nft', link: "https://app.kryxivia.io/", blank: true },
        client: { name: 'nav.apps.client', link: "http://client.kryxivia.io/", blank: true },
        leaderboard: { name: 'nav.apps.leaderboard', link: "/leaderboard" },
        faq: { name: 'nav.apps.faq', link: "/faq" }
      }
    }
  }

  return {
    stateNavigation,
    menuItems
  }

}