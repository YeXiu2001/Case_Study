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

