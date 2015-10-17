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
var HTMLgitHub = '<li class="list-contact"><span class="orange-text">github</span><a href="#" target="_blank" class="contact">%data%</a></li>';
var HTMLlinkedIn = '<li class="list-contact"><span class="orange-text">linkedin</span><a href="#" target="_blank" class="contact">%data%</a></li>';
var HTMLblog = '<li class="list-contact"><span class="orange-text">blog</span><a href="#" target="_blank" class="contact">%data%</a></li>';
var HTMLlocation = '<li class="list-contact"><span class="orange-text">location</span><span>%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic"><hr/>';
var HTMLwelcomeMsg = '<p class="welcome-message">%data%</p>';
var HTMLresume = '<p class="welcome-message">Additionally a PDF version of my resume is available for download <a href="%data%" class="resume">here</a>.</p>';

var HTMLskillsStart = '<h3 id="skills-h3">Technical Skills:</h3><ul id="skills"></ul>';
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
