<script setup>
  defineProps({
    name: String
  })
</script>

<template>
  <div :class="name ? 'bg bg-' + name : 'bg'">
    <div></div>
  </div>
</template>