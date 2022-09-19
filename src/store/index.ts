import { createStore } from "vuex";
import axios from "axios";
const store = createStore({
  state: {
    page: 1,
    limit: null,
    total_pages: null,
    total_products: null,
    products: [],
    product: null,
    test: null,
  },
  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    getTotalPages: (state) => state.total_pages,
    getTotalProducts: (state) => state.total_products,
    getTest: (state) => state.test,
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
    SET_TEST(state, test) {
      state.test = test;
    },
  },
  actions: {
    increasePageOne({ commit }) {
      commit("SET_PAGES", this.state.page + 1);
    },
    decreasePageOne({ commit }) {
      commit("SET_PAGES", this.state.page - 1);
    },
    async fetchProducts({ commit }, filter) {
      try {
        const data = await axios.get(
          `https://otakod.es/hetic/ecommerce-api/products?page=${this.state.page}`
        );
        commit("SET_PRODUCTS", data.data.products);
        commit("SET_PAGES", data.data.page);
        commit("SET_LIMIT", data.data.limit);
        commit("SET_TOTALPAGES", data.data.total_pages);
        commit("SET_TOTALPRODUCTS", data.data.total_products);
        commit("SET_TEST", filter);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchProduct({ commit }, id) {
      console.log(id);
    },
  },
  modules: {},
});

export default store;
