<template>
  <div id="map" style="height: 400px"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import state from "../state";
declare let L: any;
const defaultZoom = 14;

@Component
export default class LeafletMap extends Vue {
  private locationMarker: any;
  private map: any;
  private storeLayers: any[] = [];

  clearStores() {
    if (this.map) {
      this.storeLayers.forEach(sl => this.map.removeLayer(sl));
      this.storeLayers.length = 0;
    }
  }

  private drawStores(stores: any[]) {
    stores.forEach(s => {
      const marker = new L.Marker(s.location);
      marker.data = s;
      marker.on("click", (e: any) => this.spawnPopup(e.target.data));
      this.map.addLayer(marker);
      this.storeLayers.push(marker);
    });
  }

  private async getStores(latlng: any) {
    return (
      await fetch(`${state.apiUrl}map/${latlng.lat}/${latlng.lng}/2`, {
        method: "GET"
      })
    ).json();
  }

  private initMap() {
    this.map = new L.Map("map");
    let osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let osm = new L.TileLayer(osmUrl, {
      minZoom: 1,
      maxZoom: 18,
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    this.map.locate({ setView: true, maxZoom: defaultZoom });
    this.map.on("locationfound", async (locationEvent: any) => {
      if (!this.locationMarker) {
        this.locationMarker = new L.circleMarker(locationEvent.latlng);
        this.clearStores();
        let stores = await this.getStores(locationEvent.latlng);
        this.drawStores(stores);
        this.map.addLayer(this.locationMarker);
      } else {
        this.locationMarker.setLatLng(locationEvent.latlng);
      }
      this.map.setView(locationEvent.latlng, defaultZoom);
    });

    this.map.on("moveend", () => {});
    this.map.setView({ lat: 51.759247, lng: 19.455982 }, defaultZoom);
    this.map.addLayer(osm);
  }

  public mounted() {
    this.initMap();
  }

  private spawnPopup(store: any) {
    const popup = new L.popup()
      .setLatLng(store.location)
      .setContent(`<h3>no elo</h3>`)
      .openOn(this.map);
    this.map.setView(store.location, this.map.getZoom());
  }
}
</script>
