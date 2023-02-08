<script setup>

  import gsap from 'gsap'

  const { stateNavigation } = useNavigation()
  
  /** Init timeline navigation animation */
  const tl = gsap.timeline({paused:true})
  onMounted(() => {
    tl
      .set('#n', {opacity:1})
      .fromTo('#n .bg', 1, {height:0}, {height:'100%',ease:"power2.out"}, 'a')
      .fromTo('#n .title > *', .8, {y:'105%'}, {y:'0%',ease:"power3.out",delay:.3}, 'a')
      .fromTo('#n nav ul li', .8, {opacity:0,y:50}, {opacity:1,y:0,ease:"power2.out",stagger:.02,delay:.3}, 'a')
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
      tl.timeScale(3).reverse()
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

  /** Close nav when change page */
  const route = useRoute()
  watch(route, () => closeNavigation())

</script>

<template>
  <div>
    <button id="bnv" type="button" class="bnv" :aria-label="$t('header.nav')" @click="toggleNavigation">
      <svg viewBox="0 0 100 100">
        <title>{{ $t('header.nav') }}</title>
        <path class="l-1" d="M0,42h62c13,0,6,26-4,16L35,35" />
        <path class="l-2" d="M0,50h70" />
        <path class="l-3" d="M0,58h62c13,0,6-26-4-16L35,65" />
      </svg>
    </button>
  </div>
  <div id="n">
    <div class="n-wrapper">
      <div class="n-ct">
        <div class="n-grid">
          <div class="nav">
            <div class="title">
              <span>{{ $t('header.nav') }}</span>
            </div>
            <NavigationMenu />
          </div>
          <!-- <NavigationDevblog /> -->
          <div class="foot">
            <LnShape />
            <div class="foot-ct">
              <Copyright class="left" />
              <SocialList class="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>