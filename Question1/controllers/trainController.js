const asyncHandler = require("express-async-handler")
const request = require("request")

const sendAuthRequest = async () => {
    const body = JSON.stringify({
      companyName: "Train Drag",
      clientID: "c814790d-1fe2-408d-86bc-e9c211de7fd1",
      clientSecret: "rTgqubNiIzWcEZsd",
      ownerName: "Vaibhav",
      ownerEmail: "500084879@stu.upes.ac.in",
      rollNo: "500084879",
    });
  
    const response = await fetch('http://20.244.56.144/train/auth', {
      method: 'POST',
      body,
    });
  
    if (response.status === 200) {
      // The request was successful.
      const data = await response.json();
      return data.access_token;
    } else {
      // The request failed.
      throw new Error(response.statusText);
    }
  };


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getTrains = asyncHandler(async (req, res) => {
    const data = await sendAuthRequest();
    console.log(data);
    // const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({ message: "working getTrains" });
});

//@desc Get Contact
//@route GET /api/contacts
//@access private
const getTrain = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Working getTrain" });
});

module.exports = { getTrains, getTrain }; 