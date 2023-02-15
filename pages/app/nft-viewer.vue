<script setup>
  const { nft } = useUser()

  /** List items */
  const itemList = ref(nft)

  /** Return items when filter */
  function filter(itemsFiltered) {
    itemList.value = itemsFiltered
  }
</script>

<template>
  <AppContainer>
    <AppHeader icon="nft-viewer">
      <AppFilter :items="nft" @filter="filter" />
    </AppHeader>
    <AppGrid :itemList="itemList"/>
  </AppContainer>
</template>