<script setup>
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

  /** Define props & const */
  const props = defineProps({
    itemList: {
      type: Object || Array,
      required: true
    }
  })
  const itemPerScroll = 20
  const listMax = ref(itemPerScroll)
  const itemListLength = ref(props.itemList.length)
  const itemSelected = ref([])
  const modal = ref(false)

  /** Add item end scroll */
  function add() {
    listMax.value = listMax.value + itemPerScroll
  }

  /** Check end scroll if all item show */
  function checking() {
    if (listMax.value >= itemListLength.value) {
      listMax.value = itemListLength.value
    }
  }

  /** Show item */
  function showItem(item) {
    itemSelected.value = item
    modal.value = true
  }

  /** Close modal item selected */
  function close() {
    modal.value = false
  }
  
  /** Watch if items is filtered */
  watch(props, () => {
    itemListLength.value = props.itemList.length
    listMax.value = itemPerScroll
    checking()
  })

  /** Watch if items is filtered */
  watch(listMax, () => checking())

  onMounted(() => {

    /** Scroll infinite with ScrollTrigger and native mobile */
    if (!isMobile()) {
      ScrollTrigger.create({
        trigger: '.load',
        start: 'top bottom',
        scroller: '#smooth',
        onEnter: () => add()
      })
    } else {
      const scroller = qs('#smooth')
      for (let event of ['scroll','resize']) {
        scroller.addEventListener(event, () => {
          const y = scroller.offsetHeight + scroller.scrollTop + 20
          if (y >= scroller.scrollHeight) {
            add()
          }
        })
      }
    }
    
  })
</script>

<template>
  <div class="container-scroll">
    <Smooth :footer="false" :delegate="false">
      <div class="grid-item">
        <div v-for="item in itemList.slice(0, listMax)" @click="showItem(item)">
          <AppItem :item="item" />
        </div>
        <div v-show="listMax < itemListLength" class="load">
          {{ $t('app-marketplace.loading') }}
        </div>
        <div v-show="listMax === 0" class="error">
          {{ $t('app-marketplace.noResult') }}
        </div>
      </div>
    </Smooth>
    <AppModal v-if="modal" :item="itemSelected" @close="close" />
    <div v-show="listMax !== 0" class="loaded">
      {{ listMax }}/{{ itemListLength }} {{ $t('app-marketplace.loaded') }}
    </div>
  </div>
</template>

<style>
  .grid-item{--p:calc(15px + 5 * (100vw - 320px) / 1080);--n:5;display:flex;flex-wrap:wrap;align-items:stretch;padding:var(--padding-ct);}
  .grid-item > *{width:calc(100% / var(--n));padding:calc(var(--p) / 2);}
  .grid-item .load{min-width:100%;}
  .grid-item .error{margin:calc(var(--p) / 2);min-width:calc(100% - var(--p));max-width:calc(100% - var(--p));height:100%;background-color:rgba(var(--danger-rgb),.1);border-radius:var(--corner-1);text-align:center;padding:var(--gutter);font-size:calc(14px + 2 * (100vw - 320px) / 1080);color:var(--danger)}
  .loaded{position:absolute;width:100%;text-align:center;margin-top:10px;font-size:9px;opacity:.5;}
</style>