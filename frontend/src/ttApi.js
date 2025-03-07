const apiEndpoint = "http://localhost:3000/api/users";
const bcrypt = require("bcryptjs");

//check if user exists first
/**
 * 
 * @param {String} uname uname (university email? of user)
 * @param {String} pass password (nonhashed to be hashed in registerUser_)
 * @returns an array, array[1] is the error msg, array[0] is pass/fail
 */
async function checkUser(uname, pass){
    const response = await fetch(`${apiEndpoint}/${uname}`);
    if(response.ok){
        var user = await response.json();
        if(user == null){
            return [false, "User doesn't exist yet."];
        }
        if(bcrypt.compareSync(pass, user.pass)){
            return [true, "success"];
        } else {
            return console.log([false, "uname/pw combo matched a user, but the wrong password was used"]);
        }
    }
}



//use above function to check if user exists, if we get "User doesn't exist yet." as response[1], register
/**
 * 
 * @param {String} uname uname (university email? of user)
 * @param {String} pass password (nonhashed to be hashed in registerUser_)
 * @returns bool if user's logged in
 */

async function registerUser(uname, pass) {
    var registerThisUname = await checkUser(uname, pass);
    if (registerThisUname[1] === "User doesn't exist yet."){
        //don't compare on [0], we have multiple false options, comparing ==== false could register users if they provide wrong pw to uname combo
        //define hashed pw from bcrypt
        let hashPW = bcrypt.hashSync(pass, 10);

        //define 'user'
        const newUser = {
            uname: uname,
            pass: hashPW,
            //initialize to empty string
            pType: ""
        }


        //define options for use in API call
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }

        //call api endpoint w/ 'apiEndpoint` & `options`
        fetch(`${apiEndpoint}`, options)
        .then(response => {
            if(response.status === 204) {
                //if we get okay response
                return true;
            }
            else {
                return false;
            }
        })
    }
    else {
        return false;
    }
};
