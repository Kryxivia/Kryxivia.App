<script setup>
  import { tokens } from '@/datas'
  useTokenPage()
  const token = tokens.kxs
</script>

<template>
  <Smooth>
    <div class="top-page top-token">
      <div class="l">
        <div class="tok">
          <img src="/img/tokens/kxs-shape.png" alt="$KXS" loading="lazy" draggable="false">
        </div>
        <div class="plan-w">
          <div v-for="i in 3" :class="`plan plan-${i}`">
            <img :src="`/img/tokens/plan-${i}_kxs.png`" alt="KXS" loading="lazy" draggable="false">
          </div>
          <Bg />
        </div>
      </div>
      <div class="r">
        <div class="cont">
          <img src="/img/kxs-token_kryxivia.png" class="ico" width="100" height="100" alt="KXS" data-reveal="top">
          <LnHr />
          <div class="sub" data-reveal="bottom">{{ token.address }}</div>
          <h1 data-reveal="bottom">{{ $t('token-kxs.h1') }}</h1>
          <div class="intro" data-reveal="bottom">
            <p>{{ $t('token-kxs.intro') }}</p>
          </div>
          <div class="txt" data-reveal="bottom">
            <p>{{ $t('token-kxs.txt1') }}</p>
            <p>{{ $t('token-kxs.txt2') }}</p>
            <p>{{ $t('token-kxs.txt3') }}</p>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>
