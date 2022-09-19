import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state: {
    products: [],
  },
  getters: {
    getProducts: (state) => state.products,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const data = await axios.get(
          "https://otakod.es/hetic/ecommerce-api/products"
        );
        console.log(data);

        commit("SET_PRODUCTS", data.data.products);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;
