import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state: {
    page: null,
    limit: null,
    total_pages: null,
    total_products: null,
    products: [],
  },
  getters: {
    getProducts: (state) => state.products,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    getTotalPages: (state) => state.total_pages,
    getTotalProducts: (state) => state.total_products,
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
