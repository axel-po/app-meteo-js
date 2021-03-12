/* App meteo */
const keyAPI = "9f4747a54773dc6dc634920901512b1c";
const imgMeteo = document.querySelector(".img-meteo");
const gradiant = document.querySelector(".gradiant");
const currentDay = document.querySelector(".current-day");
currentDay.innerText = current_Day;
const currentDateDOM = document.querySelector(".current-date");
const descriptionWeather = document.querySelector(".weather-description");
const temp = document.querySelector(".temp");
const localisation = document.querySelector(".localisation");

const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const iconsWeather = document.querySelectorAll(".fas");
const previsionDay = document.querySelectorAll(".prevision-day");
const previsionTemp = document.querySelectorAll(".temp-prevision");
const loader = document.querySelector(".lds-dual-ring");

let resultsAPI;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      callAPI(long, lat);
    },
    () => {
      alert(
        `Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !`
      );
    }
  );
}

callAPI = (long, lat) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      resultsAPI = data;

      temp.innerText = `${Math.trunc(resultsAPI.current.temp)}°C`;
      localisation.innerHTML = `<img src="img/loc.svg" alt="logo localisation" />${resultsAPI.timezone}, FR`;
      descriptionWeather.innerText = resultsAPI.current.weather[0].description;
      descriptionWeather.innerText =
        descriptionWeather.innerText.charAt(0).toLocaleUpperCase() +
        descriptionWeather.innerText.slice(1);
      humidity.innerText = `${resultsAPI.current.humidity} %`;
      windSpeed.innerText = `${Math.trunc(resultsAPI.current.wind_speed)} km/h`;

      /* Temp previsions */
      for (let n = 0; n < previsionTemp.length; n++) {
        previsionTemp[0].innerText = `${Math.trunc(resultsAPI.current.temp)}°C`;
        previsionTemp[n].innerText = `${Math.trunc(
          resultsAPI.daily[n].temp.day
        )}°C`;
      }

      /* Image background weather */
      switch (resultsAPI.current.weather[0].main) {
        case "Clouds":
          imgMeteo.src = "/img/cloud.jpg";
          gradiant.style.background =
            "linear-gradient(90deg, rgba(218,217,232,1) 0%, rgba(49,49,56,1) 64%, rgba(25,25,41,1) 94%)";
          iconsWeather[0].classList.replace("fa-sun", "fa-cloud");
          break;
        case "Clear":
          imgMeteo.src = "/img/sun.jpg";
          gradiant.style.background =
            "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)";
          iconsWeather[0].classList.replace("fa-cloud", "fa-sun");
          break;
      }

      /* Weather icons prevesions */
      for (let k = 1; k < iconsWeather.length; k++) {
        switch (resultsAPI.daily[k].weather[0].main) {
          case "Clear":
            iconsWeather[k].classList.replace("fa-cloud", "fa-sun");
            break;
          case "Cloud":
            iconsWeather[k].classList.replace("fa-sun", "fa-cloud");
            break;
          case "Rain":
            iconsWeather[k].classList.replace(
              "fa-cloud",
              "fa-cloud-showers-heavy"
            );
            break;
        }
      }
    });

  setInterval(() => {
    loader.classList.add("end-load");
    loader.style.zIndex = "-9999";
  }, 1000);
};

/* Days previsions */
for (i = 0; i < previsionDay.length; i++) {
  previsionDay[i].innerText = arraySorted[i].slice(0, 3);
}

/* Print date days/month/year */
const fullDate = new Date();
let option2 = { day: "numeric", month: "long", year: "numeric" };
let full_Date = fullDate.toLocaleDateString("fr-FR", option2).split(" ");

//see you later
currentDateDOM.innerText = full_Date.join(" ");
