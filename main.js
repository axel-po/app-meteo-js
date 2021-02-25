/* App meteo */
const keyAPI = "9f4747a54773dc6dc634920901512b1c";
const currentDay = document.querySelector(".current-day");
const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const descriptionWeather = document.querySelector(".weather-description");
const temp = document.querySelector(".temp");
const localisation = document.querySelector(".localisation");

/* Date */
const date = new Date();
let indexOfDay = date.getDay();

currentDay.innerText = daysOfWeek[indexOfDay - 1];

let resultsAPI;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      //callAPI(long, lat);
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

      resultsAPI.current.weather[0].description;
      temp.innerText = `${Math.trunc(resultsAPI.current.temp)}°C`;
      localisation.innerHTML = `<img src="img/loc.svg" alt="logo localisation" />${resultsAPI.timezone}, FR`;
    });
};
