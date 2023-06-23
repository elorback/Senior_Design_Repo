// first we need to create a router
const router = require('express').Router();

// we need user variable to use the user model
let Activity = require('../models/activities.model');

// we need user variable to use the user model
let Comment = require('../models/comments.model');

//We need a tag variable to use the tag model
const Tag = require("../models/tags.model");

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database
router.route('/').get((req,res) => {
    //its gonna go to user, find users and then return json file of users
    Activity.find().then(activities => res.json(activities)).catch(err => res.status(400).json('Error: ' + err));
});


// what to do if we get '/add' request from server
// First we get the information from the server, and then create a new user from that informatin and
// then finally save it to the database as json file and print the message "User added!"


router.route('/add').post((req, res) => {
    const name = String(req.body.name);
    const time = Date.parse(req.body.time);
    const type = String(req.body.type);
    const description = String(req.body.description);
    const tagsArray = req.body.tagsArray;
    const createdBy = req.body.createdBy;
    const members = req.body.members;

    const newActivity = new Activity({
        name,
        time,
        type,
        description,
        tagsArray,
        createdBy,
        members
    });

    newActivity.save().then(()=> res.json('Activity added!')).catch(err => res.status(400).json('Error: ' + err));

    const newComment = new Comment({
        activityID: newActivity._id,
        activityName: newActivity.name
    });

    //Create a comment record for this activity
    newComment.save().catch(err => res.status(400).json('Error: ' + err));

    //send tags to be checked by the database
    if(tagsArray)
        newActivityTags(newActivity._id ,newActivity);

});

// when used url http://localhost:5000/activities/new and made get request
// this will return the 5 newest activities
router.route('/latest').get((req,res) => {
    Activity.find().sort({ _id: -1 }).limit(5).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});

// when used url http://localhost:5000/activities/new and made get request
// this will return the top 5 activities based on members
router.route('/top').get((req,res) => {
    Activity.find().sort({ "membersLength": -1 }).limit(5).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});

// when used url http://localhost:5000/activities/id_of_the_activity and made get request
// this will return the specific activity
router.route('/:id').get((req, res) => {
    Activity.findById(req.params.id).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));
});
 
// when used url http://localhost:5000/activities/id_of_the_activity and made a delete request
// this will delete the specific activity
router.route('/:id').delete((req, res) => {
    let activityID = req.params.id

    //Detele Activity
    Activity.findByIdAndDelete(activityID).then(activity => res.json('Exercise Deleted!')).catch(err => res.status(400).json('Error: ' + err));

    //find comment object by activity id and delete comments for that activity
    Comment.findOneAndDelete( {activityID:activityID},
        function(err, commentOBJ){
            if(err){
                console.log(err)
            }
        } )

    //Remove group from tag list
    deleteActivityTag(activityID);
});

// when used url http://localhost:5000/activities/createdBy and made get request
// this will return the activities created by the user
router.route('/createdBy').post((req, res) => {
    let incomingUser = req.body.userId;
    let incomingUserName = req.body.userName

    Activity.find({"createdBy.id":incomingUser}, function(err, groups){
        if(err){
            res.send(err)
        }else{
            res.json(groups)
        }
        
    });
});





// when used url http://localhost:5000/activities/joinedGroups and made get request
// this will return the activities joined by the user
router.route('/joinedGroups').post((req, res) => {
    let incomingUser = req.body.userId;

    Activity.find({"members.id":incomingUser, "createdBy.id":{$ne: incomingUser} }, function(err, groups){
        if(err){
            res.send(err)
        }else{
            res.json(groups)
        }
        
    });
});

// when used url http://localhost:5000/activities/update/id_of_the_activity
// this will update the specific activity linked with that ID
router.route('/update/:id').post((req, res) => {
    let activityID = req.params.id;
    let addedTags = req.body.addedTags;
    let removedTags = req.body.removedTags;

    let activityData = {
        name: String(req.body.name),
        time: Date.parse(req.body.time),
        type: String(req.body.type),
        description: String(req.body.description),
        tagsArray: req.body.tagsArray,
        createdBy: req.body.createdBy,
        members: req.body.members
    }

    Activity.findById(activityID)
    .then(activity => {
        activity.name = String(req.body.name);
        activity.time = Date.parse(req.body.time);
        activity.type = String(req.body.type);
        activity.description = String(req.body.description);
        activity.tagsArray = req.body.tagsArray;

        activity.save().then(()=> res.json('Activity updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));

    //Add new tags if they are any
    if(addedTags)
        newActivityTags(activityID, activityData);

    //Remove tags if they are any
    if(removedTags)
        removeActivityTag(removedTags, activityID);

});

// when used url http://localhost:5000/activities/join/id_of_the_activity
// this will update the specific activity linked with that ID
router.route('/join/:id').post((req, res) => {
    Activity.findById(req.params.id)
    .then(activity => {
        activity.members = req.body.members;

        activity.save().then(()=> res.json('Activity joined!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));

});

//This route will return all group info for a given array of group IDs
router.route('/findGroups').post((req, res) => {
    const tagGroups = req.body.tagGroups;
    const returnedGroupInfo = [];

    //Search for each group id and return their details
    tagGroups.forEach( element =>{
        Activity.find( {_id:element},function(err, group){
            if(err)
              res.status(400).json('Error: ' + err);
            else{
                returnedGroupInfo.push(group);
            }

        })
    })
    res.json(returnedGroupInfo);//.catch(err => res.status(400).json('Error: ' + err));
});


const newActivityTags = (activityID, activityData) =>{

    //Go through each tag from the user
    activityData.tagsArray.forEach(element => {
      //Check tag database for duplicates and count each occurence
      Tag.countDocuments({tagName: element}, function(err, count){
        
        if(count > 0){
  
          //find tag database record
          Tag.findOneAndUpdate(
            {tagName:element},
            //push the user record to the tag database record
            {$push:{"groups":{
                groupId:activityID,
                groupName: activityData.name,
                groupTime: activityData.time,
                groupType: activityData.type,
                groupDescription: activityData.description,
                groupCreatedBy: activityData.createdBy,
                groupMembers: activityData.members
            }}},
            function(err, tags){
              if(err)
                res.status(400).json('Error: ' + err);
            }
          )
        }
        else{
  
          let newTag = new Tag({
            tagName: element,
            groups:[{
                groupId:activityID,
                groupName: activityData.name,
                groupTime: activityData.time,
                groupType: activityData.type,
                groupDescription: activityData.description,
                groupCreatedBy: activityData.createdBy,
                groupMembers: activityData.members
            }]
          })
          //save tag to the database
          newTag.save().catch(err => res.status(400).json('Error: ' + err));
        }
      })
    });
  }

  const deleteActivityTag = (activityID) =>{
      Tag.updateMany(
          {groupId: activityID},
          {$pull:{"groups":{groupId: activityID}} },
          function(err, tags){
            if(err)
              res.status(400).json('Error: ' + err);
          }
      )
  }

const removeActivityTag = (removedTags, activityID) => {
    //Go through each tag
    removedTags.forEach(element => {
        //find the tag name in the database
        Tag.findOneAndUpdate(
            {tagName:element},
            //remove the group from the tag
            {$pull: {"groups":{groupId: activityID}}},
            function(err, tags){
                if(err)
              res.status(400).json('Error: ' + err);
            }
        )
    })
}

// and we export the module via router
module.exports = router;