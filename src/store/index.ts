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
    search: null,
    cart: window.localStorage.getItem("cart"),
    total: 0,
  },
  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    getTotalPages: (state) => state.total_pages,
    getTotalProducts: (state) => state.total_products,
    getTest: (state) => state.test,
    getSearch: (state) => state.search,
    getCart: (state) => state.cart,
    getTotal: (state) => state.total,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
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
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    SET_TOTAL(state, total) {
      state.total = total;
    },
  },
  actions: {
    modifyCart({ commit }, cart) {
      commit("SET_CART", cart);
    },
    increasePageOne({ commit }) {
      commit("SET_PAGES", this.state.page + 1);
    },
    decreasePageOne({ commit }) {
      commit("SET_PAGES", this.state.page - 1);
    },
    assignSearch({ commit }, search) {
      commit("SET_SEARCH", search);
    },
    async fetchProducts({ commit }) {
      let url = `https://otakod.es/hetic/ecommerce-api/products?page=${this.state.page}`;
      if (this.state.search !== null) {
        url += `&search=${this.state.search}`;
      }
      try {
        const data = await axios.get(url);
        commit("SET_PRODUCTS", data.data.products);
        commit("SET_PAGES", data.data.page);
        commit("SET_LIMIT", data.data.limit);
        commit("SET_TOTALPAGES", data.data.total_pages);
        commit("SET_TOTALPRODUCTS", data.data.total_products);
        commit("SET_TEST", url);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchProduct({ commit }, id) {
      const url = `https://otakod.es/hetic/ecommerce-api/products/${id}`;
      try {
        const data = await axios.get(url);
        commit("SET_PRODUCT", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;
