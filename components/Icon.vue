<script setup>
  defineProps({
    icon: {
      type: String,
      required: true
    },
    viewbox: {
      type: String,
      default: "0 0 24 24"
    },
    title: {
      type: String
    }
  })
</script>

<template>
  <svg :viewBox="viewbox">
    <title v-if="title">{{ $t(title) }}</title>
    <use :xlink:href="`#i-${icon}`" />
  </svg>
</template>