document.querySelector("#final-submit").disabled = true;
document.querySelector("#final-submit").classList.add("disable")

// Tracking Geo-location and entering it on input field
document.querySelector("#getLocation").addEventListener("click" , () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector("#getLocation").disabled = true;
    document.querySelector("#getLocation").classList.add("disable");
    document.querySelector("#final-submit").disabled = false;
    document.querySelector("#final-submit").classList.remove("disable")
  } else {
    return "Geolocation is not supported by this browser.";
  }
});

function showPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
    document.querySelector("#latitude").value = lat;
    document.querySelector("#longitude").value = long;
}


// Background Change

const date = new Date();
const hours = date.getHours();
const morning = "url('/images/morning.webp')";
const afternoon = "url('/images/afternoon.webp')";
const night = "url('/images/night.webp')";
const gradient = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
const body = document.querySelector("body");
console.log(`${gradient},${morning}`);

if (hours <= 11) {
  body.style.backgroundImage = `${gradient},${morning}`;
} else if(hours <= 19) {
  body.style.backgroundImage = `${gradient},${afternoon}`;
} else {
  body.style.backgroundImage = `${gradient},${night}`;
}