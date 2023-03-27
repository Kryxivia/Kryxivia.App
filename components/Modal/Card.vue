<script setup>
  defineProps({
    infos: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div :style="infos.disabled && {opacity: 0.5, pointerEvents:'none'}">
    <a :href="infos.link || '/'" :title="$t(infos.title)" target="_blank" class="i-connect">
      <div v-if="infos.img" class="card logo">
        <img :src="infos.img" width="150" height="150" :alt="$t(infos.title)" loading="lazy" draggable="false">
      </div>
      <div class="cont">
        <div class="name">{{ $t(infos.title) }}</div>
        <div class="txt">{{ $t(infos.desc) }}</div>
      </div>
    </a>
  </div>
</template>