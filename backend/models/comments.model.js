const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema =  new Schema({
    activityID:{type:String},
    activityName:{type:String},
    comments:[{
        userId:{type: String},
        userName:{type: String},
        message:{type: String},
        replies:[{
            userId:{type: String},
            comId:{type: String},
            fullName:{type: String},
            text:{type: String},
            avatarUrl:{type: String}
        }]

    }]
},
{timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);