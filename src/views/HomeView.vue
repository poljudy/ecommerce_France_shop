<template>
  <div class="home">list of products</div>
  <input
    class="bg-red-200"
    type="text"
    placeholder="Search..."
    name="search"
    id=""
    v-model="searchFilter"
    @:change="increasePageOne()"
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
    <div v-if="page > 1" @click="decreasePageOne">Prec</div>
    <div>{{ page }}</div>
    <div v-if="page < totalPages" @click="increasePageOne">Suiv</div>
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
    increasePageOne() {
      if (this.page < this.totalPages) {
        this.$store.dispatch("increasePageOne");
        this.$store.dispatch("fetchProducts");
      }
    },
    decreasePageOne() {
      if (this.page > 1) {
        this.$store.dispatch("decreasePageOne");
        this.$store.dispatch("fetchProducts");
      }
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
});
</script>
