
//declare layers
var standard = L.tileLayer.provider('OpenStreetMap.Mapnik');
var sat = L.tileLayer.provider('Esri.WorldImagery');
var stamentoner = L.tileLayer.provider('Stamen.Toner');

const myGeoapify = "29e03bd651df4e70b56db34c0ebd5253";

//basemaps
var basemaps = {
    'Standard Map': standard,
    'Satellite Image': sat,
    'Toner': stamentoner
}

//Main map
map = L.map('map', {
    center:[8.241137015981792, 124.24375643514865], //lat, long
    zoom: 17,
    layers: [standard]
});


//Iligan City boundary geoJSON wikidata:Q285488 export geoJSON on overpass turbo, finalize on geojson.io
var geoOptions = {
    maxZoom: 16,
    tolerance: 0,
    debug: 0,
    style:{
        color: "#0000FF",
    },
};
//OSM wikidata Q285488
var ic_admin = L.geoJson(lineJSON, geoOptions).addTo(map);

//shapefile
var ic_full_admin = L.geoJson(ic_full_admin, geoOptions).addTo(map);

//declare overlays
var labels = L.tileLayer.provider('Stamen.TonerLabels');
var streets = L.tileLayer.provider('Stamen.TonerLines');

//initialize overlays
var overlays = {
    "Iligan Admin Boundary": ic_admin,
    "full admin boundaries": ic_full_admin,
    "labels": labels,
    'streets': streets
}

//map layers/ control layer of basemaps and overlays
var maplayers = L.control.layers(basemaps,overlays).addTo(map);

//search Control plugin https://github.com/perliedman/leaflet-control-geocoder
L.Control.geocoder().addTo(map);
//leaflet-locate plugin https://github.com/domoritz/leaflet-locatecontrol
L.control.locate().addTo(map);

addMarker = false;
marker = null;

document.querySelector(".addev").addEventListener("click", function() {
  addMarker = !addMarker; // toggle addMarker variable

  if (addMarker) {
    // enable marker adding
    map.on("click", function(ev) {
      if (marker !== null) {
        map.removeLayer(marker); // remove previous marker
      }
      marker = new L.marker(ev.latlng).addTo(map);
      var coordinates = map.mouseEventToLatLng(ev.originalEvent);

       // update latitude and longitude values in the modal
    document.getElementById("forlat").value = coordinates.lat;
    document.getElementById("forlng").value = coordinates.lng;

  const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&apiKey=${myGeoapify}`;

    fetch(reverseGeocodingUrl).then(result => result.json())
    .then(featureCollection => {
      if (featureCollection.features.length === 0) {
        document.getElementById("status").textContent = "The address is not found";
        return;
      }
      const foundAddress = featureCollection.features[0];
      document.getElementById("address").value = (foundAddress.properties.name || '') + ', ' + (foundAddress.properties.street || '')+ ', ' + (foundAddress.properties.city || '');

    })
      //code for showing modal
      var modalElement = document.querySelector('#report_mod');
    var modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
    });
  } else {
    // disable marker adding
    map.off("click");
  }
});

// Function to handle cancel button functionality
function handleCancelButton() {
  if (marker !== null) {
    map.removeLayer(marker); // remove the marker
  }
  addMarker = false; // disable addMarker
  map.off("click"); // disable marker adding
}

// Add an event listener to the cancel button
document.getElementById("cancelmod").addEventListener("click", handleCancelButton);

// Add an event listener to the cancel-modal button
document.getElementById("cancel-modal").addEventListener("click", handleCancelButton);




// var circle = L.circle([8.241,124.244],
//   {
//     color: 'red',
//     radius:200,
//     fillOpacity:0.4,
//     fillColor:'red'
//   }).addTo(map);
// circle.bindPopup("Temperature: 35deg, Humidity: 91%")

//create marker onclick

//create lat and lng on click
//map.on('click', function(ev))
/*
- Decide if mag butang pa ug layer for barangays or IC admin boundary nalang
- find ways na malimit ang marker to iligan city
*/

/* 
important resources for geoJson
mapshaper
overpass turbo
geojson.io
*/