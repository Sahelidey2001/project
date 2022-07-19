// Background Change

const date = new Date();
const hours = date.getHours();
const morning = "url('/images/morning.webp')";
const afternoon = "url('/images/afternoon.webp')";
const night = "url('/images/night.webp')";
const gradient = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
const body = document.querySelector("body");
console.log(`${gradient},${morning}`);

function backgroundChange() {
  if (hours <= 11) {
    body.style.backgroundImage = `${gradient},${morning}`;
  } else if(hours <= 19) {
    body.style.backgroundImage = `${gradient},${afternoon}`;
  } else {
    body.style.backgroundImage = `${gradient},${night}`;
  }
}

backgroundChange();

// Temparature and wid button conversion

const windPortion = document.querySelectorAll(".wind-portion");
const tempPortion = document.querySelectorAll(".temp-portion");
const tempButton = document.getElementById("temp-button");
const windButton = document.getElementById("wind-button");

windButton.addEventListener("click", () => {
  tempButton.classList.replace("w-temp", "w-wind");
  windButton.classList.replace("w-wind", "w-temp");
  for (let i = 0; i < windPortion.length; i++) {
    windPortion[i].style.display = "block";
  }
  for (let i = 0; i < tempPortion.length; i++) {
    tempPortion[i].style.display = "none";
  }
});

tempButton.addEventListener("click", () => {
  windButton.classList.replace("w-temp", "w-wind");
  tempButton.classList.replace("w-wind", "w-temp");
  for (let i = 0; i < windPortion.length; i++) {
    windPortion[i].style.display = "none";
  }
  for (let i = 0; i < tempPortion.length; i++) {
    tempPortion[i].style.display = "block";
  }
});

// Search Temparature and wid button conversion

const s_windPortion = document.querySelectorAll(".s-wind-portion");
const s_tempPortion = document.querySelectorAll(".s-temp-portion");
const s_tempButton = document.getElementById("s-temp-button");
const s_windButton = document.getElementById("s-wind-button");

s_windButton.addEventListener("click", () => {
  s_tempButton.classList.replace("s-w-temp", "s-w-wind");
  s_windButton.classList.replace("s-w-wind", "s-w-temp");
  for (let i = 0; i < windPortion.length; i++) {
    s_windPortion[i].style.display = "block";
  }
  for (let i = 0; i < tempPortion.length; i++) {
    s_tempPortion[i].style.display = "none";
  }
});

s_tempButton.addEventListener("click", () => {
  s_windButton.classList.replace("s-w-temp", "s-w-wind");
  s_tempButton.classList.replace("s-w-wind", "s-w-temp");
  for (let i = 0; i < windPortion.length; i++) {
    s_windPortion[i].style.display = "none";
  }
  for (let i = 0; i < tempPortion.length; i++) {
    s_tempPortion[i].style.display = "block";
  }
});



