/**
 * Created with IntelliJ IDEA.
 * User: Aravindan
 * Date: 5/9/14
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

/* imports */

var http = require('http');
var router = require('./router');
var urlObject = require("url");
var port = process.env.PORT || 8000;

/* server code */
function startServer(route) {
    function onRequest(request, response) {
        var pathname = urlObject.parse(request.url).pathname;
        route(pathname);
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World, this is my first node JS application");
        response.end();

    }

    http.createServer(onRequest).listen(port);
    console.log('Server running at http://127.0.0.1:1337/');
}

//exports.start = startServer;

startServer(router.route)