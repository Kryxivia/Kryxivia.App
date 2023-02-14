<script setup>
  const { idPage } = useMetaData()
</script>

<template>
  <div id="mod">
    <ModalPlay />
    <ModalRoadmap v-if="idPage === 'roadmap'" />
    <ModalTrailer v-if="idPage === 'index'" />
  </div>
</template>