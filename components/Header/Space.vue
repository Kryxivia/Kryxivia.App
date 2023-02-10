<script setup>
  defineProps({
    n: String
  })
</script>

<template>
  <div :class="`ln ln-${n} ln-space`"></div>
</template>