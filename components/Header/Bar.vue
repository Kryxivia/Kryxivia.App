<script setup>
  const localePath = useLocalePath()
  const { title } = useMetaData()
</script>

<template>
  <header id="h" class="bars">
    <NuxtLink class="logo" :to="localePath('/')">
      <img src="/img/logo-kryxivia.png" width="500" height="169" alt="Kryxivia" draggable="false">
    </NuxtLink>
    <HeaderSpace n="1" />
    <HeaderLangSwitcher />
    <div class="ln ln-2"></div>
    <!-- <div class="nft-viewer">
      <a href="https://app.kryxivia.io/" class="btn" target="_blank">
        {{ $t('nav.apps.nft') }}
      </a>
    </div> -->
    <!-- <HeaderSpace n="3" /> -->
    <div class="nft-viewer">
      <a href="https://kryxivia.io/app/staking" class="btn">
        {{ $t('nav.apps.staking') }}
      </a>
      <div class="new-sticker">
        <p class="new-text">New</p>  
      </div>
    </div>
    <HeaderSpace n="3" />
    <div class="butt">
      <button type="button" class="btn" @click="$modal.open('play')">{{ $t('header.play') }}</button>
    </div>
    <HeaderSpace n="4" />
    <NavigationNav />
    <div class="shape">
      <div class="title">{{ title }}</div>
      <Icon icon="shape" viewbox="0 0 30.9 13" />
    </div>
  </header>
</template>