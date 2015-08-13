# Resume

This is my resume website, it is dynamically generated using JavaScript, JSON data, and jQuery. The reason behind this approach was to allow easy editing both in the immediate future as I continue to add projects, and as a long term solution to continually add my experience to.

There are multiple files associated with this project as listed below:

* `resumeBuilder.js`: contains all JSON data as well as all necessary functions to display that data on index.html.
* `helper.js`: contains all content for dynamically generating HTML content, later invoked in resumeBuilder.js. This file also contains the necessary functions to log click events and interact with the Google Maps API.

Additionally `index.html` and `style.css` are included to display the web content and style it respectively. Finally, jQuery v2 is included and hosted locally to reduce the number of links needed.

## Authors

Jasen Carroll  
jasen.c8@gmail.com  
Aug 10th, 2015

## Known issues

* Mobile Safari improperly displays flex-item(s)
