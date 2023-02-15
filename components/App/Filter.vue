<script setup>

  const props = defineProps({
    items: Object
  })

  const search = ref('')
  
  const emit = defineEmits(['filter'])

  watch(search, () => {
    const search_key = search.value.toLowerCase()
    const itemsFiltered = props.items.filter(item => {
      if (
        item.title.toLowerCase().includes(search_key) || 
        item.category.toLowerCase().includes(search_key) || 
        item.type.toLowerCase().includes(search_key)
        ) { 
        return true
      }
      return false
    })
    emit('filter', itemsFiltered)
    // if (!isMobile()) {
    //   this.$root.Smooth.scroll.setPosition(0, 0)
    // }
  })
</script>

<template>
  <div class="filter">
    <div class="search">
      <input v-model="search" type="search" :placeholder="$t('app-marketplace.search')">
      <Icon icon="search" />
    </div>
  </div>
</template>

<style>
  .filter{--h:calc(var(--header-app-height) / 1.5);height:var(--h);display:flex;align-items:center;flex:1}
  .filter > *{height:100%;font-size:calc(12px + 1 * (100vw - 320px) / 1080);}
  .filter > * + *{margin-left:var(--gutter)}
  .filter .search{flex:1;}
  .filter .search input{padding:1px calc(var(--h) / 3) 0;padding-left:var(--h);font-size:1em;transition:border-color .2s;background-color:rgba(var(--bg-1-rgb),.4);box-shadow:0 0 10px rgba(var(--bg-1-rgb),.5) inset;border-radius:var(--corner-1);border:1px solid var(--color-line);width:100%;height:100%;color:var(--color-4);}
  .filter .search input:active, .filter .search input:focus{border-color:rgba(var(--color-1-rgb),.3)}
  .filter .search svg{transition:stroke .2s;fill:transparent;position:absolute;left:0;width:var(--h);stroke:var(--color-4);padding:calc(var(--h) / 4)}
  .filter .search input:active ~ svg, .filter .search input:focus ~ svg{stroke:var(--color-2);}
</style>