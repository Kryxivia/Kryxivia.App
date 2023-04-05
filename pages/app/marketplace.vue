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
    <div class="box"><p style="color:#64acff;">⚠ This is not yet available, please use our <a style="text-decoration: underline;" target="_blank" href="https://app.kryxivia.io/">current decentralized app</a> or <a style="text-decoration: underline;color:#64acff" href="https://opensea.io/collection/kryxivia" target="_blank">opensea</a> ⚠  </p></div>
    <AppHeader icon="marketplace">
      <AppFilter :items="items" @filter="filter" />
    </AppHeader>
    <AppGrid :itemList="itemList"/>
  </AppContainer>
</template>

<style scoped>
  .box{position:absolute;display:flex;gap:4px;align-items:center;justify-content:center;top:-50px;width:100%;height:40px; padding:var(--gap);border-radius:var(--corner-3);background-color:var(--bg-2);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 50px rgba(var(--bg-3-rgb),1) inset}
</style>