<script setup>
  const { roadmap } = useRoadmap()
</script>

<template>
  <ModalTemplate v-for="road in roadmap" :id="`roadmap_${road.q}_${road.y}`">
    <div class="mod-road">
      <div class="cover">
        <div :style="`background-image:url(${road.cover});`"></div>
      </div>
      <div class="head">
        <h2>{{ road.q }} {{ road.y }}</h2>
        <p class="desc">{{ $t(road.desc) }}</p>
        <div class="ln">
          <svg viewBox="0 0 30.9 13">
            <use xlink:href="#i-shape" />
          </svg>
        </div>
      </div>
      <div class="prog sub">
        <div class="left">{{ $t('all.step') }} {{ road.step_ok }} / {{ road.step }}</div>
        <div class="middle">
          <div :style="`width:${road.percent}%`"></div>
        </div>
        <div class="right">
          {{ road.percent }}%
        </div>
      </div>
      <ul class="lst-road">
        <li v-for="item in road.list" :class="`etat-${item.etat}`">
          <div class="check">
            <svg viewBox="0 0 128.411 128.411">
              <use xlink:href="#i-check-road"/>
            </svg>
          </div>
          <p>{{ $t(item.name) }}</p>
        </li>
      </ul>
    </div>
  </ModalTemplate>
</template>