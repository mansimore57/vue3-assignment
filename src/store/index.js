// import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        allProducts: null,
        totalResults:"",
        pageSize: 21,
        countrySearch:"",
        categorySearch:"",
        keywordSearch:""
    },
    mutations: {
        setAllProducts(state, products) {
          console.log()
            state.allProducts = products
        },
        setResultCount (state, payload) {
            state.totalResults = payload
        },
        setPageSize (state, payload) {
          state.pageSize = payload
      }
    },
    getters: {
      getPayload: state => {
        return {
          country: state.countrySearch,
          category: state.categorySearch,
          keyword: state.keywordSearch
        }
      },
        getTotalResults: state=>{
          return state.totalResults;
        }
    },
    actions: {
      updatePageSize({commit}, data) {
        commit('setPageSize', data)
      },
        async getFilteredResult({ commit,state }, searchFilter) {
          console.log(searchFilter)
          const apiKey = process.env.VUE_APP_API_KEY
          const baseURL = process.env.VUE_APP_BASE_URL
          const defaultURL = `${baseURL}/everything?q=all&pageSize=${state.pageSize}&apiKey=${apiKey}`
          const searchedURL = (params) => {
            let endpoint = `${baseURL}/top-headlines?`;
            endpoint += params.keyword ? `q=${params.keyword}&` : '';
            endpoint += params.category ? `category=${params.category}&` : '';
            endpoint += params.country ? `country=${params.country}&` : '';
            endpoint += `pageSize=${state.pageSize}&apiKey=${apiKey}`;
            return endpoint;
          }

          if (!searchFilter) {
            const response = await fetch(defaultURL).then((res) => res.json())
            commit("setAllProducts", response.articles);
          } else {
            const {keyword, country, category} = searchFilter
            if (keyword || country || category) {
              const url = searchedURL({ keyword, country, category });
              const response = await fetch(url).then((res) => res.json())
              commit("setAllProducts", response.articles);
            } else {
              const response = await fetch(defaultURL).then((res) => res.json())
              commit("setAllProducts", response.articles);
            }
            
          }
          
        },
    },
})

export default store