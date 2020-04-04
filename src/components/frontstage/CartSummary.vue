<template>
  <div>
    <div v-for="groupedItem in groupedItems" :key="groupedItem.shopName">
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th colspan="3">{{groupedItem.shopName}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in groupedItem.items" :key="item.id">
            <td class="text-left">{{ item.name }}</td>
            <td
              class="text-left"
            >{{ item.amount}}x{{ formatCurrency(item.price)}} per {{item.measure}}</td>
            <td class="text-right">{{formatCurrency(item.amount * item.price)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="isEmpty">Your cart is empty</p>
    <div v-if="!isEmpty">
      <hr />
      <p>
        Total from {{this.groupedItems.length }} shop(s):
        <strong>{{totalSumFormatted}}</strong>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
interface GroupedItem {
  shopName: string;
  items: TShopItem[];
}

import { Component, Prop, Vue } from "vue-property-decorator";
import { TShopOrder } from "../../interfaces/TShopOrder";
import { TShopItem } from "../../interfaces/TShopItem";
@Component
export default class CartSummary extends Vue {
  @Prop(Array)
  private readonly items!: TShopItem[];

  get groupedItems(): GroupedItem[] {
    const groupedItems = new Map<string, TShopItem[]>();
    if (!this.items) {
      return [];
    }
    this.items.forEach(item => {
      if (!groupedItems.has(item.shopName)) {
        groupedItems.set(item.shopName, []);
      }
      groupedItems.get(item.shopName)!.push(item);
    });
    const result: GroupedItem[] = [];
    groupedItems.forEach((items, shopName) => {
      result.push({ shopName, items: items });
    });
    return result;
  }

  get isEmpty(): boolean {
    return !this.items || this.items.length === 0;
  }

  get totalSum(): number {
    if (!this.items) {
      return 0;
    }
    return this.items.reduce((acc, item) => {
      return (acc += item.price * item.count);
    }, 0);
  }

  get totalSumFormatted(): string {
    return this.formatCurrency(this.totalSum);
  }

  public formatCurrency(amount: number): string {
    return `${amount.toFixed(2)}zł`;
  }
}
</script>