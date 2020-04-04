<template>
  <b-container>
    <b-row>
      <b-col cols="8">
        <b-card>
          <h1>Select payment method</h1>
          <b-form class="text-left" @submit="onSubmit">
            <b-form-group>
              <b-form-radio
                v-model="paymentMethodType"
                name="paymentMethodType"
                value="creditCard"
              >Credit card</b-form-radio>
              <b-form-radio v-model="paymentMethodType" name="paymentMethodType" value="blik">Blik</b-form-radio>
              <b-form-radio v-model="paymentMethodType" name="paymentMethodType" value="payU">payU</b-form-radio>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox v-model="acceptedTerms">I've read terms and conditions wink wink</b-form-checkbox>
            </b-form-group>
            <b-button
              size="lg"
              variant="success"
              type="submit"
              :disabled="isPending"
            >Make it rain! 💸</b-button>
            <b-button size="lg" variant="light" @click="goBack">Go back</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <h1>My cart 🛒</h1>
        <cart-summary :items="cartItems"></cart-summary>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import state from "../../state";
import { TShopItem } from "../../interfaces/TShopItem";
import CartSummary from "../../components/frontstage/CartSummary.vue";
import { PaymentMethodType } from "@/interfaces/PaymentMethodType";
@Component({
  components: {
    CartSummary
  }
})
export default class Checkout extends Vue {
  acceptedTerms: boolean = true;
  cartItems: TShopItem[] = [];
  isPending: boolean = false;
  paymentMethodType: PaymentMethodType = PaymentMethodType.creditCard;

  public goBack(e: MouseEvent) {
    e.preventDefault();
    this.$router.back();
  }

  public mounted() {
    this.cartItems.length = 0;
    this.cartItems.push(...state.cart.items);
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    this.isPending = true;
    void fetch(`${state.apiUrl}orders`, {
      body: JSON.stringify(state.cart),
      method: "POST"
    }).then(() => {
      alert("OK");
      this.isPending = false;
    });
  }
}
</script>