<template>
  <div class="home">list of products</div>
  <div v-for="user in users" :key="user">{{ user }}</div>
</template>

<script>
import { computed } from "vue";
import { defineComponent } from "vue";
//import the global store object from Vuex
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {},
  computed: {
    users() {
      // return store.state.products;
      return this.$store.getters.getProducts;
    },
  },
  created() {
    console.log(this.$store.dispatch("fetchProducts"));
  },
});
</script>
