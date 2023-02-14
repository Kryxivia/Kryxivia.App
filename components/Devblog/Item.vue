<script setup>
  defineProps({
    index: {
      type: String,
      required: true
    },
    actu: {
      type: Object,
      required: true
    }
  })
  const localePath = useLocalePath()
</script>

<template>
  <div @click="$router.push(localePath('/devblog/' + index))" class="card actu-item">
    <img class="cover" :src="`/img/devblog/${actu.cover}`" loading="lazy" :alt="actu.lang.en.titl">
    <div class="cont">
      <DateFormat :date="actu.date" />
      <div class="titre">{{ actu.lang.en.title }}</div>
      <div class="desc">
        <p>{{ actu.lang.en.desc }}</p>
      </div>
      <div class="butt">
        <NuxtLink class="bn" :to="localePath('/devblog/' + index)" :title="$t('all.more')">{{ $t('all.more') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>