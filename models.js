

var groupsSchema = mongoose.Schema({

    groupName: String,
    members: [
    {
    	type: mongoose.Schema.ObjectId, ref: "User"
   	}]

});

var userSchema = mongoose.Schema({
    
    userName : String, 
    groups: [
    {  

		type: mongoose.Schema.ObjectId, 
		ref: "Group"
    }]
});

var chatHistory = mongoose.Schema({

	userId : {
    		type: mongoose.Schema.ObjectId, 
    		ref: "User"
    	},
	groupId : {
			type: mongoose.Schema.ObjectId, 
    		ref: "Group"
	},
	message : String,
	timestamp : Date

});

var Group = mongoose.model('Group', groupsSchema);
var User = mongoose.model('User', userSchema);
var Chat = mongoose.model('Chat', chatSchema);

exports.Group = Group;
exports.User = User;
exports.Chat = Chat;