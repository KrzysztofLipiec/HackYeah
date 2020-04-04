<template>
  <div>
    <div v-for="order in orders" :key="order.name">
      <h5>{{order.name}}</h5>
      <ul>
        <li v-for="item in order.items" :key="item.name">{{ item.name }}</li>
      </ul>
    </div>
    <p v-if="isEmpty">Your cart is empty</p>
    <div v-if="!isEmpty">
      <hr />
      <p>
        Total:
        <strong>{{totalSumFormatted}}</strong>
        <br />
        You have to go to: {{totalShopsFormatted}}.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TShopOrder } from "../../interfaces/TShopOrder";
@Component
export default class CartSummary extends Vue {
  @Prop(Array)
  private readonly orders!: TShopOrder[];

  get isEmpty(): boolean {
    return (
      !this.orders ||
      this.orders.length === 0 ||
      this.orders.every(o => o.items.length === 0)
    );
  }

  get totalSum(): number {
    if (!this.orders) {
      return 0;
    }
    return this.orders.reduce((acc, shopOrder) => {
      const singleOrderTotal = shopOrder.items.reduce((a, item) => {
        return (a += item.count * item.price);
      }, 0);
      return (acc += singleOrderTotal);
    }, 0);
  }

  get totalShopsFormatted(): string {
    if (!this.orders) {
      return "";
    }
    return this.orders.map(o => o.name).join(", ");
  }

  get totalSumFormatted(): string {
    return `${this.totalSum.toFixed(2)}zł`;
  }
}
</script>