<script setup>
  defineProps({
    sub: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: Array,
      required: true
    },
    bn: String,
    link: String
  })
  const localePath = useLocalePath()
</script>

<template>
  <div class="hm-ct">
    <div class="ct">
      <div class="sub" v-html="sub"/>
      <h2 v-html="title"/>
      <div class="p">
        <p v-for="p in text" v-html="p"/>
      </div>
      <div v-if="bn" class="bn-l">
        <NuxtLink class="bn" :to="localePath(link)" :title="$t(bn)">{{ $t(bn) }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
