<template>
    <div id="nav" class="d-flex justify-content-around">
        <router-link v-show="isDealer && $route" to="/">Home</router-link>
        <router-link to="/orders-list">Orders</router-link>
        <router-link v-show="isDealer() && $route" to="/backstageDashboard">Dashboard</router-link>
        <router-link v-show="isDealer() && $route" to="/shop-assortment">Assortment</router-link>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class NavigationBar extends Vue {
        update: boolean = false;

        constructor() {
            super();
            this.$root.$on('refresh-force', () => {
                this.$forceUpdate()
            })
        }

        public isDealer(): boolean {
            return !!this.$router.currentRoute == true && window.localStorage && !!window.localStorage.getItem('shopName');
        }

        public isClientAnd(): boolean {
            return window.localStorage && !!window.localStorage.getItem('shopName');
        }
    }
</script>

<style scoped>
    #nav {
        padding: 20px 10px;
        background-color: var(--primary-color);
        box-shadow: 0 1px 3px 3px rgba(0,0,0,0.73);
        margin-bottom: 50px;
    }

    #nav a {
        font-weight: bold;
        text-decoration: none;
        color: var(--text-on-primary);
        transition: color 0.2s ease-in-out;
    }

    #nav a:hover {
        color: var(--secondary-color);
    }

    #nav a.router-link-exact-active {
        color: var(--secondary-color);
    }
</style>
