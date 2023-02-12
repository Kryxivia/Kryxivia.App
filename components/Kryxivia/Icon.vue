<script setup>
  defineProps({
    icon: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div :id="`icon-${icon}`" :class="`icon icon-${icon}`">
    <img :src="`/img/city/${icon}.png`" loading="lazy" width="290" height="270" :alt="$t(`kryxivia.map.${icon}.title`)" draggable="false">
  </div>
</template>