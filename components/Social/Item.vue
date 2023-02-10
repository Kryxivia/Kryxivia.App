<script setup>
  defineProps({
    social: {
      type: Object,
      required: true
    },
    link: String
  })
</script>

<template>
  <a :href="link || social.link" :title="social.name" target="_blank" rel="noopener noreferrer">
    <Icon :icon="social.id" :viewbox="`0 0 ${social.viewbox}`" />
  </a>
</template>
