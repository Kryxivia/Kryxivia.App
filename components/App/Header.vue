<script setup>
  defineProps({
    icon: String
  })
</script>

<template>
  <div class="app-header">
    <h1>
      <Icon v-if="icon" :icon="icon"/>
      <span>{{ $t($route.name.split('___')[0] + '.title') }}</span>
    </h1>
    <slot />
  </div>
</template>

<style>
  .app-header{--gutter:calc(var(--header-app-height) / 3);padding-right:calc(var(--gutter) / 1.5);z-index:10;position:absolute;display:flex;align-items:center;justify-content:space-between;background-color:rgba(var(--bg-3-rgb),.85);backdrop-filter:blur(10px);border-radius:var(--corner-3);box-shadow:0 0 0 1px rgba(var(--color-1-rgb),.03) inset, 0 5px 35px rgba(0,0,0,.5), 0 0 0 1px rgba(0,0,0,.4);height:var(--header-app-height);width:calc(100% - var(--padding-ct) * 2);left:var(--padding-ct);top:var(--padding-ct);}
  .app-header h1{--size:calc(16px + 2 * (100vw - 320px) / 1080);padding:0 var(--gutter);font-size:var(--size);font-family:var(--font-2);color:var(--color-3);display:flex;align-items:center;}
  .app-header h1 svg{stroke:var(--color-2);transition:stroke var(--transi-b);fill:transparent;margin-right:calc(var(--gutter) / 2);width:calc(var(--size) * 1.2);}
</style>