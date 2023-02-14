<script setup>
  import { bosses, catalysts } from '@/datas'
  import gsap from 'gsap'

  const localePath = useLocalePath()

  onMounted(() => {
    gsap.fromTo('.top-dj .bg > *', {y:'0%',scale:1}, {y:'25%',scale:1.1,ease:'none',scrollTrigger:{
      trigger: '.top-dj',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }})
  })
</script>

<template>
  <Smooth>
    <div class="top-page top-default top-dj">
      <div class="l" data-reveal>
        <Bg />
      </div>
      <div class="r">
        <div class="cont">
          <img src="/img/icon/dungeon.svg" class="ico" width="100" height="100" :alt="$t('dungeons.title')" data-reveal="top">
          <LnHr />
          <h1 data-reveal="bottom">{{ $t('dungeons.h1') }}</h1>
          <div class="intro" data-reveal="bottom">
            <p>{{ $t('dungeons.intro') }}</p>
          </div>
          <div class="txt" data-reveal="bottom">
            <p>{{ $t('dungeons.txt1') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sec sec-dj sec-dj-cata">
      <div class="ct">
        <div class="sub" data-reveal="bottom">{{ $t('dungeons.catalysts.sub') }}</div>
        <h2 class="title" data-reveal="bottom">{{ $t('dungeons.catalysts.title1') }}</h2>
        <div class="p">
          <p data-reveal="bottom">{{ $t('dungeons.catalysts.txt1') }}</p>
          <p data-reveal="bottom">{{ $t('dungeons.catalysts.txt2') }}</p>
        </div>
        <div class="lst">
          <div v-for="catalyst in catalysts">
            <div class="card" data-reveal="bottom">
              <img :src="`/img/dungeon/catalysts/${catalyst.img}`" width="600" height="600" :alt="$t(catalyst.title)" loading="lazy">
              <div class="sub">{{ $t('all.lvl') }} {{ catalyst.lvl }}</div>
              <div class="name">{{ $t(catalyst.title) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sec sec-dj sec-dj-boss">
      <div class="ct">
        <div class="sub" data-reveal="bottom">{{ $t('dungeons.boss.sub') }}</div>
        <h2 class="title" data-reveal="bottom">{{ $t('dungeons.boss.title1') }}</h2>
        <div class="p">
          <p data-reveal="bottom">{{ $t('dungeons.boss.txt1') }}</p>
        </div>
        <div class="lst">
          <div v-for="boss, key in bosses">
            <NuxtLink :to="localePath('/bosses/' + key)" class="card" :title="`${$t('all.discover')} ${boss.name}`" data-reveal="bottom">
              <div class="cont">
                <img :src="boss.logo" :alt="`${boss.name} • Kryxivia`" class="logo" width="600" height="252" loading="lazy" draggable="false">
              </div>
              <div class="bg">
                <div :style="`background-image:url(${boss.bg});`"/>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>