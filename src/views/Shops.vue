<template>
  <div class="shops">
    <b-container>
      <b-form>
        <b-form-group id="input-group-1" label="How far can you go?" label-for="input-1">
          <b-form-select id="input-1" v-model="form.distance" :options="distances" required></b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="When would you like to pick up?"
          label-for="input-2"
        >
          <b-form-select id="input-2" v-model="form.hour" :options="hours" required></b-form-select>
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
const hours = [];

export default {
  name: "Shops",
  components: {
    LeafletMap
  },
  data: () => ({
    distances: getDistances(),
    hours: getHours(),
    form: {
      distance: getDistances()[0].value,
      hour: getHours()[0].value
    }
  })
};

function getDistances() {
  const distancesInMeters = [100, 250, 500, 1000];
  const result = distancesInMeters.map(meters => ({
    text: `${meters}m`,
    value: meters
  }));
  return result;
}

function getHours() {
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
</script>

<style scoped>
.shops {
  text-align: left;
}
</style>