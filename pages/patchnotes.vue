<script setup>
  import { patchnotes } from '@/datas'
</script>

<template>
  <Smooth>
    <TitlePage :h1="$t('patchnotes.h1')" icon="icon/patchnotes" />
    <div class="ct ct-patch">
      <div v-for="patch in patchnotes" class="patch">
        <LnShape data-reveal />
        <div class="heading" data-reveal="bottom">
          <h2>{{ $t('patchnotes.sub') }} <span>v{{ patch.version }}</span></h2>
          <DateFormat :date="patch.date" />
        </div>
        <template v-for="section in ['new', 'resolve', 'know']">
          <template v-if="patch[section]">
            <h3 data-reveal="bottom">{{ $t('patchnotes.' + section) }}</h3>
            <ul :class="section" data-reveal="bottom">
              <li v-for="li in patch[section]" v-html="li"/>
            </ul>
          </template>
        </template>
      </div>
    </div>
  </Smooth>
</template>

<style scoped>
  .ct-patch{--ct:calc(700px + 400 * (100vw - 320px) / 1080);}
  .patch .heading{display:flex;align-items:center;justify-content:space-between;}
  .patch > * + *{margin-top:calc(var(--padding) / 3);font-size:calc(14px + 2 * (100vw - 320px) / 1080);}
  .patch .ln{margin:var(--padding) 0;}
  .patch h2{margin-top:calc(var(--padding) / 3);font-size:calc(20px + 10 * (100vw - 320px) / 1080);font-family:var(--font-2);}
  .patch h2 span{color:var(--color-3)}
  .patch time{font-size:calc(12px + 2 * (100vw - 320px) / 1080);color:var(--color-3);opacity:.7;font-family:var(--font-1);letter-spacing:calc(2px + 1 * (100vw - 320px) / 1080);}
  .patch ul{line-height:1.4;margin-top:calc(var(--padding) / 1.5)}
  .patch ul li{padding-left:15px}
  .patch ul li + li{margin-top:calc(10px + 2 * (100vw - 320px) / 1080);}
  .patch ul li:before{content:'•';color:var(--color-2);position:absolute;left:0;}
  .patch h3{font-size:calc(16px + 3 * (100vw - 320px) / 1080);font-family:var(--font-2);margin-top:calc(var(--padding) / 1.5)}
  .patch .know{font-size:90%;opacity:.7;font-style:italic;}
  .patch .know li:before{color:var(--color-1)}
</style>
