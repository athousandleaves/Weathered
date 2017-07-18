 /* 
User stories:
1. I can see the weather in my current location.
2. I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
3. I can push a button to toggle between Fahrenheit and Celsius.
 */

var body = document.querySelector(".focus");

//loading icon
var iDiv = document.createElement("div");
iDiv.className = "i";
body.appendChild(iDiv);
var i = document.createElement("i");
i.className = "fa fa-refresh fa-spin fa-3x fa-fw";
i.id = "loader";
iDiv.appendChild(i);

window.addEventListener("load", function() {
  if ("geolocation" in navigator) {
    // get geolocation from DOM API
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      // API request
      var xhr = new XMLHttpRequest();
      xhr.onload = pull;
      xhr.onerror = error;
      xhr.open('get', `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=fcf9b7740425bcdc4fd4d0c171008a09`);
      xhr.send();

      function pull() {
      var parsed = JSON.parse(this.responseText);
        display(parsed);
      }
      
      function error(err) {  
        console.error('Error: ', err);  
        }

      function display(degrees) {
       var fahrenheit = Math.round(degrees.main.temp * 9/5 - 459.67);
       var celsius = Math.round(degrees.main.temp - 273.15);
       var location = degrees.name;