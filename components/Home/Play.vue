<template>
  <div class="butt-c">
    <button class="butt" @click="$modal.open('play')">
      {{ $t('home.play') }}
      <small>Kryxivia</small>
    </button>
    <button class="butt butt-trai" @click="$modal.open('trailer', $youtube('#yt-trailer', 'play'))">
      {{ $t('home.trailer') }}
      <small>Kryxivia</small>
    </button>
  </div>
</template>