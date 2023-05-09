<template>
  <div id="app">
    <cover />
    <router-link to="/"><h2>Система техподдержки "ЪЫЪ"</h2></router-link>
    <div v-if="!!$store.state.userId" class="header-entering">
      <div style="font-weight: bold;"> {{ $store.state.userName }} </div>
      <div class="header-link" @click="logout">Выход</div>
    </div>
    
    <router-link to="login" class="header-entering" v-else>
      <beauty-button text="Войти" look="primary" />
    </router-link>
    <router-view class="app-content" v-if="isUserLoaded" />
  </div>
</template>

<script>
import Cover from './components/Cover.vue';
import BeautyButton from './components/BeautyButton.vue';

export default {
  name: 'App',
  components: {
    Cover,
    BeautyButton,
  },
  data() {
    return {
      isUserLoaded: false
    }
  },
  created() {
    this.initUser();
  },
  methods: {
    async initUser() {
      this.$store.commit('loading', true);
      await this.$store.dispatch('load');
      this.$store.commit('loading', false);
      this.isUserLoaded = true;
    },
    logout() {
      this.$http.post('users/logout')
      .then(() => this.$store.commit('logout'))
      .catch((err) => console.log(err));
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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

  --color-info-semilight: #c9cfdd;

  background-color: #b2b6d2;
}

nav {
  padding: 30px;
}

a {
  text-decoration: none;
  color: black;
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
  padding-bottom: 50px;
}

.header-entering {
  position: absolute;
  top: 10px;
  right: 10px;
}

.header-link {
  cursor: pointer;
  color: var(--color-primary-dark);
  transition: .3s;
  text-align: end;
}

.header-link:hover {
  color: white;
}
</style>
