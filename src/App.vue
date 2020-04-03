<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/registration">Registration</router-link> |
      <router-link to="/orders-list">Orders</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    methods: {
      generateUserId() {
        if (!localStorage.getItem('hackYeahUserID')) {
          localStorage.setItem('hackYeahUserID', this.uuidv4());
        }
      },
      bootstrapStore() {
        if (!window.getUSerId) {
          window.getUserId = () => {
            return localStorage.getItem('hackYeahUserID');
          }
        }
      },
      uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    },
    created() {
      this.generateUserId();
      this.bootstrapStore();
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li {
  list-style-type: none;
}

ul {
    margin: 0;
    padding: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
