<template>
  <div id="app">
    <DebugMenu />
    <router-view />
  </div>
</template>
<script>
import DebugMenu from "./components/DebugMenu.vue";
import state from "@/state";
export default {
  name: "App",
  components: {
    DebugMenu
  },
  data() {
    return {};
  },
  methods: {
    generateUserId() {
      let userName = "seba";
      if (!localStorage.getItem("shopName")) {
        this.$router.replace("registration");
      }
      state.userName = userName;
      state.shopName = localStorage.getItem("shopName");
    },
    bootstrapStore() {
      if (!window.getUserId) {
        window.getUserId = () => {
          return localStorage.getItem("hackYeahUserID");
        };
      }
    },
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  created() {
    this.generateUserId();
    this.bootstrapStore();
  }
};
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
