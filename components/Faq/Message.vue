<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="card card-ans card-message" data-reveal="bottom">
    <FaqHeading :title="title" />
  </div>
</template>