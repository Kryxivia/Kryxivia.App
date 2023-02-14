<script setup>
  defineProps({
    content: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <h2>{{ content.c }}</h2>
</template>