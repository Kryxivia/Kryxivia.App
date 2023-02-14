<script setup>
  import gsap from 'gsap'
  
  const { roadmap } = useRoadmap()
  const { $sound } = useNuxtApp()

  onMounted(() => {

    const horizontal = isMobile() ? false : true

    /** Update ambiant sound */
    $sound.update({
      all: {
        play: false
      },
      music: {
        play: true,
        vol: .15
      },
      grotte: {
        play: true
      }
    })

    /** Rain effect */
    useRain('.front-row', '.back-row')

    /** Default config gsap */
    gsap.defaults({
      ease: 'none'
    })

    /** Ambient animation */
    const ambient = gsap.timeline({scrollTrigger:{
      horizontal: horizontal,
      trigger: '.road-welcome',
      start: 'left left',
      endTrigger: '.road-' + (roadmap.length-1),
      end: 'right right',
      scrub: true
    }})
    ambient
      .fromTo('.bg-road > div', {x:'0%'}, {x:'-33.33%'}, 'a')
      .fromTo('.stal-road > div', {x:'0%'}, {x:'-50%'}, 'a')

    /** Road animation */
    const road_gsap = (el, next) => {

      const roadEl = `.road-${el}`
      const roadNext = `.road-${next}`
      const trigger = roadEl + ' .ln'
     
      // progress line
      const start = el === 'welcome' ? 40 : 70
      gsap.fromTo(roadEl + ' .progress', {width:'0%'}, {width:'100%',scrollTrigger:{
        horizontal: horizontal,
        trigger: trigger,
        start: `left ${start}%`,
        end: 'right 50%',
        scrub: true
      }})

      // reveal
      const reveal = gsap.timeline({scrollTrigger:{
        horizontal: horizontal,
        trigger: trigger,
        start: 'right 50%'
      }})
      reveal
        .fromTo(roadNext + ' .ln', 1, {opacity:0}, {opacity:1,ease:'power2.out'}, 'a')
        .fromTo(roadNext + ' .draw', 4, {strokeDasharray:'0 999'}, {strokeDasharray:'999 999'}, 'a')
        .fromTo(roadNext + ' .illu .cover, '+ roadNext +' .illu .shadow', 2, {opacity:0}, {opacity:1,ease:'power2.out',delay:.2}, 'a')
        .fromTo(roadNext + ' .q span, '+ roadNext +' .y span', 1.5, {opacity:0,top:50}, {opacity:1,top:0,stagger:.15,ease:'power2.out'}, 'a')
        .fromTo(roadNext + ' .title .sub', 1.5, {opacity:0,left:15}, {opacity:1,left:0,ease:'power2.out',delay:.3}, 'a')
        .fromTo(roadNext + ' .cont > *', 1.5, {opacity:0,left:-50}, {opacity:1,left:0,stagger:.15,ease:'power2.out',delay:.5}, 'a')

      // hidden
      gsap.fromTo(roadEl + ' .hid', {opacity:1}, {opacity:0,scrollTrigger:{
        horizontal: horizontal,
        trigger: trigger,
        start: 'right 70%',
        end: 'left 0%',
        scrub: true
      }})

      // cover
      gsap.fromTo(roadEl + ' .cover > *', {x:'0%'}, {x:'-33.33%',scrollTrigger:{
        horizontal: horizontal,
        trigger: roadEl +' .illu',
        start: 'right right',
        end: 'right left',
        scrub: true
      }})

    }

    /** Init road gsap */
    for (let i in roadmap){
      let n = i * 1 + 1
      if (n === 1){
        i = 'welcome'
        n = 0
      } else {
        i = i - 1
        n = i + 1
      }
      road_gsap(i, n)
    }

  })
  
  onBeforeUnmount(() => $sound.reset())

</script>

<template>
  <Smooth :footer="false" :horizontal="true" class="road-hori">
    <div class="road-welcome">
      <div>
        <div class="sub">{{ $t('roadmap.discover') }}</div>
        <div class="tit">
          <h1>{{ $t('roadmap.h1') }}</h1>
          <div class="ln">
            <div class="progress"/>
          </div>
        </div>
      </div>
    </div>
    <div v-for="road, key in roadmap" :class="`road road-${key}`">
      <div class="head">
        <div class="illu">
          <div class="cover">
            <div :style="`background-image:url(${road.cover});`"/>
          </div>
          <div class="shadow"/>
          <svg viewBox="0 0 100 100">
            <circle class="draw" cx="50" cy="50" r="49.5"></circle>
          </svg>
        </div>
        <div class="title">
          <div class="q">
            <strong class="hid">
              <span>{{ road.q }}</span>
            </strong>
            <div v-if="road.step !== road.step_ok" class="sub">{{ $t('all.progress') }}</div>
            <div v-else class="sub color-success">{{ $t('all.finish') }}</div>
            <div class="ln">
              <div class="progress"/>
            </div>
          </div>
          <div class="y">
            <strong class="hid">
              <span>{{ road.y }}</span>
            </strong>
          </div>
          <div class="cont">
            <h2>{{ $t(road.desc) }}</h2>
            <div class="step">
              {{ $t('all.step') }} {{ road.step_ok }}/{{ road.step }} • 
              <span class="percent">{{ road.percent }}%</span>
            </div>
            <button type="button" class="bn" @click="$modal.open('roadmap_' + road.q + '_' + road.y)">{{ $t('all.view_details') }}</button>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
  <div class="shadow-road"/>
  <div class="stal-road">
    <div/>
  </div>
  <Bg name="road" />
  <div class="rain front-row"/>
  <div class="rain back-row"/>
</template>