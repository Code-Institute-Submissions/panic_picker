//Selection Array
const selection = [
  { food: "Burger", search: "burger take-away", icon: "https://img.icons8.com/plasticine/160/000000/hamburger.png", output: "You should grab yourself a burger!" },
  { food: "Chicken", search: "fried chicken", icon: "https://img.icons8.com/plasticine/160/000000/fried-chicken.png", output: "Treat yourself to some fried chicken" },
  { food: "Mexican", search: "mexican restaurant", icon: "https://img.icons8.com/plasticine/160/000000/taco.png", output: "Today calls for tacos don't you think?" },
  { food: "Pizza", search: "pizza place", icon: "https://img.icons8.com/doodle/160/000000/pizza.png", output: "You just got the answer you wanted. Get a pizza!" },
  { food: "Ramen", search: "ramen restaurant", icon: "https://img.icons8.com/officel/160/000000/noodles.png", output: "Street food style ramen, nothing better!" },
  { food: "Indian", search: "indian restaurant", icon: "https://img.icons8.com/cotton/160/000000/chili-pepper--v2.png", output: "What's not to like about Indian?" }
];

// Select elements
const icon = document.querySelector('.icon');
const output = document.querySelector('.output');
const heading = document.querySelector('.heading');
const errorText = document.querySelector('.error-text');

// Request geolcation, set map center to location, handle geolocation errors
function position(pos) {
  let location = {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude
  };
  map.setCenter(location);
}

//Handle Errors
function error(err) {
  console.warn();
  errorText.innerHTML =
    `<p>Allow browser access to your location for full functionality </br> ERROR(${err.code}): ${err.message}</p>`;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position, error);
}

// Map initiation code supplied by Google.

let map;
function initMap() {

  // Map Init
  map = new google.maps.Map(document.querySelector('#map-container'), {
    center: { lat: 53.347365, lng: -6.259124 },
    zoom: 13
  });
  service = new google.maps.places.PlacesService(map);

  // Marker storage
  let markers = [];

  // Button
  const button = document.querySelector('.btn');
  function randomNumber() {
    return Math.floor((Math.random() * 6));
  }
  // Button Click Event
  button.onclick = () => {

    const numberforUse = randomNumber();
    // Define query for use in map search
    const searchQuery = { query: selection[numberforUse].search, radius: 2000, location: map.getCenter() };

    // Update HTML
    heading.innerHTML = `<h3> ${selection[numberforUse].food} </h3>`;
    icon.innerHTML = `<img src=${selection[numberforUse].icon} alt=${selection[numberforUse].food}></img>`;
    output.innerHTML = `<p> ${selection[numberforUse].output} </p>`;

    // Clear Markers
    markers.forEach(function (marker) {
      marker.setMap(null);
    });

    // Perform maps search (Google)
    service.textSearch(searchQuery, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) { createMarker(results[i]); }
        map.setCenter(results[0].geometry.location);
      }
    });
  };

  // Create InfoWindow (Google)
  var infowindow = new google.maps.InfoWindow({
    content: ''
  });

  // Create Markers (Google)
  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });
    markers.push(marker);
    marker.addListener('click', function () {
      infowindow.setContent(marker.title);
      infowindow.open(map, marker);
    });
  }

  markers.forEach(function (item) {
    item.addListener('click', function () {
      infowindow.open(map, marker);
    });
  });
}

//Init map on page load to prevent undecalred variable errors.
function ready() {
  if (document.readyState != 'loading') {
    initMap();
  } else {
    document.addEventListener('DOMContentLoaded', initMap());
  }
}
