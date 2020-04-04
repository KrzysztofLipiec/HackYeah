<template>
  <b-container>
    <b-row>
      <b-col md="4" offset-md="4">
        <h2>Orders</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-list-group class="orders-list">
          <b-list-group-item
            v-for="(order, index) in orders"
            :key="index"
            @click="goToOrder(order)"
            button
            :variant="order.status === 'ready' ? 'success' : ''"
          >
            <span>{{order.name}}</span>
            <span>{{order.status}}</span>
            <span>{{(new Date(order.timestamp)).toLocaleTimeString()}}</span>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { TShopOrder } from "../../../interfaces/TShopOrder";
import state from "@/state";
import { OrderStatus } from "../../../interfaces/OrderStatus";

@Component
export default class Order extends Vue {
  private shopName: string = "";
  private interval: number = 0;
  private orders: Array<TShopOrder> = [];

  private goToOrder(order: TShopOrder): void {
    if (order.status !== OrderStatus.ready) {
      this.$router.push(`/order/shop/${order.id}`);
    }
  }

  public mounted(): void {
    this.getOrders();
    this.interval = setInterval(this.getOrders, 10000);
  }
  private async getOrders(): Promise<void> {
    this.orders = await (
      await fetch(`${state.apiUrl}orders/shop/${state.shopName}`)
    ).json();
  }
  public destroyed(): void {
    clearInterval(this.interval);
  }
}
</script>
<style scoped>
.orders-list {
  text-align: left;
}
.orders-list > .list-group-item {
  display: flex;
  justify-content: space-between;
}
.order-ready {
  background: ;
}
</style>