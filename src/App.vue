<template>
  <div id="app">
    <h2>Система техподдержки "ЪЫЪ"</h2>
    <router-view class="app-content" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
    /*----COLORMAP----*/
  --color-primary: rgb(77, 110, 192);
  --color-primary-light: rgb(114, 149, 202);
  --color-primary-dark: #3f5787;
  --color-primary-contrast: rgb(147, 181, 233);

  --color-secondary: #b2b6d2;
  --color-secondary-light: #ebdfe5;
  --color-secondary-dark: #9b8791;

  --secondary-grad: linear-gradient(to bottom left, white, rgb(216, 185, 185) );

  --color-info-light: #d2dbed;
  --color-info: #96a1b8;
  background-color: #b2b6d2;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app-content {
  padding-top: 50px;
}
</style>
