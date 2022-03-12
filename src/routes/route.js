const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)

//today
router.get("/cowin/getByDistrictId", CowinController.getByDistrictId)
//
router.get("/wheather/getWheatherById", CowinController.getWheatherById)

router.get("/wheather/getSortedCities", CowinController.getSortedCities)

router.post("/meme/memeCreater", CowinController.memeCreater)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;