<template>
  <div id="map" style="height: 400px"></div>
</template>
<script>
import state from "../state";
const defaultZoom = 14;
export default {
  mounted: function() {
    initMap();
  }
};
var storeLayers = [];
let map;

function initMap() {
  let locationMarker;
  let shopMarkers;
  map = new L.Map("map");
  var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var osmAttrib =
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {
    minZoom: 1,
    maxZoom: 18,
    attribution: osmAttrib
  });
  map.locate({ setView: true, maxZoom: defaultZoom });
  map.on("locationfound", async locationEvent => {
    if (!locationMarker) {
      locationMarker = new L.circleMarker(locationEvent.latlng);
      clearStores();
      let stores = await getStores(locationEvent.latlng);
      drawStores(stores);
      map.addLayer(locationMarker);
    } else {
      locationMarker.setLatLng(locationEvent.latlng);
    }
    map.setView(locationEvent.latlng, defaultZoom);
  });

  map.on("moveend", () => {});
  map.setView({ lat: 51.759247, lng: 19.455982 }, defaultZoom);
  map.addLayer(osm);
}

function clearStores() {
  if (map) {
    storeLayers.forEach(sl => map.removeLayer(sl));
    storeLayers.length = 0;
  }
}

async function getStores(latlng) {
  return (
    await fetch(`${state.apiUrl}map/${latlng.lat}/${latlng.lng}/2`, {
      method: "GET"
    })
  ).json();
}

function drawStores(stores) {
  stores.forEach(s => {
    const marker = new L.Marker(s.location);
    marker.data = s;
    marker.on("click", e => {
      spawnPopup(e.target.data);
    });
    map.addLayer(marker);
    storeLayers.push(marker);
  });
}

function spawnPopup(store) {
  const popup = new L.popup()
    .setLatLng(store.location)
    .setContent(`<h3>no elo</h3>`)
    .openOn(map);
  map.setView(store.location, map.getZoom());
}
</script>
