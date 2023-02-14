<script setup>
  const localePath = useLocalePath()
</script>

<template>
  <div class="hm-ct">
    <div class="ct">
      <div class="sub">{{ $t('home.sec3.sub1') }}</div>
      <h2 v-html="$t('home.sec3.title1')"/>
      <div class="tok">
        <div>
          <div class="p">
            <p>{{ $t('home.sec3.txt1') }}</p>
            <div class="bn-l">
              <NuxtLink class="bn" :to="localePath('/token/kxa')" :title="$t('all.more')">{{ $t('all.more') }}</NuxtLink>
            </div>
          </div>
          <div class="illu">
            <img src="/img/kxa-token_kryxivia.png" loading="lazy" alt="KXA">
          </div>
        </div>
        <div>
          <div class="p">
            <p>{{ $t('home.sec3.txt2') }}</p>
            <div class="bn-l">
              <NuxtLink class="bn" :to="localePath('/token/kxs')" :title="$t('all.more')">{{ $t('all.more') }}</NuxtLink>
            </div>
          </div>
          <div class="illu">
            <img src="/img/kxs-token_kryxivia.png" loading="lazy" alt="KXS">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>