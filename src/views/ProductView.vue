<template>
  <div v-if="product" class="grid grid-cols-2 gap-8 px-8">
    <div class="relative">
      <img
        :src="selectedImage || product.images.photos[0]"
        alt=""
        class="w-full h-128 object-cover"
      />
      <div class="absolute flex items-center justify-around">
        <div v-for="photo in product.images.photos" :key="photo">
          <img
            :src="photo"
            alt=""
            class="top-full w-24 object-cover"
            @click="selectImage(photo)"
          />
        </div>
      </div>
    </div>
    <div class="text-left flex flex-col justify-center">
      <div class="text-xl font-bold">{{ product.title }}</div>
      <div class="text-sm text-gray-500">{{ product.stock }} en stock</div>
      <div class="ml-auto mr-4">
        <ProductPrice :product="product" class="mr-0 text-right" />
      </div>
      <div v-if="product.rating" class="">
        <div class="flex items-center">
          <div v-for="n in Math.floor(product.rating)" :key="n">⭐</div>
          <div class="ml-2">{{ Math.floor(product.rating) }} / 5</div>
          <div class="ml-4 text-sm text-gray-500">
            {{ product.raters }} avis
          </div>
        </div>
      </div>

      <div class="font-bold text-gray-500 mt-8 my-4">
        {{ product.category }}
      </div>
      <div class="w-3/4 text-sm text-gray-600">
        {{ product.description }}
      </div>
      <ProductCart :product="product" class="mt-12" />
    </div>
  </div>
  <div v-else>Aucun produit trouvé</div>
  <!-- <div @click="test">test</div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductPrice from "@/components/ProductPrice.vue";
import ProductCart from "@/components/ProductCart.vue";

export default defineComponent({
  name: "ProductView",
  components: { ProductPrice, ProductCart },

  computed: {
    product() {
      return this.$store.getters.getProduct;
    },
  },
  data() {
    return {
      selectedImage: "",
    };
  },
  methods: {
    selectImage(photo) {
      this.selectedImage = photo;
    },
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
