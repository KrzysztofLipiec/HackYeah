<template>
  <div>
    <h1>Shop Assortment</h1>
    <b-modal v-model="isEditModalOpen" hide-footer title="Edit item">
      <b-form>
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            v-model="selectedItemData.name"
            type="text"
            required
            placeholder="Enter product name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Price:" label-for="price">
          <b-form-input
            v-model="selectedItemData.price"
            type="number"
            required
            placeholder="Enter price"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Count:" label-for="count">
          <b-form-input
            v-model="selectedItemData.count"
            type="number"
            required
            placeholder="Enter count"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Availability:" label-for="availability">
          <b-form-select v-model="selectedItemData.availability" :options="availabilityOptions"></b-form-select>
        </b-form-group>
        <b-form-group label="Measure:" label-for="measure">
          <b-form-select v-model="selectedItemData.measure" :options="measureOptions"></b-form-select>
        </b-form-group>
        <b-form-group label="Photo:" label-for="photo">
          <b-form-input
            v-model="selectedItemData.photo"
            type="text"
            required
            placeholder="Enter photo url"
          ></b-form-input>
        </b-form-group>
        <div>
          <b-form-group label="Photo preview:" label-for="picture">
            <b-img-lazy
              v-show="isValidUrl(selectedItemData.photo)"
              :src="selectedItemData.photo"
              style="max-width: 100%"
              alt="Photo photo"
            ></b-img-lazy>
            <b-img-lazy
              v-show="!isValidUrl(selectedItemData.photo)"
              src="https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              style="max-width: 100%"
              alt="Photo default photo"
            ></b-img-lazy>
          </b-form-group>
        </div>
        <div class="d-flex flex-row-reverse">
          <b-button class="ml-2" variant="primary" @click="applyChangesInItem">Apply</b-button>
          <b-button variant="primary" @click="closeEditModal">Close</b-button>
        </div>
      </b-form>
    </b-modal>
    <b-list-group>
      <b-list-group-item class="d-flex justify-content-between" variant="secondary">
        <div class="d-flex align-items-center">
          <b class="ml-1 item-name__title">Item name</b>
          <b class="ml-1 item-availability__title">Item availability</b>
          <b class="ml-1 item-price__title">Item price</b>
        </div>
        <div class="d-flex flex-row-reverse align-content-center">
          <b-button class="mr-2" @click="addNewItem" variant="success" size="xs">Add</b-button>
        </div>
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between items-container"
        v-for="(item, index) in shopItems"
      >
        <div class="d-flex align-items-center">
          <b class="ml-1 item-name">{{item.name}}</b>
          <b-form-select
            class="ml-1 item-availability"
            v-model="item.availability"
            :options="availabilityOptions"
          ></b-form-select>
          <b-form-input class="ml-1 item-price" v-model="item.price" type="number" required></b-form-input>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-2 icon" @click="removeItem(index)">
            <b-icon-trash></b-icon-trash>
          </div>|
          <div class="mr-2 ml-2 icon" @click="openEditModal(item, index)">
            <b-icon-pencil></b-icon-pencil>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Availability } from "@/interfaces/Availability";
import { TShopItem } from "@/interfaces/TShopItem";
import { Measure } from "@/interfaces/Measure";
import state from "@/state";
import { TFetchActions } from "@/interfaces/TFetchActions";

@Component
export default class ShopAssortment extends Vue {
  availabilityOptions: Availability[];
  measureOptions: Measure[];
  shopItems: TShopItem[] = [];
  isEditModalOpen: boolean = false;
  isNewItem: boolean = false;
  selectedItemData: TShopItem;
  selectedItemIndex: number;
  shopName: string;

  constructor() {
    super();
    this.availabilityOptions = [
      Availability.high,
      Availability.medium,
      Availability.low
    ];
    this.measureOptions = [Measure.piece, Measure.kg];
    this.selectedItemIndex = 0;
    this.shopName = state.shopName;
    this.selectedItemData = this.createEmptyItem();
    void this.fetchShopItems();
  }

  private async fetchShopItems(): Promise<void> {
    const apiResponse: Response = await fetch(
      `${state.apiUrl}products/${state.shopName}`,
      { method: "GET" }
    );
    const fetchedItems: TShopItem[] = await apiResponse.json();
    this.shopItems = fetchedItems;
  }

  private async backendProcedureCreateItem(item: TShopItem): Promise<void> {
    await fetch(`${state.apiUrl}products/${state.shopName}`, {
      method: `${TFetchActions.POST}`,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item)
    });
  }

  private async backendProcedureUpdateItem(item: TShopItem): Promise<void> {
    await fetch(`${state.apiUrl}products/${state.shopName}/${item.id}`, {
      method: `${TFetchActions.PUT}`,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(item)
    });
  }

  private async backendProcedureRemoveItem(item: TShopItem): Promise<void> {
    await fetch(`${state.apiUrl}products/${state.shopName}/${item.id}`, {
      method: `${TFetchActions.DELETE}`
    });
  }

  private editItem(): void {
    this.shopItems[this.selectedItemIndex].name = this.selectedItemData.name;
    this.shopItems[this.selectedItemIndex].count = this.selectedItemData.count;
    this.shopItems[this.selectedItemIndex].price = this.selectedItemData.price;
    this.shopItems[
      this.selectedItemIndex
    ].availability = this.selectedItemData.availability;
    this.shopItems[
      this.selectedItemIndex
    ].measure = this.selectedItemData.measure;
  }

  private createEmptyItem(): TShopItem {
    return {
      name: "",
      count: 0,
      price: 0,
      measure: Measure.piece,
      availability: Availability.low,
      photo: ""
    };
  }

  public addNewItem(): void {
    this.selectedItemData = this.createEmptyItem();
    this.isNewItem = true;
    this.isEditModalOpen = true;
  }

  public removeItem(index: number): void {
    const removedItem: TShopItem = this.shopItems.splice(index, 1)[0];
    this.backendProcedureRemoveItem(removedItem);
  }

  public openEditModal(item: TShopItem, index: number) {
    this.selectedItemData = JSON.parse(JSON.stringify(item));
    this.selectedItemIndex = index;
    this.isEditModalOpen = true;
  }

  public closeEditModal() {
    this.isEditModalOpen = false;
  }

  public applyChangesInItem(): void {
    if (this.isNewItem) {
      this.shopItems.push(this.selectedItemData);
      this.backendProcedureCreateItem(this.selectedItemData);
    } else {
      this.editItem();
      this.backendProcedureUpdateItem(this.shopItems[this.selectedItemIndex]);
    }
    this.isNewItem = false;
    this.closeEditModal();
  }

  public isValidUrl(photoUrl: string): boolean {
    const checkUrl: RegExp = new RegExp(
      "(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?"
    );
    return checkUrl.test(photoUrl);
  }
}
</script>
<style>
b {
  text-align: left;
}
.icon {
  cursor: pointer;
}
.item-name__title {
  width: 150px;
}
.item-availability__title {
  width: 100px;
}
.item-price__title {
  width: 60px;
}
.item-name {
  width: 150px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-availability {
  width: 100px;
}
.item-price {
  width: 60px;
}
</style>
