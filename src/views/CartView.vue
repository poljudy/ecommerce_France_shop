<template>
  <div class="home">
    total
    {{ total }}
  </div>
  <div @click="clear()">clear</div>
  <div @click="test()">test</div>
  <div v-if="cart">
    <div
      v-for="item in cart"
      :key="item"
      class="bg-gray-300 mx-8 rounded flex items-center"
    >
      <div>
        <img
          :src="item.product.images.photos[0]"
          alt="item phtoo"
          srcset=""
          class="w-32 p-4"
        />
      </div>
      <div>{{ item.product.title }}</div>
      <ProductCart :product="item.product" />
      <div>
        total
        {{
          item.product.priceDiscount
            ? getNumberFromPrice(item.product.priceDiscount) * item.quantity
            : getNumberFromPrice(item.product.price) * item.quantity
        }}
      </div>
    </div>
  </div>
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
      total: 0,
    };
  },
  computed: {
    // total() {
    //   let total = 0;
    //   const cart = this.$store.getters.getCart;
    //   console.log(cart);
    //   cart.forEach((element) => {
    //     total +=
    //       this.getNumberFromPrice(element.product.price) * element.quantity;
    //   });
    //   console.log(total);
    //   return total;
    // },
    // cart() {
    //   return this.getCart();
    // },
  },
  methods: {
    test() {
      console.log(this.getCart());
    },
    getNumberFromPrice(str) {
      return parseFloat(str.slice(0, -1));
    },
    clear() {
      localStorage.clear();
      this.cart = this.getCart();
    },
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    getTotal() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.product.priceDiscount
          ? this.getNumberFromPrice(item.product.priceDiscount) * item.quantity
          : this.getNumberFromPrice(item.product.price) * item.quantity;
      });
      return total;
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
  mounted() {
    console.log("mounted");

    window.addEventListener("cart-localstorage-changed", (event) => {
      this.cart = this.getCart();
      this.total = this.getTotal();
    });
  },
});
</script>
