<template>
    <div id="nav" class="d-flex justify-content-around">
        <router-link to="/">Home</router-link>
        <router-link to="/registration">Registration</router-link>
        <router-link to="/orders-list">Orders</router-link>
        <router-link to="/backstageDashboard">Dashboard</router-link>
        <router-link to="/shop-assortment">Assortment</router-link>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class NavigationBar extends Vue {

    }
</script>

<style scoped>
    #nav {
        padding: 20px 10px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
