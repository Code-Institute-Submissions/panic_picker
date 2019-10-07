
const selection = [
  {food: "Burger", search: "burger take-away", icon: "https://img.icons8.com/plasticine/160/000000/hamburger.png", output: "You should grab yourself a burger!"},
  {food: "Chicken", search: "fried chicken", icon: "https://img.icons8.com/plasticine/160/000000/fried-chicken.png", output: "Treat yourself to some fried chicken"},
  {food: "Mexican", search: "mexican restaurant", icon: "https://img.icons8.com/plasticine/160/000000/taco.png", output: "Today calls for some tacos don't you think? Get some Mexican!"},
  {food: "Pizza", search: "pizza place", icon: "https://img.icons8.com/doodle/160/000000/pizza.png", output: "You just got the answer you wanted. Get a pizza!"},
  {food: "Ramen", search: "ramen restaurant", icon: "https://img.icons8.com/officel/160/000000/noodles.png", output: "Street food style ramen, nothing better!"},
  {food: "Indian", search: "indian restaurant", icon: "https://img.icons8.com/cotton/160/000000/chili-pepper--v2.png", output: "Spicy, rich and flavourful. What's not to like about Indian?"}
];


const icon = document.querySelector('.icon');
const output = document.querySelector('.output');
const heading = document.querySelector('.heading');
const input = document.querySelector('#pac-input');





let map; 
function initMap() {
  // Button
  const button =document.querySelector('.btn');

  // Map Init
  map = new google.maps.Map(document.querySelector('#map-container'), {
    center: {lat: 51.507338, lng: -0.127765},
    zoom: 13
  });
  service = new google.maps.places.PlacesService(map);

  let markers = [];  
  
  // Button Click Event
  button.onclick = () => {
    const numberforUse = Math.floor((Math.random() * 6));
    // Define query for use in map search
    const searchQuery = {query: selection[numberforUse].search, radius: 2000, location: map.getCenter()};
    
    // Update HTML
    heading.innerHTML = `<h3> ${selection[numberforUse].food} </h3>`;
    icon.innerHTML = `<img src=${selection[numberforUse].icon} alt=${selection[numberforUse].food}></img>`;  
    output.innerHTML = `<p> ${selection[numberforUse].output} </p>`;

    // Clear Markers
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

    // Perform maps search
    service.textSearch(searchQuery, function(results, status) 
    { if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) 
        {createMarker(results[i]);}
         map.setCenter(results[0].geometry.location);
        }
      });   
      }


      // Create InfoWindow
      var infowindow = new google.maps.InfoWindow({
        content: ''
      });

      // Create Markers
      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name,
        });
        markers.push(marker);
        marker.addListener('click', function() {
          infowindow.setContent(marker.title)
          infowindow.open(map, marker);
        });
      };



      markers.forEach(function(item){
        item.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
  };


// Request geolcation, set map center to location, handle geolocation errors
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
  };
