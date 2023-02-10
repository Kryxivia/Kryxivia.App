<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo('#f .bg > *', {y:'-25%'}, {y:'0%',ease:'none',scrollTrigger:{
      trigger: '#f',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true
    }})
  })
</script>

<template>
  <footer id="f">
    <img src="/img/top-footer.png" class="top" width="500" height="169" alt="Kryxivia" draggable="false">
    <div class="ct cont">
      <div class="left">
        <img class="logo" src="/img/logo-kryxivia.png" loading="lazy" width="500" height="169" alt="Kryxivia" draggable="false">
        <SocialList class="social" />
      </div>
      <NavigationMenu />
      <div class="nl">
        <div class="leg">{{ $t('newsletter.title') }}</div>
        <p>{{ $t('newsletter.txt') }}</p>
        <form class="card">
          <input :placeholder="$t('newsletter.address')" type="mail">
          <button type="submit">
            <Icon icon="send" viewbox="0 0 25 25" />
          </button>
          <div class="hidden">{{ $t('all.soon') }}</div>
        </form>
      </div>
    </div>
    <div class="ct copy">
      <LnShape />
      <Copyright />
    </div>
    <Bg />
  </footer>
</template>