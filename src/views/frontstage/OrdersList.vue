<template>
    <div>
        <h1>Your orders</h1>

        <ul class="d-flex align-content-center flex-wrap justify-content-around" fluid="md">
            <li v-for="order in orders">
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
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {TShopOrder} from "@/interfaces/TShopOrder";

    @Component
    export default class OrdersList extends Vue {
        private orders: TShopOrder[] = [];
        constructor() {
            super();
            void this.fetchOrders();
        }

        private async fetchOrders(): Promise<void> {
            const userId: string = (<any>window).getUserId();
            const response: Response = await fetch('http://localhost:9123/orders',
                {
                method: "GET",
                });
            this.orders = await response.json();
        }
    }
</script>
