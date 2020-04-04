<template>
  <div id="map" style="height: 400px"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import markerIconDataUrl from "@/assets/marker-icon.png";
import markerIcon2DataUrl from "@/assets/marker-icon-2.png";
import state from "../state";
declare let L: any;
const defaultZoom = 14;
const markerIcon = new L.Icon({ iconUrl: markerIconDataUrl });
const markerIcon2 = new L.Icon({ iconUrl: markerIcon2DataUrl });

@Component
export default class LeafletMap extends Vue {
  private locationMarker: any;
  private map: any;
  private storeLayers: any[] = [];
  private selectedStores: any[] = [];

  public getSelection(): any[] {
    return this.selectedStores;
  }

  private clearStores() {
    if (this.map) {
      this.storeLayers.forEach(sl => this.map.removeLayer(sl));
      this.storeLayers.length = 0;
    }
  }

  private drawStores(stores: any[]) {
    stores.forEach(s => {
      const marker = new L.Marker(s.location);
      marker.setIcon(
        this.selectedStores.includes(s) ? markerIcon2 : markerIcon
      );
      marker.data = s;
      marker.on("click", (e: any) => this.spawnPopup(e.target));
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
    this.map.on("locationfound", this.onLocationFound.bind(this));

    this.map.on("moveend", () => {});
    this.map.setView({ lat: 51.759247, lng: 19.455982 }, defaultZoom);
    this.map.addLayer(osm);
  }

  private async onLocationFound(locationEvent: any) {
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
  }

  public mounted() {
    this.initMap();
  }

  private onPopupClick(e: MouseEvent, store: any, marker: any) {
    const t = e.target as HTMLElement;
    if (t.tagName === "BUTTON") {
      e.preventDefault();
      if (this.selectedStores.includes(store)) {
        this.selectedStores.splice(this.selectedStores.indexOf(store), 1);
        marker.setIcon(markerIcon);
      } else {
        this.selectedStores.push(store);
        marker.setIcon(markerIcon2);
      }
    }
  }

  private spawnPopup(marker: any) {
    const store = marker.data;
    const popupContent = document.createElement("div");
    popupContent.innerHTML = `<h4>(shop name)</h4><p>Location<br>Opening hours<br>Other info</p><button class="btn btn-sm btn-primary btn-block">Toggle</button>`;
    popupContent.addEventListener("click", (e: MouseEvent) =>
      this.onPopupClick(e, store, marker)
    );
    const popup = new L.popup()
      .setLatLng(store.location)
      .setContent(popupContent)
      .openOn(this.map);
    this.map.setView(store.location, this.map.getZoom());
  }
}
</script>
<style>
.leaflet-popup-content-wrapper {
  text-align: center;
}
</style>