<script setup>
  import { factions } from '@/datas'

  const { messages, locale } = useI18n()

  function getParagraphe(id) {
    return messages.value[locale.value].factions[id].paragraphe
  }
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('factions.h1')" icon="icon/blason" />
    <div class="frac">
      <div class="ct">
        <div class="head">
          <div v-for="faction, key in factions" :class="`illu ${key}`" data-reveal="bottom">
            <img :src="faction.logo + '?v=1'" width="744" height="733" :alt="`Kryxivia • ${$t(faction.name)}`" draggable="false">
          </div>
        </div>
        <LnHr name="frac" />
        <div v-for="faction, id in factions" :class="`frac-sec sec ${id}`" data-reveal="bottom">
          <div :class="`card illu ${id}`">
            <img :src="faction.logo + '?v=1'" width="744" height="733" :alt="`Kryxivia • ${$t(faction.name)}`" loading="lazy" draggable="false">
          </div>
          <div class="cont">
            <div class="sub">{{ $t(faction.name) }}</div>
            <h2 class="title">{{ $t(`factions.${id}.title`) }}</h2>
            <div class="intro">
              <p>{{ $t(`factions.${id}.intro`) }}</p>
            </div>
            <div class="p">
              <p v-for="p in getParagraphe(id)">{{ p.source }}</p>
            </div>
            <div class="butt">
              <button class="bn" @click="$modal.open('play')">{{ $t('factions.want') }}&nbsp;<span>{{ $t(faction.name) }}</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Smooth>
</template>

<style scoped>
  .frac .ln-hr-frac{width:60%;margin:calc(var(--ct-padding) / 2) auto;}
  .frac .head{--gap:calc(5px + 10 * (100vw - 320px) / 1080);display:flex;width:100%;margin:var(--gutter) auto 0;max-width:100%;width:calc(var(--ct) / 1.2);}
  .frac .head .illu{padding:var(--gap);}
  .frac .illu:after{background-color:var(--bg);border-radius:50%;filter:blur(calc(30px + 25 * (100vw - 320px) / 1080));opacity:.55;animation:blason_light 3s infinite linear;content:'';position:absolute;left:10%;top:10%;width:80%;height:80%;}
  .frac .illu img{z-index:10;transform:scale(1.2);}
  .frac .adventurers{--color:var(--adventurers-rgb);--bg:var(--adventurers-bg);}
  .frac .nomads{--color:var(--nomads-rgb);--bg:var(--nomads-bg);}
  .frac .merchants{--color:var(--merchants-rgb);--bg:var(--merchants-bg);}
  .frac .head img{animation:blason 3s infinite linear;}

  .frac .frac-sec{--border:rgba(var(--color),.2);display:flex;align-items:flex-start;border:1px solid var(--border);border-radius:var(--corner-3);padding:var(--gutter);}
  .frac .frac-sec + .frac-sec{margin-top:calc(var(--ct-padding) / 2);}
  .frac .frac-sec > .illu{--w:calc(150px + 50 * (100vw - 320px) / 1080);width:var(--w);min-width:var(--w);flex-basis:var(--w);padding:var(--gutter);}
  .frac .frac-sec > .illu:before{border-color:var(--border);}
  .frac .frac-sec > .illu:after{filter:blur(calc(20px + 15 * (100vw - 320px) / 1080));opacity:.6;animation:blason_light 3s infinite linear;}
  .frac .frac-sec > .cont{padding:var(--gutter) calc(var(--gutter) * 1.5);}
  .frac .frac-sec > .cont > * + *{margin-top:var(--gutter);}
  .frac .frac-sec > .cont .title{font-size:calc(18px + 6 * (100vw - 320px) / 1080);}
  .frac .frac-sec > .cont .sub{color:rgb(var(--color));}
  .frac .frac-sec > .cont .bn{border-color:var(--border);}
  .frac .frac-sec > .cont .bn:hover:after{border-color:var(--bg);box-shadow:0 0 15px var(--border), 0 0 10px var(--border) inset;}
  .frac .frac-sec > .cont .bn span{font-style:italic;color:rgb(var(--color));}

  @keyframes blason{
    0%{transform:scale(1);}
    60%{transform:scale(.95);}
    100%{transform:scale(1);}
  }
  @keyframes blason_light{
    0%{opacity:.7;}
    60%{opacity:.4;}
    100%{opacity:.7;}
  }

  @media screen and (max-width:800px){
    .frac .frac-sec{display:block;text-align:center;margin-top:var(--ct-padding)!important;}
    .frac .frac-sec > .cont{padding:calc(var(--gutter) * 1.5) var(--gutter) var(--gutter);}
    .frac .frac-sec > .illu{margin:var(--gutter) auto 0;}
  }
</style>
