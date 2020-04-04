<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/registration">Registration</router-link>|
    <router-link to="/orders-list">Orders</router-link>|
    <router-link to="/backstageDashboard">Dashboard</router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DebugMenu extends Vue {}
</script>