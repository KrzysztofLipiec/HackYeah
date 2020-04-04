<template>
  <b-container>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between" variant="secondary">
            <div class="d-flex align-items-center">
              <b class="ml-1 item-name__title">Item name</b>
              <b class="ml-1 item-availability__title">Item availability</b>
              <b class="ml-1 item-price__title">Item price</b>
            </div>
            <div class="d-flex flex-row-reverse align-content-center">
              <b-button
                class="mr-2"
                @click="backToDashboard"
                variant="primary"
                size="xs"
              >Back To Dashboard</b-button>
              <b-button class="mr-2" @click="applyChanges" variant="success" size="xs">Order Ready</b-button>
            </div>
          </b-list-group-item>
          <b-list-group-item
            class="d-flex justify-content-between"
            v-for="(item, index) in items"
            :key="index"
          >
            <div class="d-flex align-items-center">
              <b class="ml-1 item-name">{{item.name}}</b>
              <b-form-input class="ml-1 item-price" v-model="item.price" type="number" required></b-form-input>
            </div>
            <div class="d-flex align-items-center">
              <div class="mr-5 icon" @click="reportNoGoods(item)">
                <b-icon-dash-circle-fill />
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TShopOrder } from "../../interfaces/TShopOrder";
import state from "../../state";
import { TShopItem } from "@/interfaces/TShopItem";
@Component({})
export default class ShopOrder extends Vue {
  private items: Array<TShopItem> = [];

  public mounted(): void {
    this.getOrder();
  }

  public backToDashboard(): void {
    this.$router.push("/backstageDashboard");
  }

  public applyChanges(): void {
    fetch(`${state.apiUrl}orders/${this.$route.params.orderId}/ready`, {
      method: "post"
    });
  }

  private async getOrder(): Promise<void> {
    const order = await (
      await fetch(`${state.apiUrl}orders/${this.$route.params.orderId}`)
    ).json();
    this.items = order.items;
  }
}
</script>