<script setup>
  defineProps({
    cat: {
      type: Object,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  })
  const localePath = useLocalePath()
</script>

<template>
  <NuxtLink :to="localePath('/faq/' + slug)" class="card card-hover">
    <div class="card icon">
      <img :src="`/img/faq/${cat.icon}.svg`" width="100" height="100" loading="lazy" :alt="`Kryxivia • ${$t('faq.title')} • ${$t(`faq.${slug}.title`)}`">
    </div>
    <div class="titre">{{ $t(`faq.${slug}.title`) }}</div>
  </NuxtLink>
</template>