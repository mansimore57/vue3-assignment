<template>
<div id="app">
    <nav class="nav-bar">
      <router-link to="/">Home</router-link>
      <router-link to="/bookmarks">Bookmarks</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  beforeMount () {
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
#app {
  font-family: Arial, sans-serif;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  background: #333;
  padding: 20px;
  color: white;
}

.nav-bar a {
  text-decoration: none;
  color: inherit; /* Inherit the parent color (white) */
  transition: color 0.3s ease; /* Smooth color transition on hover */
}

.nav-bar a:hover {
  color: #f5a623; /* Change color on hover (e.g., orange) */
}

@media (min-width: 1100px) {
  .nav-bar {
    font-size: 1.5rem;
  }
}
</style>
