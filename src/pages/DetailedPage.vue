<template>
    <div class="detail-page">
      <div class="profile-pic">
        <img :src="article.urlToImage || 'https://i.pinimg.com/736x/c5/0b/7b/c50b7be4d3a21f765097ca12147ed5f4.jpg'" alt="News Picture" />
      </div>
      <div class="news-info">
        <h1 class="title">{{ article.title || "N/A" }}</h1>
        <p class="author">Author: {{ article.author || "N/A" }}</p>
        <p class="description">{{ article.description || "N/A" }}</p>
        <p class="published-at">Published At: {{ new Date(article.publishedAt).toLocaleDateString() || "N/A" }}</p>
        <a :href="article.url" target="_blank">Read Full Article</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data () {
        return {
            article: []
        }
    },
    beforeMount () {
     this.article = JSON.parse(localStorage.getItem('articleDetail'))
    }
  };
  </script>
  
  <style scoped>
  .detail-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 600px;
    margin: 50PX auto;
  }
  
  .profile-pic img {
    width: 100%;
    height: 300px;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }
  
  .news-info {
    text-align: center;
    margin-top: 15px;
    width: 100%;
  }
  
  .news-info .title {
    margin: 0;
    font-size: 2em;
    color: #333;
    font-weight: bold;
  }
  
  .news-info .author {
    font-size: 1.2em;
    color: #555;
    margin-top: 10px;
  }
  
  .news-info .description {
    font-size: 1.1em;
    color: #666;
    margin-top: 10px;
  }
  
  .news-info .published-at {
    margin-top: 10px;
    color: #999;
    font-size: 0.9em;
  }
  
  .news-info a {
    display: inline-block;
    margin-top: 20px;
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  
  .news-info a:hover {
    text-decoration: underline;
  }
  </style>
  