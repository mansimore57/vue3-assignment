<template>
  <div class="search-caontiner">
    <div class="drop-down-box">
      <select v-model="selectedCountry">
        <option value="">Select Country</option>
        <option v-for="option in allCountries" :key="option.name" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="drop-down-box">
      <select v-model="selectedCategory">
        <option value="">Select Category</option>
        <option v-for="option in allCategories" :key="option.name" :value="option.value">
          {{ option.value }}
        </option>
      </select>
    </div>
    <div class="search-input">
      <input type="text" v-model="keyword" placeholder="Search news" />
      <button @click="searchNews"><img class="search-icon" :src="searchIcon" alt="Search Icon" /></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import countryData from "../jsonData/country.json";
import categoryData from "../jsonData/categories.json";
import searchIcon from "../assets/search-icon.png";
import listIcon from "../assets/list.png";

export default {
  data() {
    return {
      allCountries: countryData,
      allCategories: categoryData,
      searchIcon,
      listIcon,
      selectedCountry: "",
      selectedCategory: "",
      keyword: "",
    };
  },
  computed: {
    ...mapGetters(["getTotalResults"]),
  },
  methods: {
    searchNews() {
      this.$store.state.countrySearch = this.selectedCountry;
      this.$store.state.categorySearch = this.selectedCategory;
      this.$store.state.keywordSearch = this.keyword;
      const searchFilter = {
        category: this.selectedCategory,
        country: this.selectedCountry,
        keyword: this.keyword,
      };
      this.$store.dispatch("getFilteredResult", searchFilter);
    },
  },
};
</script>

<style>
.search-caontiner {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: auto;
  margin-top: 2px;
}
.search-input,
.drop-down-box {
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: 10px;
}
input[type="text"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 768px) {
  .search-caontiner{
    flex-direction: column;
    align-items: stretch;
  }

  .search-input,
.drop-down-box{
    width: 100%;
  }
}

@media (max-width: 480px) {
  .search-caontiner {
    padding: 10px;
  }

  input[type="text"],
  select,
  button {
    font-size: 14px;
    padding: 8px;
  }

  button {
    padding: 8px 16px;
  }
}
</style>
