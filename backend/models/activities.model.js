const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {type: String, required: true, minlength: 3},
    createdBy:[
        {
            id:{type:String},
            username:{type:String}
        }
    ],
    time: {type: String},
    type: {type:String},
    description: {type:String},
    tagsArray: [{type: String}],
    members: [
        {
            id:{type:String},
            username:{type:String}
        }
    ]
    },
    {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);
