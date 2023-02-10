<script setup>
  const props = defineProps({
    date: {
      type: Number,
      required: true
    }
  })
  const { localeProperties } = useI18n()
  const format = computed(() => 
    new Intl.DateTimeFormat(localeProperties.value.iso).format(props.date * 1000)
  )
</script>

<template>
  <time>{{ format }}</time>
</template>