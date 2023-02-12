<script setup>
  import gsap from 'gsap'

  onMounted(() => {

    gsap.defaults({
      ease: 'none'
    })

    /** Animation section top */
    const top = gsap.timeline({scrollTrigger:{
      trigger: '.top-kryxivia .bgs',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }})
    top
      .fromTo('.top-kryxivia .bg-1 > *', {y:'0%'}, {y:'35%'}, 'a')
      .fromTo('.top-kryxivia .bg-2 > *', {y:'0%'}, {y:'30%'}, 'a')
      .fromTo('.top-kryxivia .bg-3 > *', {y:'0%'}, {y:'25%'}, 'a')
      .fromTo('.top-kryxivia .bg-4 > *', {y:'0%'}, {y:'20%'}, 'a')
      .fromTo('.top-kryxivia .bg-5 > *', {y:'0%'}, {y:'15%'}, 'a')
      .fromTo('.top-kryxivia .bg-6 > *', {y:'0%'}, {y:'10%'}, 'a')
      .fromTo('.top-kryxivia .bg-7 > *', {y:'0%'}, {y:'5%'}, 'a')
      .fromTo('.top-kryxivia .bg-8 > *', {y:'0%'}, {y:'15%'}, 'a')

    /** Animation section story */
    gsap.fromTo('.sec-story .bg > *', {y:'-20%'}, {y:'20%',scrollTrigger:{
      trigger: '.sec-story .bg',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }}, 'a')

  })
</script>

<template>
  <Smooth>
    <KryxiviaTop />
    <KryxiviaStory />
    <KryxiviaMap />
  </Smooth>
</template>