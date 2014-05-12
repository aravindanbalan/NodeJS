/**
 * Created with IntelliJ IDEA.
 * User: Aravindan
 * Date: 5/9/14
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

/* imports */

var http = require('http');
var mongoose = require('mongoose');
var router = require('./router');
var urlObject = require("url");
var port = process.env.PORT || 8000;
var test = false;

/* server code */
function startServer(route) {
    function onRequest(request, response) {
        var pathname = urlObject.parse(request.url).pathname;
        route(pathname);
        if(test)
            response.write("DB connection successful\n");
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World, this is my first node JS application\n");
        response.write("Request for path "+ pathname);
        response.end();

    }

    http.createServer(onRequest).listen(port);
    console.log('Server running at http://127.0.0.1:1337/');
}

mongoose_init = function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://aravindan:niji@ds043329.mongolab.com:43329/nijidb');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        // yay!
        test = true;
    });


}

//exports.start = startServer;

startServer(router.route)