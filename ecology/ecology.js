var banner = document.querySelector("banner");
var lati
var longi
//THe data
const airAPi = " https://api.ambeedata.com/latest/by-lat-lng?lat=12&lng=77";
const weatherAPi =
  "https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=17";
const pollenApi =
  "https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12&lng=17";

//Map stuff

// Map tile imagery

var map = L.map("map")
map.setView([0, 0], 2);

//OSM layer


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

OpenStreetMap_Mapnik.addTo(map);
 
function searchBar(){
  var geocoder = L.Control.geocoder()
    .on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]).addTo(map);
      var z =map.fitBounds(poly.getBounds());
      lati =(z._renderer._center.lat)
      longi=(z._renderer._center.lng)
      console.log(lati)
       return(lati)
    })
    .addTo(map);
}
 var no= searchBar()
console.log(no)



//markers
 let marker = L.marker([0, 0]).addTo(map);
// //console.log(marker.getLatLng())





 
//Geolocalisation
async function myPosition() {
  const lat = navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.latitude) ;
  });
  console.log(lat)

  const lng = navigator.geolocation.watchPosition((position) => {
    console.log(position.coords.longitude);
  });
  var myIcon = L.icon({
    iconUrl: 'markers/street.png',
    iconSize: [38, 40],
    iconAnchor: [22, 94],
});
}
//myPosition()

async function air(lati, longi) {
  url = `https://api.ambeedata.com/latest/by-lat-lng?lat=${lati}&lng=${longi}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key":
        "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
      "Content-type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  let aQI = await data.stations[0].aqiInfo.category;
  console.log(aQI);
  let ozone = await data.stations[0].OZONE;
  let city = await data.stations[0].city
  let coord = await data.stations[0];
  console.log(coord);
  const { lat, lng } = coord;
 
  var myIcon = L.icon({
    iconUrl: 'markers/co2.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});
  
  new marker.setLatLng([lat, lng],{icon:myIcon});
}
//air();

async function getMeteo() {
  const res = await fetch(weatherAPi, {
    method: "GET",
    headers: {
      "x-api-key":
        "733803cf88f90a7486548ce9580f0cf1b52ae6e8746624ca4a795e3f2754c421",
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  let temperature = await data.data.temperature;
  let coord = await data.data;
  const { lat, lng } = coord;
  var myIcon = L.icon({
    iconUrl: 'markers/hot.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
});
new marker.setLatLng([lat, lng]);
}
//getMeteo();

// async function flights() {
//   
// flights();

async function pollen(lati, longi) {
  console.log("hi")
  url = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lati}&lng=${longi}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key":
        "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  let risk = await data.data[0].Risk;
  console.log(data)
  const { lat, lng } = data;
  
 
  new marker.setLatLng([lat, lng]);
}


//getTime
function renderTime() {
  //Date
  var myDate = new Date();
  var year = myDate.getYear();
  if (year < 1000) {
    year += 1900;
  }
  var day = myDate.getDay();
  var month = myDate.getMonth();
  var daym = myDate.getDate();
  var dayarray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var montharray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //Date

  //Time
  var currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();
  if (h == 24) {
    h = 0;
  } else if (h > 12) {
    h = h - 0;
  }

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  if (s < 10) {
    s = "0" + s;
  }

  var myClock = document.getElementById("clock");
  myClock.textContent = " " +
    dayarray[day] +
    " " +
    daym +
    " " +
    montharray[month] +
    " " +
    year +
    " | " +
    h +
    ":" +
    m +
    ":" +
    s;
  myClock.innerText =
    "" +
    dayarray[day] +
    " " +
    daym +
    " " +
    montharray[month] +
    " " +
    year +
    " | " +
    h +
    ":" +
    m +
    ":" +
    s;

  setTimeout("renderTime()", 1000);
}
renderTime();

