<script setup>
  defineProps({
    bg: {
      type: Array,
      required: true
    },
    bird: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
  <div class="back">
    <Bg v-for="name in bg" :name="name" />
    <Bird v-if="bird" />
  </div>
</template>