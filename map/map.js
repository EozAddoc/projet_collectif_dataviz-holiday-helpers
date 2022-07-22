//Geolocalisation


async function myPosition(lat, lng) {
  lat = navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.latitude);
  });

  lng = navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.longitude);
  });
}
myPosition();
// Map tile imagery


  var map = L.map("map").setView([53, 0], 6);

  //OSM layer
  var OpenStreetMap_France = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    {
      maxZoom: 20,
      attribution:
        '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  OpenStreetMap_France.addTo(map);


  //markers NOT WORKING !!!!
   var marker = L.marker([48.876209335951565, 2.3198562079823546]).addTo(map);
//   var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);
//   L.Control.geocoder().addTo(map);
  
//  // Control 2: This add a scale to the map
//  L.control.scale().addTo(map);

//  // Control 3: This add a Search bar
// 	 var searchControl = new L.esri.Controls.Geosearch().addTo(map);

// 	 var results = new L.LayerGroup().addTo(map);

// 	   searchControl.on('results', function(data){
// 		 results.clearLayers();
// 		 for (var i = data.results.length - 1; i >= 0; i--) {
// 		   results.addLayer(L.marker(data.results[i].latlng));
// 		 }
// 	   });

//   // the popups to tell you location
//   var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);
