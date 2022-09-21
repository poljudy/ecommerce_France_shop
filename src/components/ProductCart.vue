<template>
  <div>
    <div v-if="isInCartVar(product) && this.getQuantityInCart(product) > 0">
      <div
        @click="
          this.getQuantityInCart(product) > 0 ? decreaseCartByOne(product) : ''
        "
        class="bg-teal-500 cursor-pointer"
      >
        -
      </div>
      <div>Quantity : {{ this.getQuantityInCart(product) }}</div>
      <div
        @click="
          this.getQuantityInCart(product) < product.stock
            ? increaseCartByOne(product)
            : ''
        "
        class="bg-teal-500 cursor-pointer"
      >
        +
      </div>
    </div>
    <div
      v-else
      @click="increaseCartByOne(product)"
      class="bg-green-300 cursor-pointer"
    >
      add
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductCart",
  props: ["product"],
  data() {
    return {
      cart: this.getCart(),
    };
  },
  methods: {
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    modifyCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    updateCartVar() {
      this.cart = this.getCart();
    },
    isInCart(product) {
      const cart = this.getCart();
      return cart.find((element) => element.id === product.id);
    },
    isInCartVar(product) {
      const cart = this.cart;
      return cart.find((element) => element.id === product.id);
    },

    increaseCartByOne(product) {
      var cart = this.getCart();
      if (!this.isInCart(product)) {
        cart.push({ id: product.id, quantity: 1 });
      } else {
        const existingProduct = cart.find(
          (element) => element.id === product.id
        );
        const indexOf = cart.indexOf(existingProduct);
        cart[indexOf].quantity += 1;
      }
      this.modifyCart(cart);
      // this.logCart();
      console.log(product);

      this.updateCartVar();
      // console.log("cartvar");
      // console.log(this.cart);
    },
    decreaseCartByOne(product) {
      var cart = this.getCart();
      if (this.isInCart(product)) {
        const existingProduct = cart.find(
          (element) => element.id === product.id
        );
        const indexOf = cart.indexOf(existingProduct);
        cart[indexOf].quantity -= 1;
      }
      this.modifyCart(cart);
      // this.logCart();

      this.updateCartVar();
      // console.log("cartvar");
      // console.log(this.cart);
    },
    getQuantityInCart(product) {
      const cart = this.getCart();
      if (this.isInCart) {
        return cart.find((element) => element.id === product.id).quantity;
      } else {
        return 0;
      }
    },
  },
};
</script>
