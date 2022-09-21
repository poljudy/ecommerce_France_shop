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
    <!-- <div>page:{{ page }}</div>
    <div>limit: {{ limit }}</div>
    <div>total pages: {{ totalPages }}</div>
    <div>totals products : {{ totalProducts }}</div>
    <div>test : {{ test }}</div> -->
    <div class="inline-block m-0 py-4">
      <div class="roulette flex">
        <div
          class="w-12 h-12 flex items-center justify-center text-white bg-teal-500 mx-12 cursor-pointer"
          :class="[
            page > 1 ? 'bg-teal-500 font-bold ' : 'bg-gray-200 text-gray-500',
          ]"
          @click="page > 1 ? decreasePageOne() : log()"
        >
          <div class="truncate block text-xs mx-2">Précédent</div>
        </div>
        <div
          class="w-12 h-12 flex items-center justify-center text-white bg-teal-500 mx-12 cursor-pointer font-bold"
        >
          {{ page }}
        </div>
        <div
          class="w-12 h-12 flex items-center justify-center text-white bg-teal-500 mx-12 cursor-pointer"
          :class="[
            page < totalPages
              ? 'bg-teal-500 font-bold '
              : 'bg-gray-200 text-gray-500',
          ]"
          @click="page < totalPages ? increasePageOne() : log()"
        >
          <div class="truncate block text-xs mx-2">Suivant</div>
        </div>
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
    console.log(localStorage.getItem("cart"));
    console.log(localStorage.getItem("cart"));
    if (!(localStorage.getItem("cart").length > 0)) {
      var cart = [];
      this.modifyCart(cart);
    }
  },
});
</script>
