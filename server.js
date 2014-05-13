

/* imports */

var http = require('http');
var mongoose = require('mongoose');
var router = require('./router');
var models = require('./models');
var urlObject = require("url");
var port = process.env.PORT || 8000;
var db;

//var group = new models.Group({})
//group.save(function(err, group)
//{
    
//});

/* server code */
function startServer(route) {
    
    function onRequest(request, response) {
        var pathname = urlObject.parse(request.url).pathname;
        route(pathname);        
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World, this is my first node JS application\n");
        response.write("Request for path "+ pathname);
        response.write("DB connection successful\n");
        response.end();

    }
    function mongooseDone(err)
    {
        http.createServer(onRequest).listen(port);        
    }
    mongoose_init(mongooseDone);
}

mongoose_init = function(callback){

    mongoose.connect('mongodb://aravindan:niji@ds043329.mongolab.com:43329/nijidb');

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        // yay!
        console.log("...............Connected to db.................");
        var query = { groupName: 'Dummy Group' };
        models.Group.findOneAndUpdate(group, {groupName: 'Dummy Group', members : null},{upsert: true,"new": true },function(err, group)
        {
              console.log("...............created a dummy group in DB.................");  
        });
        callback(null);
    });

}

getGroupList = function()
{

}

getChatHistory = function()
{
    
}


//exports.start = startServer;

startServer(router.route)
