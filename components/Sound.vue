<template>
  <button id="sound" type="button" class="sound" @click="$sound.toggle()" :aria-label="$t('bottom.sound')">
    <span v-for="i in 7"/>
  </button>
</template>