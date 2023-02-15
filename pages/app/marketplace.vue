<script setup>
  import { items } from '@/datas'

  /** List items */
  const itemList = ref(items)

  /** Return items when filter */
  function filter(itemsFiltered) {
    itemList.value = itemsFiltered
  }
</script>

<template>
  <AppContainer>
    <AppHeader icon="marketplace">
      <AppFilter :items="items" @filter="filter" />
    </AppHeader>
    <AppGrid :itemList="itemList"/>
  </AppContainer>
</template>