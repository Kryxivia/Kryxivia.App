<script setup>
  const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div>
    <div class="lang" :style="`--n:${$i18n.locales.length}`">
      <div class="lg-lst">
        <div v-for="lang in $i18n.locales" class="lg-li" :class="{'active': lang.code === $i18n.locale}">
          <NuxtLink :to="switchLocalePath(lang.code)">{{ lang.code.toUpperCase() }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>