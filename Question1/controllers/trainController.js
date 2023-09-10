const asyncHandler = require("express-async-handler")
const request = require("request")

const sendAuthRequest = async () => {
    const body = JSON.stringify({
        companyName: "Train Drag",
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
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
        return false;
    }
};

const getTrainsReq = async () => {
    const accessToken = await sendAuthRequest();
    if (!accessToken) {
        return
    }

    const response = await fetch('http://20.244.56.144/train/trains', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 200) {
        // The request was successful.
        const data = await response.json();
        const sortedTrains = data.sort((a, b) => {
            if (a.price.sleeper < b.price.sleeper) {
              return -1;
            } else if (a.price.sleeper > b.price.sleeper) {
              return 1;
            } else {
              return b.departureTime - a.departureTime;
            }
          });
          return sortedTrains;
        // return data;
    } else {
        // The request failed.
        throw new Error(response.statusText);
    }
};

const getTrainRequest = async (path) => {
    const accessToken = await sendAuthRequest();
  
    const response = await fetch(`http://20.244.56.144/train/trains/${path}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (response.status === 200) {
      // The request was successful.
      const data = await response.json();
      return data;
    } else {
      // The request failed.
      throw new Error(response.statusText);
    }
  };



//@desc Get all trains
//@route GET /api/train
//@access private
const getTrains = asyncHandler(async (req, res) => {
    let trains = await getTrainsReq();
    // const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(trains);
});

//@desc Get train
//@route GET /api/train/{train_id}
//@access private
const getTrain = asyncHandler(async (req, res) => {
    const path = req.params.id;
    let train = await getTrainRequest(path);
    res.status(200).json(train);
});

module.exports = { getTrains, getTrain }; 