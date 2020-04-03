<template>
  <div class="shops">
    <b-container>
      <b-form>
        <b-form-group id="input-group-3" label="How far can you go?" label-for="input-3">
          <b-form-select id="input-3" v-model="form.distance" :options="distances" required></b-form-select>
        </b-form-group>
      </b-form>
      <leaflet-map></leaflet-map>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import LeafletMap from "@/components/LeafletMap.vue";
// import HelloWorld from "@/components/HelloWorld.vue";
const distancesInMeters = [100, 250, 500, 1000];

export default {
  name: "Shops",
  components: {
    LeafletMap
  },
  data: () => ({
    distances: distancesInMeters.map(meters => ({
      text: `${meters}m`,
      value: meters
    })),
    form: {
      distance: distancesInMeters[0]
    }
  })
};
</script>

<style scoped>
.shops {
  text-align: left;
}
</style>