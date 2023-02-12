<template>
  <div class="top-page top-default top-kryxivia">
    <div class="l" data-reveal>
      <div class="bgs">
        <Bg v-for="i in 8" :name="i" />
      </div>
    </div>
    <div class="r">
      <div class="cont">
        <img src="/img/icon/fountain.svg" class="ico" width="100" height="100" :alt="$t('kryxivia.title')" data-reveal="top">
        <LnHr />
        <h1 data-reveal="bottom">{{ $t('kryxivia.h1') }}</h1>
        <div class="intro" data-reveal="bottom">
          <p>{{ $t('kryxivia.intro') }}</p>
        </div>
        <div class="txt" data-reveal="bottom">
          <p>{{ $t('kryxivia.txt1') }}</p>
          <p>{{ $t('kryxivia.txt2') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>