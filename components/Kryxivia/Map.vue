<script setup>
  const icons = ['banks', 'leader', 'nft', 'portail', 'socketing', 'training']
  onMounted(() => {
    qsa('.card-list li').forEach(icon => {
      icon.addEventListener('mouseenter', e => qs('#icon-' + e.target.getAttribute('data-id')).classList.add('hover'))
      icon.addEventListener('mouseleave', e => qs('#icon-' + e.target.getAttribute('data-id')).classList.remove('hover'))
    })
  })
</script>

<template>
  <div class="sec sec-map">
    <div class="ct">
      <div class="sub" data-reveal="bottom">{{ $t('kryxivia.map.sub1') }}</div>
      <h2 data-reveal="bottom" class="title">{{ $t('kryxivia.map.title1') }}</h2>
      <div>
        <div class="card-map">
          <img src="/img/logo-kryxivia.png" loading="lazy" width="500" height="169" alt="Kryxivia" class="logo" draggable="false" data-reveal="right">
          <KryxiviaIcon v-for="icon, key in icons" :icon="icon" data-reveal="bottom" />
          <img src="/img/city/map_web.jpg" loading="lazy" width="1800" height="1037" class="carte" :alt="$t('kryxivia.map.title1')" data-reveal>
        </div>
        <ul class="card-list" data-reveal="bottom">
          <li v-for="icon, key in icons" :data-id="icon">
            <KryxiviaIcon :icon="icon" />
            <div class="cont">
              <div class="name">{{ $t(`kryxivia.map.${icon}.title`) }}</div>
              <div class="desc">
                <p>{{ $t(`kryxivia.map.${icon}.desc`) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>