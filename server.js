

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
startServer = function(route){
    console.log(".....Inside Start Server........");
   onRequest = function(request, response) {
        var reqMethod = request.method;
        var urlComp = urlObject.parse(request.url,true);
        var pathname = urlComp.pathname;
        var query = urlComp.query;
        console.log("******Request method : "+reqMethod);
        if(reqMethod == "GET"){
            console.log(".....Inside get Request........");
            route(pathname);        
            console.log("Request for " + pathname + " received.");
            if(pathname == "/")
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("Hello World, this is my first node JS application\n");
                response.write("Request for path "+ pathname);
                response.write("\nDB connection successful\n");
                response.end();
            }
            if(pathname == "/groupList"){

            models.Group.find('groupName', function (err, groups){
                    if (err){ throw err; } 
                     console.log("**Printing grouplist**\n "+groups);
                
                    //process json properly - left out

                    var result = [];
                    for (var i = 0;i<groups.length;i++){
                       // result.push({"groupName": groups[i].groupName});
                       console.log("json : "+ groups[i].toJSON());
                         result.push(groups[i].toJSON());
                    }   
                    console.log("------------Result   "+result);
        
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.write(JSON.stringify(result));
                    response.end();

                });                    
            }

            if(pathname == "/chatHistory"){
                console.log("Query param : "+ query.group + " received.");

                if(query.group != undefined && query.group !=null && query.group != "all")
                {
                        var queryGroupName = query.group;
                        console.log("Group name received : "+ queryGroupName);
                         models.Chat.find({"groupName": queryGroupName}, function (err, chats){
                            
                            if (err){ throw err; } 
                            console.log("**Printing grouplist**\n "+chats); 
                            
                            var history = [];
                            for (var i = 0;i<chats.length;i++){
                               // result.push({"groupName": groups[i].groupName});
                               console.log("json : "+ chats[i].toJSON());
                                 history.push(chats[i].toJSON());
                            }   
                            console.log("------------Chats History   "+JSON.stringify(history));
                
                            response.writeHead(200, {"Content-Type": "application/json"});
                            response.write(JSON.stringify(history));
                            response.end();


                         });
                }
                else if(query.group != undefined && query.group !=null && query.group == "all")
                {
                     models.Chat.find('groupName', function (err, chats){
                        if (err){ throw err; } 
                         console.log("**Printing grouplist**\n "+chats);
                    
                        //process json properly - left out

                        var history = [];
                        for (var i = 0;i<chats.length;i++){
                           // result.push({"groupName": groups[i].groupName});
                           console.log("json : "+ chats[i].toJSON());
                             history.push(chats[i].toJSON());
                        }   
                        console.log("------------Chats History   "+history);
            
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write(JSON.stringify(history));
                        response.end();

                    });
                }     
            }
        }//get
        else if (reqMethod == "POST"){

           if(pathname == "/")
            {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("Hello World, this is my first node JS application\n");
                response.write("Request for path "+ pathname);
                response.write("\nDB connection successful\n");
                response.end();
            }
            if(pathname == "/chatHistory")
            {
                console.log("Command received : "+ query.cmd + " received.");
                var command = query.cmd;
                if(command == "addMsg")
                {
                    var toGroup = query.group;
                    var byUser = query.user;
                    var time = query.timestamp;
                    var msg = query.msg;
                    var msgorder = query.order;

                    models.Chat.insert({groupName: toGroup, userName: byUser, message : msg, timestamp : time, order : msgorder},{upsert: true,"new": true }, function (err, chats){
                        if (err){ throw err; } 
                        
                        console.log("......Chats "+chats);
                    });
                }
            }
        }
   
    }//onrequest

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
    //var query1 = { userName: 'Anon9' };
    
    //models.Chat.findOneAndUpdate(query1, {groupName: 'Dummy Group1',userName: "Anon1", message : "hello"},{upsert: true,"new": true },function(err, chat)
    //{
     //     console.log("...............created a dummy chat history in DB.................");  
    //});
    callback(null);

}


//exports.start = startServer;
console.log(".....Starting Server........");
startServer(router.route)
