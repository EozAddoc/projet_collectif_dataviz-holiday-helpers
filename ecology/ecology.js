function air() {
    fetch("https://api.ambeedata.com/latest/by-lat-lng?lat=12&lng=77", {
      method: "GET",
      headers: {
        "x-api-key":
          "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.stations[0].lat);
        console.log(data.stations[0].lng);
        console.log(data.stations[0].AQI);
        console.log(data.stations[0].aqiInfo.category);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //air();
  function water() {
    fetch("https://hubeau.eaufrance.fr/api/v1/temperature/api-docs").then((res) =>
      console.log(res.json())
    );
  }
  
  function getMeteo() {
    fetch("https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77", {
      method: "GET",
      headers: {
        "x-api-key":
          "733803cf88f90a7486548ce9580f0cf1b52ae6e8746624ca4a795e3f2754c421",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        //console.log(response.json());
        return response.json();
      })
      .then((data) => {
        console.log(data.data.lat);
        console.log(data.data.lng);
        console.log(data.data.temperature);
      })
  
      .catch((err) => {
        console.error(err);
      });
  }
  //getMeteo();
  function getGhg() {
    fetch(
      "https://api.ambeedata.com/latest/by-lat-lng?lat=12.9889055&lng=77.574044",
      {
        method: "GET",
        headers: {
          "x-api-key":
            "733803cf88f90a7486548ce9580f0cf1b52ae6e8746624ca4a795e3f2754c421",
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
  
      .catch((err) => {
        console.error(err);
      });
  }
  //getGhg();
  function fire() {
    fetch("https://api.ambeedata.com/latest/fire?lat=12.9889055&lng=77.574044", {
      method: "GET",
      headers: {
        "x-api-key":
          "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  function pollen() {
    fetch(
      "https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12.9889055&lng=77.574044",
      {
        method: "GET",
        headers: {
          "x-api-key":
            "0b6971e42ac3de1fc7283214f67e40a0638921c67ffee69fd130f4bd301f6e24",
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => {
        console.error(err);
      });
  }
  