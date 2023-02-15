<script setup>
  const props = defineProps({
    price: {
      type: Number,
      required: true
    }
  })
  const maticUSD = .98
  const priceUSD = formatPrice(props.price * maticUSD)
</script>

<template>
  <div class="price">
    <strong>{{ price }} MATIC</strong>
    <small>{{ priceUSD }}</small>
  </div>
</template>