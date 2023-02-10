import gsap from 'gsap'

export const useNavigation = () => {

  /**
   * State navigation
   * Open = true / Close = false
   */
  let stateNavigation = ref(false)

  /** Init timeline navigation animation */
  let tl
  onMounted(() => {
    tl = gsap.timeline({paused:true})
    tl
      .set('#n', {opacity:1})
      .fromTo('#n .bg', 1, {height:0}, {height:'100%',ease:"power2.out"}, 'a')
      .fromTo('#n .title > *', .8, {y:'105%'}, {y:'0%',ease:"power3.out",delay:.3}, 'a')
      .fromTo('#n nav ul li', .8, {opacity:0,y:50}, {opacity:1,y:0,ease:"power2.out",stagger:.02,delay:.3}, 'a')
      .fromTo('#n .actu', .8, {opacity:0,y:50}, {opacity:1,y:0,ease:"power2.out",stagger:.1,delay:.3}, 'a')
      .fromTo('#n .foot .ln', .5, {opacity:0}, {opacity:1,delay:.7}, 'a')
      .fromTo('#n .foot .ln', 1, {width:30}, {width:'100%',ease:"power3.inOut",delay:.7}, 'a')
      .fromTo('#n .foot .left', 1, {opacity:0,x:-30}, {opacity:1,x:0,ease:"power3.out",delay:.9}, 'a')
      .fromTo('#n .foot .right li', 1.2, {opacity:0}, {opacity:1,ease:"power3.out",stagger:-.05,delay:.9}, 'a')
  })

  /** Open navigation */
  function openNavigation() {
    if (!stateNavigation.value) {
      tl.timeScale(1).restart()
      stateNavigation.value = true  
      document.body.classList.add('onav')
    }
  }

  /** Close navigation */
  function closeNavigation() {
    if (stateNavigation.value) {
      tl.timeScale(2).reverse()
      stateNavigation.value = false
      document.body.classList.remove('onav')
    }
  }

  /** Toggle navigation */
  function toggleNavigation() {
    if (stateNavigation.value) {
      closeNavigation()
    } else {
      openNavigation()
    }
  }

  // /** Close nav when change page */
  const route = useRoute()
  watch(route, () => closeNavigation())

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
    openNavigation,
    closeNavigation,
    toggleNavigation,
    menuItems
  }

}