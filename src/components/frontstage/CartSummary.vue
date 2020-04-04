<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.name">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TShopItem } from "../../interfaces/TShopItem";
@Component
export default class CartSummary extends Vue {
  @Prop(Array)
  private readonly items!: TShopItem[];
}
</script>