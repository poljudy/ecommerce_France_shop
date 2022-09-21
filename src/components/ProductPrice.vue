<template>
  <div class="price flex items-center my-4 font-bold text-lg">
    <div v-if="product.priceDiscount">
      {{ product.priceDiscount }}
      <!-- {{ product.priceDiscount ? product.priceDiscount : "" }} -->
    </div>
    <div
      :class="[
        product.priceDiscount ? 'barred ml-4 text-sm text-gray-500 ' : '',
      ]"
    >
      {{ product.price }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductPrice",
  props: ["product"],
  data() {
    return {};
  },
};
</script>
