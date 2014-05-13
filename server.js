

/* imports */

var http = require('http');
var mongoose = require('mongoose');
var router = require('./router');
var models = require('./models');
var urlObject = require("url");
var port = process.env.PORT || 8000;
var db;
var groupListJSON;
 var groupList;
//var group = new models.Group({})
//group.save(function(err, group)
//{
    
//});

/* server code */
startServer = function(route) {
    console.log(".....Inside Start Server........");
   onRequest = function(request, response) {
        console.log(".....Inside On Request........");
        var pathname = urlObject.parse(request.url).pathname;
        route(pathname);        
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "application/json"});
       // response.write("Hello World, this is my first node JS application\n");
       // response.write("Request for path "+ pathname);
       // response.write("\nDB connection successful\n");
       
        if(pathname == "/groupList"){

            groupList = models.Group.find('groupName', function (err, groups){
                if (err){ throw err; } 
                console.log(groups);
            });
        
            console.log("****************Printing grouplist**************\n "+groupList);
        
            response.write(groupList);
        }
        if(pathname == "/chatHistory") getChatHistory();

        response.end();

    }
    mongooseDone = function(err) {

        console.log(".....Inside Mongoose done, Starting server ........");
        http.createServer(onRequest).listen(port);        
    }
    mongoose_init(mongooseDone);

}

mongoose_init = function(callback){
console.log(".....Inside Mongo Init........");
    mongoose.connect('mongodb://aravindan:niji@ds043329.mongolab.com:43329/nijidb');

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
   
    console.log("...............Connected to db.................");
    var query = { groupName: 'Dummy Group2' };
    models.Group.findOneAndUpdate(query, {groupName: 'Dummy Group2'},{upsert: true,"new": true },function(err, group)
    {
          console.log("...............created a dummy group in DB.................");  
    });
    callback(null);

}

getGroupList = function(){

    console.log("......Inside get Group List......");
}

getChatHistory = function(){
    
}

//exports.start = startServer;
console.log(".....Starting Server........");
startServer(router.route)
