<template>
  <div class="text-left flex items-center justify-around">
    <div>
      <div>
        Prix total : <span class="font-bold">{{ total.toFixed(2) }}</span> €
      </div>
      <div>
        Nombres de produits: <span class="font-bold">{{ totalProducts }}</span>
      </div>
    </div>
    <div
      @click="clear()"
      class="rounded bg-gray-300 hover:bg-gray-600 transition-all py-2 px-4 cursor-pointer hover:text-white"
    >
      Supprimer tout le panier
    </div>
  </div>
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
          {{ item.product.title }} -
          <span class="text-xs text-gray-400">
            {{
              item.product.priceDiscount
                ? getNumberFromPrice(item.product.priceDiscount)
                : getNumberFromPrice(item.product.price)
            }}€
          </span>
        </div>
        <div class="text-xs text-gray-400">
          total
          {{
            item.product.priceDiscount
              ? getNumberFromPrice(item.product.priceDiscount) * item.quantity
              : getNumberFromPrice(item.product.price) * item.quantity
          }}€
        </div>
      </div>
      <ProductCart :product="item.product" />
      <div
        @click="deleteItem(item.product)"
        class="cursor-pointer w-12 h-12 flex items-center justify-center text-xl mr-5 hover:bg-gray-800 transition-all"
      >
        🗑️
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
      totalProducts: 0,
    };
  },
  computed: {},
  methods: {
    test() {
      console.log(this.getCart());
    },
    getNumberFromPrice(str) {
      return parseInt(str.slice(0, -1));
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
    getTotalProducts() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.quantity;
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

    window.addEventListener("cart-localstorage-changed", () => {
      this.cart = this.getCart();
      this.total = this.getTotal();
      this.totalProducts = this.getTotalProducts();
    });
    this.totalProducts = this.getTotalProducts();
    this.total = this.getTotal();
  },
});
</script>
