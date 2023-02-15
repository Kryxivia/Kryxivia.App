<script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  const { idPage } = useMetaData()
  const emit = defineEmits(['close'])
  function close() {
    emit('close')
  }
</script>

<template>
  <div class="modal" :class="`type-${item.type}`">
    <div class="modal-ct">
      <div class="left">
        <div class="illu box">
          <img :src="item.illu" loading="lazy" :alt="item.title" draggable="false">
        </div>
        <div v-if="idPage === 'app-marketplace'" class="box buy">
          <AppItemPrice :price="item.price" />
          <button type="button" class="bn" @click="close">
            <span>Buy this item</span>
            <Icon icon="cart" />
          </button>
        </div>
        <div v-if="idPage === 'app-nft-viewer'" class="box buy">
          <button type="button" class="bn" @click="close">
            <span>Send in game</span>
          </button>
        </div>
        <div class="box">
          <div class="sub">Owner</div>
          <strong>0x000</strong>
        </div>
      </div>
      <div class="right">
        <div class="box top">
          <div class="name">{{ item.title }}</div>
          <button type="button" class="bn" @click="close">{{ $t('all.close') }}</button>
        </div>
        <div class="box infos">
          <div>
            <div class="sub">Type</div>
            <strong class="color">{{ item.type || 'Common' }}</strong>
          </div>
          <div>
            <div class="sub">Category</div>
            <strong>{{ item.category || 'Undefined' }}</strong>
          </div>
          <div>
            <div class="sub">Purity</div>
            <strong>{{ item.purity || '-' }}%</strong>
          </div>
          <div>
            <div class="sub">iLvl</div>
            <strong>{{ item.ilvl || '-' }}</strong>
          </div>
        </div>
        <div class="box">
          <div class="sub">Boots & effects</div>
        </div>
        <div class="box">
          <div class="sub">Details</div>
        </div>
        <div class="box">
          <div class="sub">Item Activity</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .modal{--bd:rgba(var(--c, var(--color-1-rgb)),var(--o, .1));--g:3px;--gap:calc(var(--padding-ct) * 2);animation:show .4s;animation-fill-mode:both;padding-top:calc(var(--header-app-height) + var(--padding-ct));overflow-x:auto;position:absolute;bottom:0;width:100%;height:100%;background-color:rgba(var(--bg-2-rgb),.8);backdrop-filter:blur(5px);border-radius:var(--corner-3);}
  .modal-ct{display:flex;padding:var(--gap);align-items:flex-start;}
  .modal .left{width:calc(230px + 50 * (100vw - 320px) / 1080);position:sticky;top:var(--gap)}
  .modal .illu:before{z-index:5;border:1px solid var(--bd);width:calc(100% - var(--g) * 2);height:calc(100% - var(--g) * 2);top:var(--g);left:var(--g);pointer-events:none;position:absolute;content:'';border-radius:inherit}
  .modal .illu:after{content:'';background:radial-gradient(rgb(var(--c)) 0%, transparent 80%);border-radius:50%;width:100%;height:100%;top:0%;left:0%;position:absolute;filter:blur(30px);}
  .modal .illu img{border-radius:inherit;z-index:10}
  .modal .right{flex:1;margin-left:calc(var(--gap) / 1.5)}
  .modal .box{padding:var(--gap);border-radius:var(--corner-3);background-color:var(--bg-2);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.04) inset, var(--bs-1), 0 10px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4), 0 0 50px rgba(var(--bg-3-rgb),1) inset}  
  .modal .box + .box{margin-top:calc(var(--gap) / 2)}
  .modal .top{position:sticky;top:var(--gap);z-index:10;display:flex;align-items:flex-start;justify-content:space-between;}
  .modal .top .bn{margin:-10px -10px -10px 0}
  .modal .name{flex:1;align-self:center;padding-right:var(--gap);font-size:calc(16px + 5 * (100vw - 320px) / 1080);font-family:var(--font-2);}
  .modal .sub{font-size:10px;opacity:.7;margin-bottom:calc(var(--gap) / 2.5);}
  .modal .infos{display:flex;flex-wrap:wrap;padding:calc(var(--gap) / 3)}
  .modal .infos > *{flex:1;border:1px solid var(--color-line);border-radius:var(--corner-1);padding:var(--gap);margin:calc(var(--gap) / 4)}
  .modal .infos strong{font-size:calc(13px + 1 * (100vw - 320px) / 1080);text-transform:uppercase;font-family:var(--font-2);}
  .modal .infos .color{color:rgb(var(--c));opacity:.7;}
  .modal .price{padding:calc(var(--gap) / 1.2);font-size:calc(16px + 3 * (100vw - 320px) / 1080);display:flex;justify-content:space-between;align-items:center;}
  .modal .price small{font-size:calc(13px + 1 * (100vw - 320px) / 1080);opacity:.5;margin-top:3px;}
  .modal .buy{padding:0}
  .modal .buy .bn{--size:calc(15px + 2 * (100vw - 320px) / 1080);flex-direction:row;width:100%;margin-top:-2px;background:var(--bg-3);padding:calc(var(--gap) / 1.3);font-size:var(--size);}
  .modal .buy .bn svg{width:var(--size);fill:transparent;stroke:var(--color-2);margin-left:10px;transform:scale(1.2)}

  @keyframes show{
    0%{opacity:0}
    100%{opacity:1}
  }
</style>