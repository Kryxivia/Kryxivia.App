<script setup>
  defineProps({
    name: String | Number
  })
</script>

<template>
  <div :class="name ? 'bg bg-' + name : 'bg'">
    <div></div>
  </div>
</template>