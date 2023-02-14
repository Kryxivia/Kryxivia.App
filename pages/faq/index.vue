<script setup>
  import { faq } from '@/datas'
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('faq.h1')" icon="icon/faq" />
    <div class="ct">
      <div class="faq">
        <div class="intro" data-reveal="bottom">{{ $t('faq.start') }}</div>
        <div class="lst-faq">
          <div v-for="cat, slug in faq">
            <FaqCard :cat="cat" :slug="slug" data-reveal="bottom" />
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>