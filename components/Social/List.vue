<script setup>
  const { socials } = useSocial()
</script>

<template>
  <ul>
    <template v-for="social in socials">
      <li v-if="social.id !== 'website'">
        <SocialItem :social="social" />
      </li>
    </template>
  </ul>
</template>