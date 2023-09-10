const asyncHandler = require("express-async-handler")

const authUrl = 'http://20.244.56.144/train/auth';
//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    // const {companyName, clientID, ownerName, rollNo,  clientSecret} = req.body;
    // if(!companyName || !clientID || !ownerName || !rollNo || !clientSecret){
    //     res.status(400);
    //     throw new Error("All fields are mandatory!");
    // }

    // const body = JSON.stringify({
    //     "companyName": "Train Drag",
    //     "clientID": "c814790d-1fe2-408d-86bc-e9c211de7fd1",
    //     "clientSecret": "rTgqubNiIzWcEZsd",
    //     "ownerName": "Vaibhav",
    //     "ownerEmail": "500084879@stu.upes.ac.in",
    //     "rollNo": "500084879"
    //   });

    // Make a request to the auth URL.
    const response = await request(authUrl, {
        method: 'POST',
        body: req.body
      });
  
      if (response.statusCode === 200) {
        // Get the auth token from the response.
        // const accessToken = response.body.accessToken;
  
        // Return the auth token to the user.
        res.status(200).json(response);
      } else {
        // Throw an error if the request failed.
        throw new Error(response.body.error);
      }
});

module.exports = {loginUser}