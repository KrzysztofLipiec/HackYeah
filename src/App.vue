<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>
<script>
import NavigationBar from "./components/NavigationBar.vue";
import state from "@/state";
export default {
  name: "App",
  components: {
    NavigationBar
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
:root {
  --main-bg-color: #F5F5F6;
  --primary-color: #4527a0;
  --primary-color-dark: #000070;
  --primary-color-light: #7953d2;
  --secondary-color: #7bb241;
  --secondary-color-dark: #4a820c;
  --secondary-color-light: #ade470;
  --text-on-primary: #ffffff;
  --text-on-secondary: #000000;
  --text-on-bg: #1b1b1b;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  background-color: var(--main-bg-color);
  color: var(--text-on-bg);
}

li {
  list-style-type: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
