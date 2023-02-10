<script setup>
  const cards = {
    launcher: {
      img: '/img/play/launcher.svg',
      title: 'play.launcher.title',
      desc: 'play.launcher.desc',
      link: 'https://cdn.kryxivia.io/KryxiviaInstaller.exe'
    },
    client: {
      img: '/img/play/client.svg',
      title: 'play.client.title',
      desc: 'play.client.desc',
      link: 'http://client.kryxivia.io/'
    }
  }
</script>

<template>
  <ModalTemplate id="play">
    <img src="/img/logo-kryxivia.png" class="lg" loading="lazy" width="500" height="169" alt="Kryxivia" draggable="false">
    <div class="intro">{{ $t('play.intro') }}</div>
    <div class="lst">
      <div v-for="card in cards">
        <ModalCard :infos="card" />
      </div>
    </div>
  </ModalTemplate>
</template>