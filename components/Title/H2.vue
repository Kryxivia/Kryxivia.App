<script setup>
  defineProps({
    txt: String
  })
</script>

<template>
  <h2 class="m-h2">
    <span class="ln"><span class="arrow-right"></span></span>
    <span class="tit">{{ txt }}</span>
    <span class="ln"><span class="arrow-left"></span></span>
  </h2>
</template>