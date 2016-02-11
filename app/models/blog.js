var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: { type: String },
    title_sub: { type: String },
    content: { type: String },
    user:{type: String},
    date: { type: Date }
});

//The MongoDB Schema for your each post's comments
var commentSchema = new Schema({
	postid: { type: String },
	title_sub: { type: String },
	name: { type: String },
	comment: { type: String },
	date: { type: Date }
});

var blog = mongoose.model("Blog", blogSchema);
var comment = mongoose.model("Comment", commentSchema);

module.exports ={
	Blog:blog,
	Comment:comment
};