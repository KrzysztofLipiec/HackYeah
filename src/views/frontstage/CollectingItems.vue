<template>
  <b-container>
    <div>
      <b-form autocomplete="off" @submit="onSubmit">
        <b-row>
          <b-col cols="8">
            <b-card>
              <h1>What do you need?</h1>
              <b-form-group>
                <b-input type="search" @input="onQueryInput" v-model="query"></b-input>
                <b-form-text>{{ helpingText }}</b-form-text>
              </b-form-group>
              <b-list-group>
                <b-list-group-item
                  :variant="getVariant(suggestion)"
                  v-for="(suggestion, index) in suggestions"
                  :key="suggestion.name"
                >
                  <div class="d-flex justify-content-between">
                    {{ suggestion.name }}
                    <b-button
                      v-if="!isSuggestionSelected(suggestion)"
                      variant="primary"
                      @click="toggleSuggestion($event, suggestion, index)"
                    >Add</b-button>
                    <b-button
                      v-if="isSuggestionSelected(suggestion)"
                      variant="light"
                      @click="toggleSuggestion($event, suggestion, index)"
                    >Remove</b-button>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
          <b-col>
            <h1>My cart 🛒</h1>
            <cart-summary :orders="shopOrders"></cart-summary>
            <b-button v-if="hasSomethingInCart" type="submit" size="lg" variant="success">Checkout</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TShopItem } from "../../interfaces/TShopItem";
import { Availability } from "../../interfaces/Availability";
import { Measure } from "../../interfaces/Measure";
import CartSummary from "@/components/frontstage/CartSummary.vue";
import state from "../../state";
import { TShopOrder } from "../../interfaces/TShopOrder";

const lengthThreshold = 3;

@Component({
  components: { CartSummary }
})
export default class CollectingItems extends Vue {
  public query: string = "";
  public selectedItems: TShopItem[] = [];
  public suggestions: TShopItem[] = this.getMostPopularItems();

  get hasSomethingInCart(): boolean {
    return this.selectedItems.length > 0;
  }

  get helpingText(): string {
    if (this.query.length === 0) {
      return "Showing most popular items";
    }
    if (this.query.length < lengthThreshold) {
      return `Type ${lengthThreshold - this.query.length} more character(s)`;
    }
    return `Showing items containing "${this.query}"`;
  }

  async fetchItemSuggestions(query: string): Promise<TShopItem[]> {
    const response = await fetch(`${state.apiUrl}itemSuggestions`);
    return response.json();
  }

  getMostPopularItems(): TShopItem[] {
    return [
      {
        name: "Piwo",
        count: 1,
        price: 1,
        shopName: "Żabka",
        availability: Availability.high,
        photo: "",
        measure: Measure.kg
      }
    ];
  }

  get shopOrders(): TShopOrder[] {
    // TODO, fetch it
    const groupedItems = new Map<string, TShopItem[]>();
    this.selectedItems.forEach(item => {
      if (!groupedItems.has(item.shopName)) {
        groupedItems.set(item.shopName, []);
      }
      groupedItems.get(item.shopName)!.push(item);
    });
    const result: TShopOrder[] = [];
    groupedItems.forEach((items, shopName) => {
      const order: TShopOrder = {
        name: shopName,
        shopPhoto: "",
        items: items,
        timestamp: Date.now()
      };
      result.push(order);
    });
    return result;
  }

  getVariant(suggestion: TShopItem): string {
    return this.isSuggestionSelected(suggestion) ? "primary" : "";
  }

  isSuggestionSelected(suggestion: TShopItem): boolean {
    return this.selectedItems.some(si => suggestion.name === si.name);
  }

  mounted() {
    this.selectedItems.length = 0;
    const shopOrders = state.cart.shopOrders;
    this.selectedItems.push(...shopOrders.flatMap(o => o.items));
  }

  async onQueryInput() {
    if (this.query.length >= lengthThreshold) {
      let fetchedSuggestions = await this.fetchItemSuggestions(this.query);
      this.suggestions.length = 0;
      this.suggestions.push(...Object.values(fetchedSuggestions));
    }
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    console.log(this.selectedItems);
    state.cart = { shopOrders: this.shopOrders };
    this.$router.push("checkout");
  }

  toggleSuggestion(e: MouseEvent, suggestion: TShopItem, index: number) {
    e.preventDefault();
    if (this.isSuggestionSelected(suggestion)) {
      this.selectedItems.splice(this.selectedItems.indexOf(suggestion), 1);
    } else {
      this.selectedItems.push({
        count: 1,
        ...suggestion
      });
    }
  }
}
</script>