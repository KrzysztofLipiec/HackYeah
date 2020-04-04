<template>
  <div class="shops">
    <b-container>
      <h1>Select shops</h1>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="How far can you go?" label-for="input-1">
          <b-form-select id="input-1" v-model="selectedDistance" :options="distances" required></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="When would you like to pick up?"
          label-for="input-2"
        >
          <b-form-select id="input-2" v-model="selectedHour" :options="hours" required></b-form-select>
        </b-form-group>
        <b-form-group label="Select shops that you can go to:">
          <leaflet-map ref="map"></leaflet-map>
        </b-form-group>

        <b-button
          class="float-right"
          type="submit"
          size="lg"
          variant="success"
        >Proceed to item selection</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script lang="ts">
interface SelectOption<T> {
  text: string;
  value: T;
}
import { Component, Prop, Vue } from "vue-property-decorator";
import LeafletMap from "../../components/LeafletMap.vue";

@Component({
  components: { LeafletMap }
})
export default class Shops extends Vue {
  private distances: SelectOption<number>[];
  private hours: SelectOption<number>[];
  private selectedDistance: number;
  private selectedHour: number;

  constructor() {
    super();
    this.distances = this.getDistances();
    this.hours = this.getHours();
    this.selectedDistance = this.distances[0].value;
    this.selectedHour = this.hours[0].value;
  }

  getDistances(): SelectOption<number>[] {
    const distancesInMeters = [100, 250, 500, 1000];
    const result = distancesInMeters.map(meters => ({
      text: `${meters}m`,
      value: meters
    }));
    return result;
  }

  getHours(): SelectOption<number>[] {
    const now = new Date();
    const result = [];
    for (let i = 1; i <= 36; i++) {
      const hour = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours() + i,
        0,
        0
      );
      if (hour.getHours() > 6 && hour.getHours() < 22) {
        result.push({
          value: hour.getTime(),
          text: hour.toLocaleTimeString() + " " + hour.toLocaleDateString()
        });
      }
    }
    return result;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(
      JSON.stringify(
        [
          this.selectedDistance,
          this.selectedHour,
          (this.$refs.map as LeafletMap).getSelection()
        ],
        null,
        2
      )
    );
    this.$router.push("collectingItems");
  }
}
</script>

<style scoped>
.shops {
  text-align: left;
}
</style>
