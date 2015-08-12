/*
  Jasen Carroll
  August 10th, 2015

  resumeBuilder.js is used to save all of the data necessary to display a
  dynamically generated resume website.

  Storing information for bio, education, work, and projects as JSONs allow
  for easy future editing/updating.
*/

var bio = {
  "name": "Jasen Carroll",
  "role": "Web Developer",
  // Contacts is a nested object.
  "contacts": {
    "mobile": "484.318.9403",
    "email": "jasen.c8@gmail.com",
    "github": "https://github.com/jasenc",
    "location": "Portland, OR"
  },
  "welcomeMessage": "Hello, welcome to my online resume.",
  // Skills is a nested array.
  "skills": ["HTML", "CSS", "JavaScript", "Python", "SQL", "MySQL", "PostgreSQL"],
  "biopic": "../images/linkedIn.jpg",
  "display": function() {
    /*
      From inner most parenthesis out:
      - replace the '%data%' in HTMLheaderRole (found in helper.js) with the data
      stored in bio.role.
      - prepend HTMLheaderRole to the div with id=header.

      Note: prepend is used to ensure content is added prior to ul for skills.
    */
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));

    // Process is repeated for HTMLheaderName, prepended second to ensure it is
    // displayed first on the website.
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

    // If there are items in the bio.skills array,
    if (bio.skills.length > 0) {
      // append the div for HTMLskillsStart.
      $("#header").append(HTMLskillsStart);
      // Then for each item in bio.skills,
      for (skill in bio.skills) {
        // append that skill to the div with id=skills using replace process.
        $("#skills").append(HTMLskills.replace("%data%", bio.skills[skill]));
      }
    }
  }
}

var education = {
  // Schools is a nested array which takes each school as an object.
  "schools": [
    {
      "name": "Drexel University",
      "location": "Philadelphia, PA",
      "degree": "B.S.",
      "majors": ["Mechanical Engineering"],
      "dates": 2012,
      "url": "http://drexel.edu/"
    },
    {
      "name": "East Stroudsburg University",
      "location": "East Stroudsburg, PA",
      "degree": "Transfer",
      "majors": ["Physics"],
      "dates": 2009,
      "url": "http://www.esu.edu/"
    }
  ],
  "onlineCourses": [
    {
      "title": "Full Stack Nanodegree",
      "school": "Udacity",
      "date": 2015,
      "url": "https://www.udacity.com/"
    }
  ]
}

var work = {
  // Jobs is a nested array which takes each job as an object.
  "jobs": [
    {
      "employer": "Acumed Inc (consulting through Lab Support)",
      "title": "CAPA Consultant",
      "location": "Portland, OR",
      "dates": "Feb 2015 - Jul 2015",
      "description": "Drive CAPA to closure by auditing validation documentation, contacting suppliers, authoring internal memos."
    },
    {
      "employer": "Johnson & Johnson",
      "title": "Pilot Plant Lead",
      "location": "Los Angeles, CA",
      "dates": "Jan 2014 - Nov 2014",
      "description": "Lead personnel and activities of R&D pilot plant for consumer products - shampoo, conditioner, lotion, sunscreen, face & body wash."
    },
    {
      "employer": "Johnson & Johnson (consulting through Aerotek)",
      "title": "Validation Engineer",
      "location": "Los Angeles, CA",
      "dates": "Sep 2012 - Dec 2013",
      "description": "Assist in remediation CAPA by authoring best-in-class documentation and supporting batching activities"
    }
  ],
  "display": function(){
    // For each item in jobs,
    for (job in work.jobs) {

      // append a new HTMLworkStart element to the div with id=workExperience.
      $("#workExperience").append(HTMLworkStart);

      // Replace '%data%' content with work JSON content.
      var formatEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
      var formatTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
      var formatDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
      var formatLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
      var formatDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

      // Concat these two strings as they are displayed on the same line.
      var formatEmployerTitle = formatEmployer.concat(formatTitle)

      // Append job information to the DOM.
      $(".work-entry:last").append(formatEmployerTitle);
      $(".work-entry:last").append(formatDates);
      $(".work-entry:last").append(formatLocation);
      $(".work-entry:last").append(formatDescription);
    }
  }
}

var projects = {
  // Projects is a nested array which takes each job as an object.
  "projects": [
    {
      "title": "Movie Trailers",
      "dates": "July 2015",
      "description": "Using Python and server-side code this application dynamically generates a web page to display favorite movies.",
      "link": "https://jasenc.github.io/movie_trailers"
    },
    {
      "title": "Tournament Results",
      "dates": "July 2015",
      "description": "A program to capture relevant functions needed to properly execute a Swiss Pairings style tournament, with a PostgreSQL database.",
      "link": "https://github.com/jasenc/tournament_results"
    }
  ],
  // Display is a function that is saved inside of the projects object.
  "display": function(){
    // For each project in the array projects of the object projects.
    for (project in projects.projects) {
      // Append a new div.
      $("#projects").append(HTMLprojectStart);
      // Replace '%data%' content with work JSON content.
      var formatTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
      var formatTitleLink = formatTitle.replace("#", projects.projects[project].link)
      var formatDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
      var formatDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);

      // Append job information to the DOM.
      $(".project-entry:last").append(formatTitleLink);
      $(".project-entry:last").append(formatDates);
      $(".project-entry:last").append(formatDescription);
    }
  }
}


bio.display();
work.display();

function locationizer(workObj) {
  locations = [];
  for (var job in workObj.jobs) {
    var newLocation = workObj.jobs[job].location;
    locations.push(newLocation);
  }
  return locations;
}

projects.display();

$("#mapDiv").append(googleMap);
