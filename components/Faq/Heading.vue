<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="card heading" v-html="title"></div>
</template>