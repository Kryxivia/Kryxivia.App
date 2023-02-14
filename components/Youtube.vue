<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="yt-video">
    <div :id="`yt-${name}`" class="yt">
      <iframe :src="`https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1&controls=0&vq=hd1080`" width="560" height="315" controls="0" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen/>
    </div>
  </div>
</template>