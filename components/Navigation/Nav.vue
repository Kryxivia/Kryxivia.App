<script setup>
  const { toggleNavigation } = useNavigation()
</script>

<template>
  <div>
    <button id="bnv" type="button" class="bnv" :aria-label="$t('header.nav')" @click="toggleNavigation">
      <svg viewBox="0 0 100 100">
        <title>{{ $t('header.nav') }}</title>
        <path class="l-1" d="M0,42h62c13,0,6,26-4,16L35,35" />
        <path class="l-2" d="M0,50h70" />
        <path class="l-3" d="M0,58h62c13,0,6-26-4-16L35,65" />
      </svg>
    </button>
  </div>
  <div id="n">
    <div class="n-wrapper">
      <div class="n-ct">
        <div class="n-grid">
          <div class="nav">
            <div class="title">
              <span>{{ $t('header.nav') }}</span>
            </div>
            <NavigationMenu />
          </div>
          <!-- <NavigationDevblog /> -->
          <div class="foot">
            <LnShape />
            <div class="foot-ct">
              <Copyright class="left" />
              <SocialList class="right" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>