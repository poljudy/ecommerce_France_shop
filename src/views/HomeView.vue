<template>
  <div class="home">list of products</div>
  <input
    class="bg-red-200"
    type="text"
    placeholder="Search..."
    name="search"
    id=""
    v-model="searchFilter"
    @:change="search()"
  />
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="m-12 block bg-teal-200"
    >
      <!-- <router-link :to="{ name: 'product', params: { id: product.id } }"> -->
      <div>
        <div class="w-32 h-56 bg-red-300">
          {{ product.title }}, {{ product.id }} ,{{ product.stock }}

          <!-- price -->
          <div>
            <div :class="[product.priceDiscount ? 'barred' : '']">
              {{ product.price }}
            </div>
            <div>
              {{ product.priceDiscount ? product.priceDiscount : "" }}
            </div>
          </div>
          <!-- cart -->
          <div>
            <div
              v-if="isInCartVar(product) && this.getQuantityInCart(product) > 0"
            >
              <div
                @click="
                  this.getQuantityInCart(product) > 0
                    ? decreaseCartByOne(product)
                    : ''
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
          <!-- Router link -->
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            Go
          </router-link>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
  <div>page:{{ page }}</div>
  <div>limit: {{ limit }}</div>
  <div>total pages: {{ totalPages }}</div>
  <div>totals products : {{ totalProducts }}</div>
  <div>test : {{ test }}</div>
  <div class="roulette flex">
    <div
      class="w-24 h-24 bg-teal-500 mx-12 cursor-pointer"
      :class="[page > 1 ? 'bg-teal-500' : 'bg-gray-200']"
      @click="page > 1 ? decreasePageOne() : log()"
    >
      Prec
    </div>
    <div class="w-24 h-24 bg-teal-500 mx-12">{{ page }}</div>
    <div
      class="w-24 h-24 mx-12 bg-teal-500 cursor-pointer"
      v-if="page < totalPages"
      @click="increasePageOne"
    >
      Suiv
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  data() {
    return {
      searchFilter: "",
      cart: this.getCart(),
    };
  },
  components: {},
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    page() {
      return this.$store.getters.getPage;
    },
    limit() {
      return this.$store.getters.getLimit;
    },
    totalPages() {
      return this.$store.getters.getTotalPages;
    },
    totalProducts() {
      return this.$store.getters.getTotalProducts;
    },
    test() {
      return this.$store.getters.getTest;
    },
  },
  methods: {
    reload() {
      location.reload();
    },
    updateCartVar() {
      this.cart = this.getCart();
    },
    getCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    modifyCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    logCart() {
      console.log(this.getCart());
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
    makeRequest() {
      this.$store.dispatch("fetchProducts");
    },
    search() {
      console.log(this.searchFilter);
      this.$store.dispatch("assignSearch", this.searchFilter);

      this.makeRequest();
    },
    increasePageOne() {
      if (this.page < this.totalPages) {
        this.$store.dispatch("increasePageOne");
        this.makeRequest();
      }
    },
    decreasePageOne() {
      if (this.page > 1) {
        this.$store.dispatch("decreasePageOne");
        this.makeRequest();
      }
    },
    log() {
      console.log(this.$store.search);
    },
  },
  created() {
    this.makeRequest();
    var cart = [];
    this.modifyCart(cart);
  },
});
</script>
