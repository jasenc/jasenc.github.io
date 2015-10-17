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
    "mobile": "971.285.4602",
    "email": "jasen.c@icloud.com",
    "github": "jasenc",
    "githubLink": "https://github.com/jasenc",
    "linkedIn": "jasenc",
    "linkedInLink": "https://www.linkedin.com/in/jasenc",
    "blog": "blog.jasencarroll.com",
    "blogLink": "http://blog.jasencarroll.com/",
    "location": "Portland, OR"
  },
  /*jshint multistr: true */
  "welcomeMessage": "I'm a self motivated learner. I have three years of \
                    professional experience in the industries of FDA compliance, \
                    but what that means is I am a great technical writer, an \
                    efficient problem solver, and can effectively implement more\
                    robust and standalone systems to drive efficiency and \
                    accuracy for your company. I've also had the benefit of \
                    learning professional communication by working cross-functionally\
                    throughout a global enterprise. I look forward to the \
                    oppurtunity of working amongst your teams, perhaps even \
                    directly with your clients, while I enhance my technical\
                    skillsets and return to a life in technology.",
  "resumeFile": "https://dl.dropboxusercontent.com/u/13604802/Jasen_Carroll_Resume.pdf?dl=1",
  // Skills is a nested array.
  "skills": ["Python", "Flask", "Ruby", "Ruby on Rails", "SQL", "PostgreSQL", "Git", "Linux", "Vagrant", "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "C++"],
  "pic": "images/pic.jpg",
  "display": function() {
    /*
      From inner most parenthesis out:
      - replace the '%data%' in HTMLresume (found in helper.js) with the data
      stored in bio.resumeFile.
      - prepend HTMLresume to the div with id=header.

      Repeat process for each item in bio object.

      Note: prepend HTMLcontactStart first as last displayed item is prepended
      first, this prevents items being appended to the following ul with
      id="topContacts".
    */
    $("#header").prepend(HTMLcontactStart);
    $("#header").prepend(HTMLresume.replace("%data%", bio.resumeFile));
    $("#header").prepend(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    $("#header").prepend(HTMLbioPic.replace("%data%", bio.pic));
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

    // At contact information start appending data.
    $("#topContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    // Email uses global replace to simultaneously replace href and
    // display content.
    $("#topContacts").append(HTMLemail.replace(/%data%/g, bio.contacts.email));
    $("#footerContacts").append(HTMLemail.replace(/%data%/g, bio.contacts.email));
    // Github and LinkedIn have two different entries to be replaced.
    var formatGitHub = HTMLgitHub.replace("%data%", bio.contacts.github);
    var formatGitHubLink = formatGitHub.replace("#", bio.contacts.githubLink);
    $("#topContacts").append(formatGitHubLink);
    $("#footerContacts").append(formatGitHubLink);

    var formatLinkedIn = HTMLlinkedIn.replace("%data%", bio.contacts.linkedIn);
    var formatLinkedInLink = formatLinkedIn.replace("#", bio.contacts.linkedInLink);
    $("#topContacts").append(formatLinkedInLink);
    $("#footerContacts").append(formatLinkedInLink);

    var formatBlog = HTMLblog.replace("%data%", bio.contacts.blog);
    var formatBlogLink = formatBlog.replace("#", bio.contacts.blogLink);
    $("#topContacts").append(formatBlogLink);
    $("#footerContacts").append(formatBlogLink);

    $("#topContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    $("#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));

    // If there are items in the bio.skills array,
    if (bio.skills.length > 0) {
      // append the div for HTMLskillsStart.
      $("#header").append(HTMLskillsStart);
      // Then for each item in bio.skills,
      for (var skill in bio.skills) {
        // append that skill to the div with id=skills using replace process.
        $("#skills").append(HTMLskills.replace("%data%", bio.skills[skill]));
      }
    }
  }
};

var education = {
  // Schools is a nested array which takes each school as an object.
  "schools": [
    {
      "name": "Drexel University",
      "location": "Philadelphia, PA",
      "degree": "B.S.",
      "majors": ["Mechanical Engineering"],
      "dates": "June, 2012",
      "link": "http://drexel.edu/"
    },
    {
      "name": "East Stroudsburg University",
      "location": "East Stroudsburg, PA",
      "degree": "Transfer",
      "majors": ["Physics"],
      "dates": "May, 2009",
      "link": "http://www.esu.edu/"
    }
  ],
  "onlineCourses": [
    {
      "title": "Full Stack Nanodegree",
      "school": "Udacity",
      "dates": "September, 2015",
      "link": "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004"
    }
  ],
  "display": function(){

    // For each entry in the array of schools of the education object.
    for (var school in education.schools) {
      // Append a new div to contain that school information.
      $("#education").append(HTMLschoolStart);
      // Replace the name in HTMLschoolName with the actual name, save it as formatName.
      var formatName = HTMLschoolName.replace("%data%", education.schools[school].name);
      // Replace the href in formatName with the actual link, save it as formatNameLink.
      var formatNameLink = formatName.replace("#", education.schools[school].link);
      // Add the information for the degree type.
      var formatDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
      // Finally concat these all together.
      var formatNameLinkDegree = formatNameLink.concat(formatDegree);
      // Append formatNameLink to a div with the class="education-entry"
      $(".education-entry:last").append(formatNameLinkDegree);
      // Append the following information with an inline replace.
      $(".education-entry:last").append(HTMLschoolDates.replace("%data%", education.schools[school].dates));
      $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", education.schools[school].location));
      $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", education.schools[school].majors));
    }

    // Repeat process for online classes
    $("#education").append(HTMLonlineClasses);
    for (var course in education.onlineCourses) {
      $("#education").append(HTMLschoolStart);
      var formatTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
      var formatTitleLink = formatTitle.replace("#", education.onlineCourses[course].link);
      var formatSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
      var formatTitleLinkSchool = formatTitleLink.concat(formatSchool);
      $(".education-entry:last").append(formatTitleLinkSchool);
      $(".education-entry:last").append(HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates));
    }
  }
};

var work = {
  // Jobs is a nested array which takes each job as an object.
  "jobs": [
    {
      "employer": "Udacity",
      "title": "Forum Mentor",
      "location": "Remote",
      "dates": "September 2015 - Present",
      "descriptions": [
        "Monitor Udacity's Full Stack student forums.",
        "Provide guidance to students in order to resolve issues or better understand topics."
      ],
      "link": "https://www.udacity.com/"
    },
    {
      "employer": "Acumed Inc (consulting through Lab Support)",
      "title": "CAPA Consultant",
      "location": "Hillsboro, OR",
      "dates": "Feb 2015 - Jul 2015",
      "descriptions": [
        "Performed internal audit of supplier validation documentation and eliminated the need for over 80% of documentation.",
        "Contacted suppliers for missing validation documentation to drive CAPA to towards closure."
      ],
      "link": "http://www.acumed.net/"
    },
    {
      "employer": "Johnson & Johnson",
      "title": "Pilot Plant Lead",
      "location": "Los Angeles, CA",
      "dates": "Jan 2014 - Nov 2014",
      "descriptions": [
        "Lead four direct reports and all daily activities for a small scale R&D manufacturing plant.",
        "Created sustainable temporary solution to eliminate costly overhead, annual savings of $15,000.",
        "Expanded Pilot Plant capacity by 60% by creating more robust systems and organization."
      ],
      "link": "http://www.jnj.com/"
    },
    {
      "employer": "Johnson & Johnson (consulting through Aerotek)",
      "title": "Validation Engineer",
      "location": "Los Angeles, CA",
      "dates": "Sep 2012 - Dec 2013",
      "descriptions": [
        "Monitored and evaluated manufacturing processes for improvements of efficiency in both time and labor.",
        "Authored 65% of Process Validation Protocols & Annual Validation Reports while on team of five."
      ],
      "link": "http://www.jnj.com/"
    }
  ],
  "display": function(){
    // For each item in jobs,
    for (var job in work.jobs) {

      // append a new HTMLworkStart element to the div with id=workExperience.
      $("#workExperience").append(HTMLworkStart);

      // Replace '%data%' content with work JSON content.
      var formatEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
      var formatEmployerLink = formatEmployer.replace("#", work.jobs[job].link);
      var formatTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
      var formatDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
      var formatLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);

      // Concat these two strings as they are displayed on the same line.
      var formatEmployerLinkTitle = formatEmployerLink.concat(formatTitle);

      // Append job information to the DOM.
      $(".work-entry:last").append(formatEmployerLinkTitle);
      $(".work-entry:last").append(formatDates);
      $(".work-entry:last").append(formatLocation);
      $(".work-entry:last").append(HTMLprojectDescriptionStart);

      for (var description in work.jobs[job].descriptions) {
        var formatDescription = HTMLworkDescription.replace("%data%", work.jobs[job].descriptions[description]);
        $(".descriptions:last").append(formatDescription);
      }
    }
  }
};

var projects = {
  // Projects is a nested array which takes each job as an object.
  "projects": [
    {
      "title": "Catalog App",
      "dates": "August 2015",
      "descriptions": [
        "Dynamically generated Python Flask application providing JSON and pretty print XML endpoints.",
        "Authenticated users, with Google OAuth2, have full CRUD functionality utilizing ORM with SQLAlchemy."
      ],
      "link": "https://fathomless-cove-4387.herokuapp.com/",
      "github": "https://github.com/jasenc/catalog"
    },
    {
      "title": "Movie Trailers",
      "dates": "July 2015",
      "descriptions": [
        "Single-page dynamically generated site using Python, styled with Bootstrap, and hosted on GitHub pages.",
        "Movie information is stored using classes using inheritance."
      ],
      "link": "https://jasenc.github.io/movie_trailers",
      "github": "https://github.com/jasenc/movie_trailers"
    },
    {
      "title": "Val Teams",
      "dates": "July 2015",
      "descriptions": [
        "Software as A Service website generated using Ruby on Rails, hosted on Heroku with a PostgreSQL database.",
        "Uses Stripe integration to collect payment information for premium subscription and SendGrid for email support."
      ],
      "link": "https://shielded-everglades-6566.herokuapp.com/",
      "github": "https://github.com/jasenc/my_saas"
    }
  ],
  // Display is a function that is saved inside of the projects object.
  "display": function(){
    // For each project in the array projects of the object projects.
    for (var project in projects.projects) {
      // Append a new div.
      $("#projects").append(HTMLprojectStart);
      // Replace '%data%' content with work JSON content.
      var formatTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
      var formatTitleLink = formatTitle.replace("#", projects.projects[project].link);
      var formatDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
      var formatGitHub = HTMLprojectGitHub.replace("#", projects.projects[project].github);

      // Append job information to the DOM.
      $(".project-entry:last").append(formatTitleLink);
      $(".project-entry:last").append(formatDates);
      $(".project-entry:last").append(HTMLprojectDescriptionStart);
      for (var description in projects.projects[project].descriptions) {
        var formatDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].descriptions[description]);
        $(".descriptions:last").append(formatDescription);
      }
      $(".project-entry:last").append(formatGitHub);
    }
  }
};

bio.display();
projects.display();
work.display();
education.display();
$("#mapDiv").append(googleMap);
