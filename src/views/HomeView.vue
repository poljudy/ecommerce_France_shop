<template>
  <div class="bg-gray-100">
    <div class="pt-12">
      <div class="search mx-auto w-1/2">
        <input
          class="search__input mx-auto w-full"
          type="text"
          placeholder="Search..."
          name="search"
          id=""
          v-model="searchFilter"
          @:change="search()"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <ProductsItem
        v-for="product in products"
        :key="product.id"
        class="m-12 block border-2 border-transparent hover:border-teal-500 transition-all cursor-pointer"
        :product="product"
      />
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
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ProductsItem from "@/components/ProductsItem.vue";
export default defineComponent({
  name: "HomeView",
  data() {
    return {
      searchFilter: "",
    };
  },
  components: {
    ProductsItem,
  },
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
    modifyCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
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
