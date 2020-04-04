import {Measure} from "@/interfaces/Measure";
import {Measure} from "@/interfaces/Measure";
import {Availability} from "@/interfaces/Availability";
import {Measure} from "@/interfaces/Measure";
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
                    <b-button class="mr-2" @click="applyChanges" variant="primary" size="xs">Apply changes</b-button>
                    <b-button class="mr-2" @click="addNewItem" variant="success" size="xs">Add item</b-button>
                </div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between" v-for="(item, index) in shopItems">
                <div class="d-flex align-items-center">
                    <b class="ml-1 item-name">{{item.name}}</b>
                    <b-form-select class="ml-1 item-availability" v-model="item.availability" :options="availabilityOptions"></b-form-select>
                    <b-form-input
                            class="ml-1 item-price"
                            v-model="item.price"
                            type="number"
                            required
                    ></b-form-input>
                </div>
                <div class="d-flex align-items-center">
                    <div class="mr-5 icon" @click="removeItem(index)">
                        <b-icon-trash></b-icon-trash>
                    </div>
                    <div class="mr-5 icon" @click="openEditModal(item, index)">
                        <b-icon-pencil></b-icon-pencil>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Availability} from "@/interfaces/Availability";
    import {TShopItem} from "@/interfaces/TShopItem";
    import {Measure} from "@/interfaces/Measure";

    @Component
export default class ShopAssortment extends Vue {

    availabilityOptions: Availability[];
    measureOptions: Measure[];
    shopItems: TShopItem[];
    isEditModalOpen: boolean = false;
    isNewItem: boolean = false;
    selectedItemData: TShopItem;
    selectedItemIndex: number;

    constructor() {
        super();
        this.availabilityOptions = [
            Availability.high,
            Availability.medium,
            Availability.low,
        ];
        this.measureOptions = [
            Measure.piece,
            Measure.kg
        ];
        this.selectedItemIndex = 0;
        this.selectedItemData = this.createEmptyItem();
        this.shopItems = this.fetchShopItems();
    }

    private createEmptyItem(): TShopItem {
        return {
            name: '',
            count: 0,
            price: 0,
            measure: Measure.piece,
            availability: Availability.low,
            photo: ''
        };
    }

    public addNewItem(): void {
        this.selectedItemData = this.createEmptyItem();
        this.isNewItem = true;
        this.isEditModalOpen = true;
    }

    public removeItem(index: number): void {
        this.shopItems.splice(index, 1);
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
        } else {
            this.editItem();
        }
        this.isNewItem = false;
        this.closeEditModal();
    }

    public applyChanges(): void {
        console.log('save changes');
    }

    private editItem(): void {
        this.shopItems[this.selectedItemIndex].name = this.selectedItemData.name;
        this.shopItems[this.selectedItemIndex].count = this.selectedItemData.count;
        this.shopItems[this.selectedItemIndex].price = this.selectedItemData.price;
        this.shopItems[this.selectedItemIndex].availability = this.selectedItemData.availability;
        this.shopItems[this.selectedItemIndex].measure = this.selectedItemData.measure;
    }

    fetchShopItems(): TShopItem[] {
        const items: TShopItem[] = [];
        for (let i = 0; i < 10; i++) {
            const shopItem: TShopItem = {
                name: 'carrot',
                count: 12,
                price: 100,
                availability: Availability.medium,
                photo: 'https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg',
                measure: Measure.kg
            };
            items.push(shopItem)
        }
        return items;
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
    .item-price__title
    {
        width: 60px;
    }
    .item-name {
        width: 150px;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .item-availability{
        width: 100px;
    }
    .item-price{
        width: 60px;
    }
</style>
