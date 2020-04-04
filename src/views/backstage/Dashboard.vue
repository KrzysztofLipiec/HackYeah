<template>
  <b-container>
    <b-row>
      <b-col md="4">
        <order />
      </b-col>
      <b-col md="4">
        <settings />
      </b-col>
      <b-col md="4">
        <notifications />
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import Order from "@/components/backstage/dashboard/Order.vue";
import Settings from "@/components/backstage/dashboard/Settings.vue";
import Notifications from "@/components/backstage/dashboard/Notifications.vue";
export default {
  name: "BackstagetDashboard",
  components: {
    Order,
    Settings,
    Notifications
  }
};
</script>