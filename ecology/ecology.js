var banner = document.querySelector("banner");

//THe data
const airAPi = "https://api.ambeedata.com/latest/by-lat-lng?lat=12&lng=77";
const weatherAPi =
  "https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77";
const pollenApi =
  "https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12.9889055&lng=77.574044";

//Map stuff

// Map tile imagery

var map = L.map("map").setView([0, 0], 2);

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

//markers
const marker = L.marker([0, 0]).addTo(map);

L.Control.geocoder().addTo(map);

// Control 2: This add a scale to the map
L.control.scale().addTo(map);

//  // Control 3: This add a Search bar
var searchControl = new L.esri.Controls.Geosearch().addTo(map);

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
    popupAnchor: [-3, -76],
});
  L.marker([lat, lng],{icon: myIcon}).addTo(map);
}
//myPosition()

async function air() {
  const response = await fetch(airAPi, {
    method: "GET",
    headers: {
      "x-api-key":
        "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
      "Content-type": "application/json",
    },
  });
  var myIcon = L.icon({
    iconUrl: 'co2.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
  const data = await response.json();
  console.log(data);
  let aQI = await data.stations[0].aqiInfo.category;
  console.log(aQI);
  let coord = await data.stations[0];
  console.log(coord);
  const { lat, lng } = coord;
  var myIcon = L.icon({
    iconUrl: 'co2.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
  
  marker.setLatLng([lat, lng],{icon:myIcon});
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
  const { lat, lng } = data;
  var myIcon = L.icon({
    iconUrl: 'markers/hot.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
marker.setLatLng([lat, lng],{icon: myIcon});
}
//getMeteo();


async function fire() {
  const res = await fetch(
    "https://api.ambeedata.com/latest/fire?lat=12&lng=77",
    {
      method: "GET",
      headers: {
        "x-api-key":
          "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
        "Content-type": "application/json",
      },
    }
  );
  const data = await res.json();
  const { message } = data;

  console.log(data);
}
//fire()


// async function flights() {
//   
// flights();

async function pollen() {
  const res = await fetch(pollenApi, {
    method: "GET",
    headers: {
      "x-api-key":
        "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data)
  const { lat, lng } = data;
  let risk = await data.data[0].Risk;
  var myIcon = L.icon({
    iconUrl: 'markers/pollen.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});
marker.setLatLng([lat, lng],{icon: myIcon});
}
//pollen()

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
