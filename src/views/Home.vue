<template>
  <div class="home">
    <b-jumbotron>
      <template v-slot:header>GroceriesApp</template>

      <template v-slot:lead>Buy groceries in your neigbourhood, conveniently and safely.</template>

      <hr class="my-4" />

      <p>Browse through variety of products in local shops, select convenient pickup time, pay safely online.</p>

      <b-button variant="primary" to="/order">Start buying</b-button>&nbsp;
      <b-button variant="success" href="#">Do Something Else</b-button>
    </b-jumbotron>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  }
};
</script>
<style scoped>
.home {
  text-align: left;
}
hr {
  border-top-color: rgba(255, 255, 255, 0.2);
}
.jumbotron {
  position: relative;
  background: #000;
  color: #fff;
  text-shadow: 0 0 10px #000;
}
.jumbotron > * {
  position: relative;
  z-index: 1;
}
.jumbotron:before {
  background: url("../assets/cover.jpg") center center no-repeat;
  background-size: cover;
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.4;
}
</style>