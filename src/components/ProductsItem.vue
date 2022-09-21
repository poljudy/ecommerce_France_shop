<template>
  <router-link
    :to="{ name: 'product', params: { id: product.id } }"
    class="rounded"
  >
    <div class="">
      <img
        :src="product.images.photos[0]"
        alt="`Image produit"
        class="w-56 h-72 object-cover rounded-lg"
      />
    </div>
    <div class="text-left my-4 text-gray-500">
      {{ product.title }}
    </div>
    <ProductPrice :product="product" />
    <div class="text-xs text-gray-300">
      {{ product.stock > 0 ? "" : "Out of stock" }}
    </div>
  </router-link>
</template>
<script lang="ts">
import ProductPrice from "@/components/ProductPrice.vue";
export default {
  name: "ProducItem",
  props: ["product"],
  components: { ProductPrice },
  data() {
    return {
      cart: this.getCart(),
    };
  },
  created() {
    console.log(this.props);
  },
  methods: {
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },

    logCart() {
      console.log(this.getCart());
    },
  },
};
</script>
