<template>
    <div class="news-card" v-if="article.title !== '[Removed]'">
      <div class="profile-pic">
        <img :src="article.urlToImage || 'https://i.pinimg.com/736x/c5/0b/7b/c50b7be4d3a21f765097ca12147ed5f4.jpg'" alt="News Picture" />
      </div>
      <div class="news-info">
        <h2 class="title" @click="goToDetailsPage">{{ article.title || "N/A" }}</h2>
        <p class="description">{{ article.description || "N/A" }}</p>
        <p class="published-at">Published At: {{ new Date(article.publishedAt).toLocaleDateString() || "N/A" }}</p>
      </div>
      <div class="bookmark">
        <span :class="['bookmark-icon', { filled: isBookmarked }]" @click="toggleCart">&#9733;</span>
      </div>
    </div>
</template>

<script>
export default {
    props: ['article'],
    components : {},
    data () {
      return {
        isBookmarked: false,
      }
    },
    mounted () {
        const cartItems = JSON.parse(localStorage.getItem('carts')) || []
        this.isBookmarked = cartItems.some(item => item.title === this.article.title)

    },
    methods : {
      toggleCart() {
        const cartItems = JSON.parse(localStorage.getItem('carts')) || []
        console.log(JSON.parse(JSON.stringify(this.article)))
        const index = cartItems.findIndex(item => item.title === this.article.title)
        if (index !== -1) {
          // Remove the product if it's already in the cart
          cartItems.splice(index, 1);
          this.$emit('remove', index)
        } else {
          // Add the product to the cart
          cartItems.push(this.article)
        }
        localStorage.setItem('carts',JSON.stringify(cartItems))
        this.isBookmarked = cartItems.some(item => item.title === this.article.title)
      },
      goToDetailsPage () {
        this.$router.push({name: 'Details', params: {title:this.article.title}})
        localStorage.setItem('articleDetail', JSON.stringify(this.article))
      }
    }
}
</script>

<style>
.news-card {
  flex-basis: calc(33.33% - 30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: calc(25% - 20px); /* 4 cards per row */
  /* margin: 10px; */
  position: relative; 
}
@media (max-width: 768px) {
    .news-card {
        flex-basis: calc(50% - 30px);
    }
}
        
@media (max-width: 480px) {
    .news-card {
        flex-basis: calc(100% - 30px);
    }
}

.news-card:hover {
  transform: translateY(-5px);
}
.profile-pic  {
  width: 100%;
}
.profile-pic img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}
.title:hover {
  text-decoration: underline;
}
.description {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.published-at {
  font-size: 12px;
  color: #888;
}
.bookmark {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.bookmark-icon {
  font-size: 24px;
  cursor: pointer;
}

.bookmark-icon.filled {
  color: #ff9800;
}
</style>