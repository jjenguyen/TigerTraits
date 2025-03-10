//declare dependencies 
const User = require("../models/user");
const router = require("express".Router());

//get user method, return json version of result if found by uname
router.get("/:uname", function(req, res){
    User.findOne({uname: {$eq: req.params.uname}})
    .then((found) => {
        res.json(found);
    })
    .catch(function(err) {
        res.status(400).send(err);
    });
});

//add user method, try to save and send 204 is success, log error if fails
router.post("/", function(req, res) {
    //instance of 'user' from the request
    const user = new User(req.body);

    //try to save user
    user.save()
    .then(function (models) {
        res.sendStatus(204);
    })
    .catch(function(err){
        console.log(err);
    });
});

//update user method, updates username as specified, 204 is success, log error if fails
router.put("/:uname", function(req, res){
    User.updateOne({uname: {$eq : req.params.uname}}, req.body, {upsert: true})
    .then(res.sendStatus(204))
    .catch(function(err) {
        console.log(err);
    });
})

module.exports = router;

