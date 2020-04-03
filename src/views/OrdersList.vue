<template>
    <div>
        <h1>Your orders</h1>

        <ul class="d-flex align-content-center flex-wrap justify-content-around" fluid="md">
            <router-link to="/orders/" v-for="order in orders" tag="li">
                <b-card
                        :title="order.name"
                        :img-src="order.shopPhoto"
                        img-alt="Shop photo"
                        img-top
                        style="max-width: 20rem"
                        class="mb-2"
                >
                    <b-card-text>
                        <b-list-group v-for="item in order.items">
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                {{item.name}}
                                <b-badge variant="primary" pill>{{item.count}}</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-card>
            </router-link>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import {TShopOrder} from "@/interfaces/TShopOrder";

    @Component
    export default class OrdersList extends Vue {
        @Prop() public orders: TShopOrder[] = [];
        constructor() {
            super();
            this.fetchOrders();
        }
        private fetchOrders(): void {
            const userId: string = (<any>window).getUserId();
            const item: TShopOrder = {
                name: 'chrabo',
                shopPhoto: 'https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/spidersweb/2020/04/biedronka-godziny-otwarcia-1180x541.jpg',
                items: [
                    {
                        name: 'carrots',
                        count: 12,
                        price: 2
                    },
                    {
                        name: 'potatoes',
                        count: 50,
                        price: 100
                    }
                    ,{
                        name: 'onion',
                        count: 6,
                        price: 20
                    }
                ]
            };
            for(let i = 0; i < 10; i++) {
                this.orders.push(item);
            }
        }
    }
</script>
