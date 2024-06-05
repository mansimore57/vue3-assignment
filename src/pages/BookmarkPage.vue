<template>
  <div v-if="articleData && articleData.length" class="bookmark-coantiner">
    <news-card v-for="(article, index) in articleData" :key="index" :article="article" @remove="removeItem(index)"/>
  </div>
  <div v-else class="error-msg"> NO BOOKMARKS HERE... :(</div>
</template>

<script>
import NewsCard from '@/components/NewsCard.vue'
export default {

  components : {
    NewsCard

  },
  data () {
    return {
      articleData : [],
    }
  },
  beforeMount () {
    this.articleData = JSON.parse(localStorage.getItem('carts'))
  },
  methods : {
    removeItem (index) {
      this.articleData.splice(index, 1)
      localStorage.setItem('carts', JSON.stringify(this.articleData))
    }
  }
}
</script>

<style>
.bookmark-coantiner {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.error-msg {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 30%;
}

</style>