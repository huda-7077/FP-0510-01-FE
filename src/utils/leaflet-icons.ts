import L from "leaflet";

const customIcon = L.divIcon({
  className: "leaflet-custom-icon",
  html: `
    <div style="display: flex; justify-content: center; align-items: center; width: 32px; height: 32px;">
      <img src="/map-pin.svg" alt="Map Pin" style="width: 24px; height: 24px;" />
    </div>`,
});
L.Marker.prototype.options.icon = customIcon;
