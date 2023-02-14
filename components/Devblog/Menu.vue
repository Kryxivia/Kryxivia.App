<script setup>
  defineProps({
    id: {
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
  <NuxtLink :to="localePath('/devblog/' + id)" @click="$navigation.close()" :title="actu.lang.en.title" class="card-hover actu">
    <DateFormat :date="actu.date" />
    <div class="titre">{{ actu.lang.en.title }}</div>
    <div class="cover">
      <img :src="`/img/devblog/${actu.cover}`" alt="" />
    </div>
  </NuxtLink>
</template>