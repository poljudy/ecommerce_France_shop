<template>
  <div v-if="product" class="flex bg-red-300 px-8">
    <div class="w-1/2">
      <img :src="product.images.photos[0]" alt="" class="w-full" />
    </div>
    <div class="w-1/2 text-left flex flex-col px-4 bg-green-300">
      <div>{{ product.title }}</div>
      <ProductPrice :product="product" />

      <div class="">{{ product.description }}</div>
      <ProductCart :product="product" />
    </div>
  </div>
  <div v-else>product loading?</div>
  <div @click="test">test</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductPrice from "@/components/ProductPrice.vue";
import ProductCart from "@/components/ProductCart.vue";

export default defineComponent({
  name: "ProductView",
  components: { ProductPrice, ProductCart },

  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.getters.getProduct;
    },
  },
  methods: {
    test() {
      console.log(this.product);
    },
    getProduct() {
      return this.$store.getters.getProduct;
    },
    makeRequest() {
      this.$store.dispatch("fetchProduct", this.$route.params.id);
    },
  },
  created() {
    this.makeRequest();
  },
});
</script>
