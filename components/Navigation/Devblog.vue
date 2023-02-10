<script setup>
  import { devblog } from '@/datas'
  const localePath = useLocalePath()
</script>

<template>
  <div class="blog">
    <div class="title">
      <span>{{ $t('header.dev') }}</span>
      <div>
        <NuxtLink :to="localePath('/devblog')" :title="$t('header.view')">{{ $t('header.view') }}</NuxtLink>
      </div>
    </div>
    <div class="lst">
      <div v-for="actu, id in devblog">
        <DevblogMenu :id="id" :actu="actu" />
      </div>
    </div>
  </div>
</template>