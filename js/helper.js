/*
Jasen Carroll
Aug 10th, 2015
*/


/*
HTML strings saved as JavaScript variables in order to dynamically generate
website content using JSONs found in resumeBuilder.js.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span>';

var HTMLcontactStart = '<h3 id="contact-h3">Contact:</h3>';
var HTMLmobile = '<li class="list-contact"><span class="orange-text">mobile</span><span">%data%</span></li>';
var HTMLemail = '<li class="list-contact"><span class="orange-text">email</span><a href="mailto:%data%" class="contact">%data%</a></li>';
var HTMLtwitter = '<li class="list-contact"><span class="orange-text">twitter</span><span">%data%</span></li>';
var HTMLgithub = '<li class="list-contact"><span class="orange-text">github</span><a href="#" target="_blank" class="contact">%data%</a></li>';
var HTMLblog = '<li class="list-contact"><span class="orange-text">blog</span><a href="#" target="_blank" class="contact">%data%</a></li>';
var HTMLlocation = '<li class="list-contact"><span class="orange-text">location</span><span>%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic"><hr/>';
var HTMLwelcomeMsg = '<p class="welcome-message">%data%</p>';
var HTMLresume = '<p class="welcome-message">Additionally a PDF version of my resume is available for download <a href="%data%" class="resume">here</a>.</p>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills"></ul>';
var HTMLskills = '<li class="skill"><span">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescriptionStart = '<ul class="descriptions"></ul>';
var HTMLworkDescription = '<li>%data%</li>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#" target="_blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescriptionStart = '<ul class="descriptions"></ul>';
var HTMLprojectDescription = '<li>%data%</li>';
var HTMLprojectGitHub = '<a href="#" target="_blank">GitHub</a>';

var HTMLschoolStart = '<div class="education-entry clear-fix"></div>';
var HTMLschoolName = '<a href="#" target="_blank">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';

var googleMap = '<div id="map"></div>';

// initialize array to capture click locations.
clickLocations = [];

// Function to log click locations to the console and save them to clickLocations.
function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

// When the document is clicked, create an event handler named 'loc'
$(document).click(function(loc) {
  // Save the x-position of the click using loc.pageX
  var x = loc.pageX;
  // Save the y-position of the click using loc.pageY
  var y = loc.pageY;
  // Pass those values through logClicks to save to clickLocations and log to console.
  logClicks(x,y);
});



/*
Generate a custom Google Map for the website.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
InitializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // Add a pop-up with the location if a pin is clicked.
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});

function locationizer(workObj) {
  locations = [];
  for (var job in workObj.jobs) {
    var newLocation = workObj.jobs[job].location;
    locations.push(newLocation);
  }
  return locations;
}
