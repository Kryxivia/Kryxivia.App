<script setup>
  defineProps({
    name: String
  })
</script>

<template>
  <div :class="name ? 'ln ln-hr ln-hr-' + name : 'ln ln-hr'" data-reveal>
    <Icon icon="shape" viewbox="0 0 30.9 13" />
  </div>
</template>