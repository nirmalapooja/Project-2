// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
// var myMap = L.map("map", {
//     center: [37.7749, -122.4194],
//     zoom: 12
//   });
  
  // // Adding a tile layer (the background map image) to our map
  // // We use the addTo method to add objects to our map
  // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "mapbox.streets",
  //   accessToken: API_KEY
  // }).addTo(myMap);

  var url = "https://data.sfgov.org/resource/pyih-qa8i.geojson";


  d3.json(url, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  
    function createFeatures(restaurantData) {

      // Define a function we want to run once for each feature in the features array
      // Give each feature a popup describing the place and time of the earthquake
      function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.business_name +
          "</h3><hr><p>" + (feature.properties.risk_category) + "</p>");
      }
    
      // Create a GeoJSON layer containing the features array on the earthquakeData object
      // Run the onEachFeature function once for each piece of data in the array
      var restaurants = L.geoJSON(restaurantData, {
        onEachFeature: onEachFeature
      });
    
      // Sending our earthquakes layer to the createMap function
      createMap(restaurants);
    }
    
    function createMap(restaurants) {
    
      // Define streetmap and darkmap layers
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
      var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
      });
    
      // Define a baseMaps object to hold our base layers
      var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
      };
    
      // Create overlay object to hold our overlay layer
      var overlayMaps = {
        Restaurants:restaurants
      };
    
      // Create our map, giving it the streetmap and earthquakes layers to display on load
      var myMap = L.map("map", {
        center: [37.7749, -122.4194],
        zoom: 12,
        layers: [streetmap, restaurants]
      });


      // Create a layer control
      // Pass in our baseMaps and overlayMaps
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    }
    