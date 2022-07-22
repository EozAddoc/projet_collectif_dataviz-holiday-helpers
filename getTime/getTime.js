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

  var myClock = document.getElementById("clockDisplay");
  myClock.textContent =
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
