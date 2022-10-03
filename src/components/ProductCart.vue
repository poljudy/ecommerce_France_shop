<template>
  <div class="mx-auto">
    <!-- <div class="text-black text-xl">
      {{ cart.length }}
    </div> -->
    <div
      v-if="isInCartVar(product) && this.getQuantityInCart(product) > 0"
      class="flex justify-around items-center"
    >
      <div
        @click="
          this.getQuantityInCart(product) > 0 ? decreaseCartByOne(product) : ''
        "
        class="w-8 h-8 flex items-center justify-center text-white mx-12 cursor-pointer"
        :class="[
          this.getQuantityInCart(product) > 0
            ? 'bg-teal-500  '
            : 'bg-gray-200 text-gray-500',
        ]"
      >
        -
      </div>
      <div class="text-xl font-bold">
        Quantité : {{ this.getQuantityInCart(product) }}
      </div>
      <div
        @click="
          this.getQuantityInCart(product) < product.stock
            ? increaseCartByOne(product)
            : ''
        "
        class="w-8 h-8 flex items-center justify-center text-white bg-teal-500 mx-12 cursor-pointer"
        :class="[
          this.getQuantityInCart(product) < product.stock
            ? 'bg-teal-500  '
            : 'bg-gray-200 text-gray-500 ',
        ]"
      >
        +
      </div>
    </div>
    <div
      v-else
      @click="product.stock > 0 ? increaseCartByOne(product) : ''"
      class="bg-lime-500 cursor-pointer text-center text-lg font-bold uppercase rounded-full py-2 px-8 margin-auto text-white"
    >
      {{ product.stock > 0 ? "add to cart" : "No stock" }}
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
      total: this.getTotal(),
    };
  },
  methods: {
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    getTotal() {
      const cart = this.getCart();
      let total = 0;
      try {
        cart.forEach((element) => {
          const priceStr = parseFloat(element.product.price.slice(0, -1));
          console.log(typeof priceStr);

          total += priceStr;
        });
        this.$emit("total", total);
        return total;
      } catch (error) {
        console.log(error);
      }
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
    updateCartVar() {
      this.cart = this.getCart();
    },
    isInCart(product) {
      const cart = this.getCart();

      return cart.find((element) => element.product.id === product.id);
    },
    isInCartVar(product) {
      const cart = this.getCart();

      // const cart = this.cart;
      if (cart != null) {
        return cart.find((element) => element.product.id === product.id);
      }
    },

    increaseCartByOne(product) {
      var cart = this.getCart();
      if (!this.isInCart(product)) {
        cart.push({ product: product, quantity: 1 });
        console.log(this.getCart());
      } else {
        const existingProduct = cart.find(
          (element) => element.product.id === product.id
        );
        const indexOf = cart.indexOf(existingProduct);
        cart[indexOf].quantity += 1;
      }
      this.modifyCart(cart);
      // this.logCart();
      // console.log(product);

      this.updateCartVar();
      // console.log("cartvar");
      // console.log(this.cart);
    },
    decreaseCartByOne(product) {
      var cart = this.getCart();
      if (this.isInCart(product)) {
        const existingProduct = cart.find(
          (element) => element.product.id === product.id
        );
        const indexOf = cart.indexOf(existingProduct);
        cart[indexOf].quantity -= 1;
        if (cart[indexOf].quantity == 0) {
          cart.splice(indexOf, 1);
        }
      }
      this.modifyCart(cart);
      this.updateCartVar();
      window.dispatchEvent(
        new CustomEvent("cart-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("cart"),
          },
        })
      );
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
  },
};
</script>
