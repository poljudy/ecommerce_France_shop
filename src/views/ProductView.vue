<template>
  <div class="home">this is product page</div>
  <div v-if="product">product var {{ product.title }}</div>
  <div v-else>product loading?</div>
  <div @click="test">test</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductView",
  components: {},
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
