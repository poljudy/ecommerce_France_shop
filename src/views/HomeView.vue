<template>
  <div class="home">list of products</div>
  <input
    class="bg-red-200"
    type="text"
    placeholder="Search..."
    name="search"
    id=""
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
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
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
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
});
</script>
