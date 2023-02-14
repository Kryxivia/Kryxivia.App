<script setup>
  defineProps({
    content: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="p" v-html="content.c"></div>
</template>