<template>
  <div class="home">this is cart page</div>
  <div
    v-for="item in cart"
    :key="item"
    class="bg-gray-300 mx-8 rounded flex items-center"
  >
    <div clas>
      <img
        :src="item.product.images.photos[0]"
        alt="item phtoo"
        srcset=""
        class="w-32 p-4"
      />
    </div>
    <div>{{ item.product.title }}</div>
    <ProductCart :product="item.product" />
  </div>
  <div @click="clear()">clear</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCart from "@/components/ProductCart.vue";

export default defineComponent({
  name: "CartView",
  components: {
    ProductCart,
  },
  data() {
    return {
      cart: this.getCart(),
    };
  },
  methods: {
    clear() {
      localStorage.clear();
      this.cart = this.getCart();
    },
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    getQuantityInCart(product) {
      const cart = this.getCart();
      if (this.isInCart) {
        return cart.find((element) => element.product.id === product.id)
          .quantity;
      } else {
        return 0;
      }
    },
    makeRequest(id) {
      this.$store.dispatch("fetchProduct", id);
    },
  },
});
</script>
