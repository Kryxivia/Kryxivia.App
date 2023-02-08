<script setup>
  const localePath = useLocalePath()
  const { menuItems } = useNavigation()
</script>

<template>
  <nav>
    <ul v-for="ul in menuItems">
      <li>{{ ul.title === 'Kryxivia' ? 'Kryxivia' : $t(ul.title) }}</li>
      <li v-for="li in ul.list">
        <a v-if="li.blank" :href="li.link" :title="$t(li.name)" target="_blank">{{ $t(li.name) }}</a>
        <NuxtLink v-else :to="localePath(li.link)">{{ $t(li.name) }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>