<template>
  <div class="home">
    total
    {{ total }} €
  </div>
  <div @click="clear()">clear</div>
  <div @click="test()">test</div>
  <div v-if="cart">
    <div
      v-for="item in cart"
      :key="item"
      class="bg-gray-300 mx-8 rounded flex items-center my-4"
    >
      <div>
        <img
          :src="item.product.images.photos[0]"
          alt="item phtoo"
          srcset=""
          class="w-32 p-4"
        />
      </div>
      <div class="text-left w-1/3">
        <div>
          {{ item.product.title }}
        </div>
        <div class="text-xs text-gray-400">
          total
          {{
            item.product.priceDiscount
              ? getNumberFromPrice(item.product.priceDiscount) * item.quantity
              : getNumberFromPrice(item.product.price) * item.quantity
          }}
        </div>
      </div>
      <ProductCart :product="item.product" />
      <div @click="deleteItem(item.product)">delete</div>
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
  computed: {},
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
    modifyCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(
        new CustomEvent("cart-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("cart"),
          },
        })
      );
    },
    deleteItem(product) {
      const existingProduct = this.cart.find(
        (element) => element.product.id === product.id
      );
      const indexOf = this.cart.indexOf(existingProduct);
      this.cart.splice(indexOf, 1);
      this.modifyCart(this.cart);
      window.dispatchEvent(
        new CustomEvent("cart-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("cart"),
          },
        })
      );
    },
  },
  mounted() {
    console.log("mounted");

    window.addEventListener("cart-localstorage-changed", (event) => {
      this.cart = this.getCart();
      this.total = this.getTotal();
    });
    this.total = this.getTotal();
  },
});
</script>
