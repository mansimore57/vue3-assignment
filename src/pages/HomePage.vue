<template>
  <div class="home-container">
    <search-bar/>
    <div class="news-container">
      <news-card v-for="(article, index) in allProducts" :key="index" :article="article" />
    </div>
  </div>
</template>

<script>
import NewsCard from '@/components/NewsCard.vue'
import { mapGetters, mapState } from 'vuex'
import SearchBar from '@/components/SearchBar.vue'

export default {
  components: { NewsCard, SearchBar },
  data () {
    return {
      payload: {
        category: '',
        country: '',
        keyword: ''
      }
    }
  },
  computed : {
    ...mapGetters(['getPayload']),
    ...mapState({
      allProducts: state => state.allProducts,
      pageCount: state => state.pageSize
    })
  },
  async mounted () {
    await this.$store.dispatch('getFilteredResult', this.getPayload)
    this.scroll()
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          const currentpage = this.pageCount + 21
          this.$store.dispatch('updatePageSize', currentpage)
          this.$store.dispatch("getFilteredResult", this.getPayload);
        }
      };
    },
  }
}
</script>

<style>
.news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
}

</style>