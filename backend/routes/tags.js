// first we need to create a router
const router = require('express').Router();

// we need tag variable to use the tag model
let Tag = require('../models/tags.model');

let User = require('../models/user.model');

//now we need to specify that if we recieve a '/get' request from the server,
// then what are we gonna do with the database

router.route('/').get((req,res) => {
    //its gonna go to user, find users and then return json file of users
    Tag.find().then(tags => res.json(tags)).catch(err => res.status(400).json('Error: ' + err));
});




// when used url http://localhost:5000/tags/followTag and made post request
// this add a user to the tag
router.route('/followTag').post((req, res) => {
    let incomingTag = req.body.incomingTag;
    let userName = req.body.userName;
    let userId = req.body.userId;
    Tag.updateOne(
        {
            tagName:incomingTag, 
            //this checks if the userId is not already in the database
            "users.userId": {$ne: userId}  
        },
        {
            $push:{users:
                {
                    userId:userId,
                    userName:userName
                }
            }
        },
        function(err,tags){
            if(err){
                res.status('Error: ' + err)
                console.log('Error: ' + err)
            }
        }
    );

    //find tag by name and then insert new object with user info
    User.updateOne({_id:req.body.userId},
        {$addToSet:{"interests":incomingTag}},
        function(err,tags){
            if(err){
                res.status('Error: ' + err)
                console.log('Error: ' + err)
            }


        }
    );
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

// when used url http://localhost:5000/tags/top and made get request
// this will return the top 5 tags based on members
router.route('/top').get((req,res) => {

    Tag.aggregate(
        [
            { "$project": {
                "tagName": 1,
                "users": 1,
                "createdAt": 1,
                "updatedAt": 1,
                "groups": 1,
                "length": { "$size": "$groups" }
            }},
            { "$sort": { "length": -1 } },
            { "$limit": 5 }
        ]
    ).then(activity => res.json(activity)).catch(err => res.status(400).json('Error: ' + err));

    // Tag.aggregate([
    //     {$project: {size:{$ size: "$ groups"}, <other required fields >}}},
    //     {$sort: {size: -1}}
    // ])
});

// when used url http://localhost:5000/tags/tagName and made get request
// this will return the specific tag
router.route('/:incomingTag').get((req, res) => {
    let incomingTag = req.params.incomingTag
    Tag.find({tagName:incomingTag}).then(tag => res.json(tag)).catch(err => res.status(400).json('Error: ' + err));
});


// // what to do if we get '/add' request from server
// // First we get the information from the server, and then create a new user from that informatin and
// // then finally save it to the database as json file and print the message "User added!"
// router.route('/add').post((req, res) => {
//     const tag = String(req.body.interests);

//     const newTag = new Tag({
//         interests
//     });

//     tag.save().then(()=> res.json('New tag added!')).catch(err => res.status(400).json('Error Testing: ' + err));


// });

// and we export the module via router
module.exports = router;
