<script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  const route = useRoute()
  const page = route.name.split('___')[0]
</script>

<template>
  <div class="item" :class="`type-${item.type}`">
    <div v-if="item.ilvl" class="plus">
      iLvl: <strong>{{ item.ilvl }}</strong>
    </div>
    <div v-if="item.purity" class="plus">
      Purity: <strong>{{ item.purity }}%</strong>
    </div>
    <div class="illu" :class="`illu-${item.category}`">
      <img :src="item.illu" :alt="item.title" draggable="false">
    </div>
    <div class="nme">
      {{ item.title }}
    </div>
    <div class="info">
      <div class="cat">{{ item.category }}</div> 
      <div class="type">{{ item.type || 'common' }}</div>
    </div>
    <AppItemPrice v-if="page === 'app-marketplace'" :price="item.price" />
    <div v-else-if="page === 'app-nft-viewer'" class="price">
      <strong>Send in game</strong>
    </div>
  </div>
</template>

<style>
  .type-uncommon{--c:var(--uncommon);--o:.3;}
  .type-epic{--c:var(--epic);--o:.3;}
  .type-uncommon:before, .type-epic:before{box-shadow:0 0 20px rgba(var(--c),.15), 0 0 10px rgba(var(--c),.1) inset}
  .item{--tr:.4s var(--cubic);--g:3px;--pad:calc(20px + 5 * (100vw - 320px) / 1080);--bd:rgba(var(--c, var(--color-1-rgb)),var(--o, .1));display:flex;flex-direction:column;align-items:center;transition:transform var(--tr);will-change:transform;cursor:pointer;text-align:center;padding:var(--pad);padding-bottom:0;background-color:var(--bg-2);border-radius:var(--corner-3);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.03) inset, 0 5px 35px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4);min-height:100%;}
  .item:hover{transform:scale(1.05)}
  .item:before{z-index:5;border:1px solid var(--bd);width:calc(100% - var(--g) * 2);height:calc(100% - var(--g) * 2);top:var(--g);left:var(--g);pointer-events:none;position:absolute;content:'';border-radius:inherit}
  .item:after{background:linear-gradient(to bottom, rgba(var(--c),.08), transparent);z-index:0;width:100%;height:100%;top:0;left:0;pointer-events:none;position:absolute;content:'';border-radius:var(--corner-3)}
  .item .illu{will-change:transform;transition:transform var(--tr), background-color var(--tr);border-radius:50%;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;background-color:var(--bg-2);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.06) inset, 0 5px 35px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4)}
  .item .illu:not(.illu-gem){padding:calc(15px + 5 * (100vw - 320px) / 1080);}
  .item:hover .illu{transform:scale(1.03);background-color:var(--bg-3)}
  .item .illu img{will-change:transform;transition:transform var(--tr), opacity var(--tr);z-index:5;}
  .item:hover .illu img{transform:scale(1.05);}
  .item .illu-gem{padding:5px;}
  .item .illu-gem img{border-radius:50%;}
  .item .illu:before{content:'';background:radial-gradient(rgb(var(--c)) 0%, transparent 80%);border-radius:50%;width:100%;height:100%;top:0%;left:0%;position:absolute;filter:blur(30px);}
  .item .nme{font-size:calc(14px + 2 * (100vw - 320px) / 1080);font-family:var(--font-2);margin-top:var(--pad);flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;color:var(--color-3)}
  .item .info{--sz:11px;opacity:.7;margin-top:8px;color:var(--colo-4);font-size:var(--sz);display:flex;align-items:center;justify-content:center;}
  .item .info .cat{opacity:.7;}
  .item .info .cat::first-letter{text-transform:uppercase;}
  .item .info .type{color:rgb(var(--c));font-family:var(--font-2);text-transform:uppercase;font-weight:bold;}
  .item .info .type:before{content:'';width:var(--sz);height:var(--sz);display:inline-block;margin:0 5px;background-color:rgb(var(--c, var(--color-1-rgb)));border-radius:50%;vertical-align:middle;top:-1px;}
  .item .price{background:linear-gradient(to bottom, var(--bg-3), transparent);display:inline-flex;align-items:center;justify-content:center;font-size:calc(13px + 1 * (100vw - 320px) / 1080);padding:calc(var(--pad) / 2);padding-bottom:calc(var(--pad) / 2 - 2px);margin-top:calc(var(--pad) / 1.2);border:1px solid var(--bd);border-bottom:0;bottom:var(--g);border-radius:var(--radius-1) var(--radius-1) 0 0}
  .item .price small{font-size:.8em;color:var(--color-4);opacity:.5;display:block;margin-left:5px;top:-1px;}
  .item .plus{color:var(--color-4);position:absolute;left:var(--g);top:var(--g);border:1px solid var(--bd);border-width:0 1px 1px 0;font-size:11px;padding:7px 8px 6px;border-bottom-right-radius:var(--radius-1);}
</style>