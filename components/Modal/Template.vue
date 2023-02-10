<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    },
    callbackClose: {
      type: Function,
      default: () => {}
    }
  })
</script>

<template>
  <div class="mod-w" :data-modal="id">
    <div class="mod-c" @click.self="$modal.close(id, callbackClose)">
      <div :class="`card mod mod-${id}`">
        <slot />
        <button type="button" class="close" :aria-label="$t('all.close')" @click="$modal.close(id, callbackClose)">
          <Icon icon="cross" title="all.close" />
        </button>
      </div>
    </div>
  </div>
</template>