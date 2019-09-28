
const selection = [
  {food: "Burger", icon: "https://img.icons8.com/plasticine/160/000000/hamburger.png", output: "You should grab yourself a burger!"},
  {food: "Chicken", icon: "https://img.icons8.com/plasticine/160/000000/fried-chicken.png", output: "Treat yourself to some fried chicken"},
  {food: "Mexican", icon: "https://img.icons8.com/plasticine/160/000000/taco.png", output: "Today calls for some tacos don't you think? Get some Mexican!"},
  {food: "Pizza", icon: "https://img.icons8.com/doodle/160/000000/pizza.png", output: "You just got the answer you wanted. Get a pizza!"},
  {food: "Ramen", icon: "https://img.icons8.com/officel/160/000000/noodles.png", output: "Street food style ramen, nothing better!"},
  {food: "Indian", icon: "https://img.icons8.com/cotton/160/000000/chili-pepper--v2.png", output: "Spicy, rich and flavourful. What's not to like about Indian?"}
];

const button =document.querySelector('.btn');
const icon = document.querySelector('.icon');
const output = document.querySelector('.output');
const heading = document.querySelector('.heading');


button.addEventListener('click',() => {  
  const randomNumb = Math.floor((Math.random() * 6));
  heading.innerHTML = `<h3> ${selection[randomNumb].food} </h3>`;
  icon.innerHTML = `<img src=${selection[randomNumb].icon} alt=${selection[randomNumb].food}></img>`;  
  output.innerHTML = `<p> ${selection[randomNumb].output} </p>`;

  document.querySelector('#pac-input').value = selection[randomNumb].food;

});


let map; 
function initMap() {
  map = new google.maps.Map(document.querySelector('#map-container'), {
    center: {lat: 52.551972, lng: -5.505043},
    zoom: 11
  });

  const input = document.querySelector('#pac-input');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });


  var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });






  function position(pos) {
    let location = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };
    map.setCenter(location);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position, error);
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};









// function getCurrentPosition() {

//   function error(err) {
//     console.warn(`Error using Geolocation.
//   Code: ${err.code}, Message: ${err.message}`)
//   }

//   function success(pos){
//     const latitude = pos.coords.latitude;
//     const longitude = pos.coords.longitude;
//     console.log(latitude)
//   }


//   if ("geolocation" in navigator) {
//     /* geolocation is available */
//     navigator.geolocation.getCurrentPosition(success, error);
//   } else {
//     /* geolocation IS NOT available */
//   }

// };

  // Initiate Map










    // return locationData

