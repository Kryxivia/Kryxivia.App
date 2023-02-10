<script setup>

  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  defineProps({
    h1: {
      type: String,
      required: true
    },
    bg: {
      type: String,
      default: '/img/bg-page.jpg'
    },
    icon: String
  })

  onMounted(() => {

    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo('#title .bg > *', {y:'0%',opacity:1}, {y:'25%',opacity:.3,ease:'none',scrollTrigger:{
      trigger: '#title .bg',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }})

  })

</script>

<template>
  <div id="title">
    <div class="ct">
      <img v-if="icon" :src="`/img/${icon}.svg`" loading="lazy" width="100" height="100" :alt="h1" data-reveal="top">
      <h1 data-reveal="bottom">{{ h1 }}</h1>
    </div>
    <div class="bg">
      <div :style="`background-image:url(${bg});`"></div>
    </div>
  </div>
</template>