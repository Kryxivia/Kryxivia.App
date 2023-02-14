<script setup>
  import { devblog } from '@/datas'
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('devblog.h1')" icon="icon/devblog" />
    <div class="devblog">
      <div class="ct">
        <div class="lst">
          <DevblogItem v-for="actu, index in devblog" :index="index" :actu="actu" />
        </div>
      </div>
    </div>
  </Smooth>
</template>