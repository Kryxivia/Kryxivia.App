<script setup>
  import { bosses } from '@/datas'
  import gsap from 'gsap'

  const { t } = useI18n()
  const localePath = useLocalePath()
  const route = useRoute()
  const router = useRouter()
  const bossId = route.params.bossId

  /** Boss informations */
  const boss = bosses[bossId]

  /** If boss doesnt exist */
  if (!boss) {
    router.push(localePath('/bosses'))
  }
  
  /** translate for boss */
  function trans(id) {
    return t(`bosses-${bossId}.${id}`)
  }

  onMounted(() => {

    /** Animation top */
    gsap.fromTo('.top-boss .bg > *', {y:'0%',scale:1}, {y:'25%',scale:1.1,ease:'none',scrollTrigger:{
      trigger: '.top-boss',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }})

    /** Animation description */
    gsap.fromTo('.sec-boss .bg > *', {y:'0%'}, {y:'33%',ease:'none',scrollTrigger:{
      trigger: '.sec-boss',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }})

  })
</script>

<template>
  <Smooth>
    <div class="top-page top-default top-boss">
      <div class="l" data-reveal>
        <div class="bg">
          <div :style="`background-image:url(${boss.bg});`"></div>
        </div>
      </div>
      <div class="r">
        <div class="cont">
          <img :src="boss.logo" class="logo" :alt="`${boss.name} • Kryxivia`" width="600" height="252" loading="lazy" draggable="false" data-reveal="top">
          <LnHr />
          <div class="sub" data-reveal="bottom">{{ boss.name }}</div>
          <h1 data-reveal="bottom">{{ trans('h1') }}</h1>
          <div class="intro" data-reveal="bottom">
            <p>{{ $t('bosses-slug.progress') }}</p>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>