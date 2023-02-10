<script setup>
  const route = useRoute()
  const idPage = computed(() => route.name.split('___')[0])
</script>

<template>
  <div id="mod">
    <ModalPlay />
    <ModalRoadmap v-if="idPage === 'roadmap'" />
  </div>
</template>