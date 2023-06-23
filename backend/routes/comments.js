// first we need to create a router
const router = require('express').Router();

// we need user variable to use the user model
let Comment = require('../models/comments.model');

router.route('/add').post((req, res) => {

    const groupID = String(req.body.groupID);
    const userId = String(req.body.userId);
    const userName = String(req.body.userName);
    const message = String(req.body.message);

    const newComment = {
        userId,
        userName,
        message
    };
    Comment.findOneAndUpdate(
        {activityID:groupID },
        {$push:{"comments":newComment}},
        function(err, currentComment){
            if(err){
                console.log(err)
            }
        
    });

    

    


});

//router.route('/:id').get((req, res) => {
router.get('/get/:id', async (req, res) => {
    try{
        const comments = await Comment.findOne( {activityID:req.params.id} )
        res.json(comments)
    }
    catch{
        res.status({error: "Comment does not exist."})
    }
});

// and we export the module via router
module.exports = router;