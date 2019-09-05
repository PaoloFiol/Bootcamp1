var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
    /*
      Your request handler should send listingData in the JSON format as a response if a GET request 
      is sent to the '/listings' path. Otherwise, it should send a 404 error. 
  ​
      HINT: Explore the request object and its properties 
      HINT: Explore the response object and its properties
      https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
      http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
      
      HINT: Explore how callback's work 
      http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
      
      HINT: Explore the list of MIME Types
      https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
     */

    // Grab Request Method from request object
    var requestMethod = request.method;

    // Parse the URL from the request object
    var parsedUrl = url.parse(request.url);

    // Responses only if the request method is 'GET'
    if (requestMethod === 'GET') {

        // Switch case for every url endpoint
        switch (parsedUrl.path) {
            // For '/listings' endpoint, use 'application/json' MIME Type
            // Write listingData as a JSON String to the response
            case '/listings':
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(listingData);
                response.end();
                break;
            // By default, return a 404 status code
            // And write a string signifying the page was not found to the response
            default:
                response.writeHead(404);
                response.write('Bad gateway error');
                response.end();
        }
    }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
    /*
      This callback function should save the data in the listingData variable, 
      then start the server. 
  ​
      HINT: Check out this resource on fs.readFile
      //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
  ​
      HINT: Read up on JSON parsing Node.js
     */

    // Check for errors
    // If error, display exception and end app
    if (err) throw err;

    // Save data in listingData variable
    listingData = data;

    // Creates and starts server
    server = http.createServer(requestHandler).listen(port);

    // (Optional) Log the current port which the server is listening on
    console.log('Listening on port ' + port);
});