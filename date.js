const daysOfWeek = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

/* Date */
const current_Date = new Date();
let option = { weekday: "long" }; //voir doc mdn
let current_Day = current_Date.toLocaleDateString("fr-FR", option);

//On prends la première lettre du mot et on la met en majuscule et on rajoute le reste du mot
current_Day = current_Day.charAt(0).toUpperCase() + current_Day.slice(1);

let arraySorted = daysOfWeek
  .slice(daysOfWeek.indexOf(current_Day))
  .concat(daysOfWeek.slice(0, daysOfWeek.indexOf(current_Day)));
