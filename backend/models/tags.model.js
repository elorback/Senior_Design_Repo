const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema =  new Schema({
    tagName:{type:String},
    groups:[{
        groupId:{type: String},
        groupName:{type: String},
        groupTime:{type:String},
        groupType:{type:String},
        groupDescription:{type:String},
        groupCreatedBy:
        {
            id:{type:String},
            userName:{type:String}
        },
        groupMembers:[
            {
                id:{type:String},
                userName:{type:String}
            }
        ]

    }],
    users:[{
        userId:{type: String},
        userName:{type: String}
    }]
},
{timestamps: true});

module.exports = mongoose.model('Tag', tagSchema);