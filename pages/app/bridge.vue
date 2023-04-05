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
    <AppComing />
    <AppHeader icon="nft-viewer">
    </AppHeader>
    <AppGrid/>
  </AppContainer>
</template>