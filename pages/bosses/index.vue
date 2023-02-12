<script setup>
  import { bosses } from '@/datas'
  import gsap from 'gsap'

  const localePath = useLocalePath()

  onMounted(() => {
    gsap.fromTo('.stal-road > div', {x:'0%'}, {x:'-25%',ease:'none',scrollTrigger:{
      horizontal: true,
      trigger: '.boss-w',
      start: 'left left',
      end: 'right right',
      scrub: true
    }}, 'a')
  })
</script>

<template>
  <Smooth :footer="false" :horizontal="true" class="boss-hori">
    <div class="boss-w" :style="`--nb:${bosses.length}`" data-reveal>
      <div v-for="boss, key in bosses" @click="$router.push(localePath('/bosses/' + key))" class="boss">
        <div class="cont">
          <img :src="boss.logo" class="logo" :alt="`${boss.name} • Kryxivia`" width="600" height="252" loading="lazy" draggable="false">
          <LnHr />
          <div class="name">{{ boss.name }}</div>
          <div class="butt">
            <NuxtLink :to="localePath('/bosses/' + key)" class="bn" :title="`${$t('all.discover')} ${boss.name}`">{{ $t('all.discover') }}</NuxtLink>
          </div>
        </div>
        <div class="bg">
          <div :style="`background-image:url(${boss.bg});`"></div>
        </div>
      </div>
    </div>
  </Smooth>
  <div class="stal-road">
    <div></div>
  </div>
</template>

