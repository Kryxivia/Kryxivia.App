<script setup>
  defineProps({
    content: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <figure>
    <img :src="`/img/devblog/${content.c}`" loading="lazy" :alt="content.a">
    <figcaption>{{ content.a }}</figcaption>
  </figure>
</template>