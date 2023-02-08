<script setup>
  defineProps({
    n: {
      type: String
    }
  })
</script>

<template>
  <div :class="`ln ln-${n} ln-space`"></div>
</template>