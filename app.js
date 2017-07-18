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

       // dynamically create display

        //get the icon

        var id = degrees.weather[0].id;

        if (id >= 200 && id <= 232) {
          weatherClass = "wi-storm-showers";
        } else if (id >= 300 && id <= 321) {
          weatherClass = "wi wi-sprinkle";
        } else if (id >= 500 && id <= 531) {
          weatherClass = "wi wi-rain";
        } else if (id >= 600 && id <= 622) {
          weatherClass = "wi wi-snow";
        } else if (id >= 701 && id <= 771) {
          weatherClass = "wi wi-dust";
        } else if (id == 781) {
          weatherClass = "wi wi-tornado";
        } else if (id == 800) {
          weatherClass = "wi wi-day-sunny";
        } else if (id >= 801 && id <= 804) {
          weatherClass = "wi wi-day-cloudy";
        } else if (id >=900 && id <= 906) {
          weatherClass = "wi wi-small-craft-advisory";
        }

        // icon display
        var iconDiv = document.createElement("div");
        body.appendChild(iconDiv);
        var weatherIcon = document.createElement("i");
        weatherIcon.className = weatherClass;
        weatherIcon.id = "weatherID";
        iconDiv.appendChild(weatherIcon);

        //fahrenheit display
        var fDiv = document.createElement("div");
        body.appendChild(fDiv);
        var fSection = document.createElement("h1");
        fDiv.appendChild(fSection);
        var F = document.createTextNode(`The temperature in ${location} is ${fahrenheit} degrees fahrenheit`);
        fSection.appendChild(F);

        //celsius display
        var cDiv = document.createElement("div");
        body.appendChild(cDiv);
        var cSection = document.createElement("h1");
        cSection.style.display = "none";
        cDiv.appendChild(cSection);
        var C = document.createTextNode(`The temperature in ${location} is ${celsius} degrees celsius`);
        cSection.appendChild(C);

        // toggle button to switch between fahrenheit and celsius
        var cButton = document.createElement("button");
        cButton.innerText = "Celsius";
        cButton.className = "button";
        body.appendChild(cButton);
        var fButton = document.createElement("button");
        fButton.className = "button";
        fButton.innerText = "Fahrenheit";
        fButton.style.display = "none";
        body.appendChild(fButton);
        
        // alternating listeners for temperature buttons
        cButton.addEventListener("click", function (){
          fSection.style.display = "none";
          cSection.style.display = "inherit";
          cButton.style.display = "none";
          fButton.style.display = "inherit";
        });
        fButton.addEventListener("click", function (){
              fSection.style.display = "inherit";
              cSection.style.display = "none";
              cButton.style.display = "inherit";
              fButton.style.display = "none";
            });

            // hide the loading icon
            body.removeChild(iDiv);
        }
    }, function(error){
        // Let user input a city to get API data
       
        //display form
        var body = document.querySelector(".focus");
        var formDiv = document.createElement("div");
        body.appendChild(formDiv);
        var form = document.createElement("form");
        formDiv.appendChild(form);
        var input = document.createElement("input");
        input.className = "input";
        input.placeholder = "Type city name here...";
        form.appendChild(input);

        //create buttons to be generated later
        var cButton = document.createElement("button");
        cButton.className = "button";
        var fButton = document.createElement("button");
        fButton.className = "button";

        //hide the loading icon
        body.removeChild(iDiv);

        input.addEventListener('keypress', function(e){
          if (e.which === 13) {
            e.preventDefault();
              var city = input.value;
                var xhr = new XMLHttpRequest();
                xhr.onload = pull;
                xhr.onerror = error;
                xhr.open('get', `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fcf9b7740425bcdc4fd4d0c171008a09`);
                xhr.send();

                function pull() {
                var parsed = JSON.parse(this.responseText);
                  display(parsed);
                }
                
                function error(err) {  
                  console.log('Error: ', err);  
                  }

                function display(degrees) {
                  var fahrenheit = Math.round(degrees.main.temp * 9/5 - 459.67);
                  var celsius = Math.round(degrees.main.temp - 273.15);
                  var location = degrees.name;

                // dynamically create display
                  
                  //get the icon
                  var id = degrees.weather[0].id;

                    if (id >= 200 && id <= 232) {
                      weatherClass = "wi wi-storm-showers";
                    } else if (id >= 300 && id <= 321) {
                      weatherClass = "wi wi-sprinkle";
                    } else if (id >= 500 && id <= 531) {
                      weatherClass = "wi wi-rain";
                    } else if (id >= 600 && id <= 622) {
                      weatherClass = "wi wi-snow";
                    } else if (id >= 701 && id <= 771) {
                      weatherClass = "wi wi-dust";
                    } else if (id == 781) {
                      weatherClass = "wi wi-tornado";
                    } else if (id == 800) {
                      weatherClass = "wi wi-day-sunny";
                    } else if (id >= 801 && id <= 804) {
                      weatherClass = "wi wi-day-cloudy";
                    } else if (id >=900 && id <= 906) {
                      weatherClass = "wi wi-small-craft-advisory";
                    }

                    // icon display
                    var iconDiv = document.createElement("div");
                    body.appendChild(iconDiv);
                    var weatherIcon = document.createElement("i");
                    weatherIcon.className = weatherClass;
                    weatherIcon.id = "weatherID";
                    iconDiv.appendChild(weatherIcon);

                    //fahrenheit display
                    var fDiv = document.createElement("div");
                    body.appendChild(fDiv);
                    var fSection = document.createElement("h1");
                    fDiv.appendChild(fSection);
                    var F = document.createTextNode(`The temperature in ${location} is ${fahrenheit} degrees fahrenheit`);
                    fSection.appendChild(F);

                    //celsius display
                    var cDiv = document.createElement("div");
                    body.appendChild(cDiv);
                    var cSection = document.createElement("h1");
                    cSection.style.display = "none";
                    cDiv.appendChild(cSection);
                    var C = document.createTextNode(`The temperature in ${location} is ${celsius} degrees celsius`);
                    cSection.appendChild(C);

                    // toggle button to switch between fahrenheit and celsius
                    cButton.innerText = "Celsius";
                    fButton.innerText = "Fahrenheit";
                    body.appendChild(cButton);
                    cButton.style.display = "inherit";
                    fButton.style.display = "hidden";

                    // celsius button
                    cButton.addEventListener("click", function (){
                    fSection.style.display = "none";
                    fButton.style.display = "none";
                    cSection.style.display = "inherit";
                    cButton.style.display = "none"; 
                    body.appendChild(fButton);
                    fButton.style.display = "inherit";
                    });

                    // fahrenheit button
                    fButton.addEventListener("click", function (){
                    fSection.style.display = "inherit";
                    cSection.style.display = "none";
                    cButton.style.display = "inherit";
                    fButton.style.display = "none";
                    });