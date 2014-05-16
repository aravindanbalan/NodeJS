
var mongoose = require('mongoose');

var groupsSchema = mongoose.Schema({

    groupName: String,
    members: [
    {
    	userName : String
   	}]

});

var userSchema = mongoose.Schema({
    
    userName : String, 
    groups: [
    {  
		 groupName: String
    }]
});

var chatHistorySchema = mongoose.Schema({

	userName : String,
    order : Integer,
    groupName: String,
	message : String,
	timestamp : String

});

var Group = mongoose.model('Group', groupsSchema);
var User = mongoose.model('User', userSchema);
var Chat = mongoose.model('Chat', chatHistorySchema);

exports.Group = Group;
exports.User = User;
exports.Chat = Chat;