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

  <div v-for="product in products" :key="product.id">
    <router-link :to="{ name: 'product', params: { id: product.id } }">
      {{ product.title }}, {{ product.id }}
    </router-link>
    |
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
      class="w-24 h-24 bg-teal-500 mx-12 cursor-pointer"
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
  },
});
</script>
