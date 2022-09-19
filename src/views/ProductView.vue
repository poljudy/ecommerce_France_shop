<template>
  <div class="home">this is product page</div>
  product id : {{ $route.params.id }}
  {{ product }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductView",
  components: {},
  computed: {
    product() {
      return this.$store.getters.getProduct(this.$route.params.id);
    },
  },
});
</script>
