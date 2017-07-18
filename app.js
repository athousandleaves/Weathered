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