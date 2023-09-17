import L from "leaflet";

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const hospitalIcon = L.icon({
  iconSize: [25, 25],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "./hospital-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

const fireIcon = L.icon({
  iconSize: [25, 25],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "./fire-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

const policeIcon = L.icon({
  iconSize: [25, 25],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "./police-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

export {hospitalIcon, policeIcon, fireIcon}