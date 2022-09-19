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
    getProduct: (state) => (id) =>
      state.products.find((product) => product.id === id),
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    getTotalPages: (state) => state.total_pages,
    getTotalProducts: (state) => state.total_products,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PAGES(state, page) {
      state.page = page;
    },
    SET_LIMIT(state, limit) {
      state.limit = limit;
    },
    SET_TOTALPAGES(state, total_pages) {
      state.total_pages = total_pages;
    },
    SET_TOTALPRODUCTS(state, total_products) {
      state.total_products = total_products;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const data = await axios.get(
          "https://otakod.es/hetic/ecommerce-api/products"
        );
        commit("SET_PRODUCTS", data.data.products);
        commit("SET_PAGES", data.data.page);
        commit("SET_LIMIT", data.data.limit);
        commit("SET_TOTALPAGES", data.data.total_pages);
        commit("SET_TOTALPRODUCTS", data.data.total_products);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;
