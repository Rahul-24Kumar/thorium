const express = require('express');
const router = express.Router();

let players =
   [
       {
           "name": "rahul",
           "dob": "18/09/1985",
           "gender": "male",
           "city": "bihar",
           "sports": ["swimming"],
           "bookings": [
               {
                   "bookingNumber": 1,
                   "sportId": "",
                   "centerId": "",
                   "type": "private",
                   "slot": '16286598000000',
                   "bookedOn": '31/08/2021',
                   "bookedFor": '01/09/2021'
               },
               {
                   "bookingNumber": 2,
                   "sportId": "",
                   "centerId": "",
                   "type": "private",
                   "slot": '16286518000000',
                   "bookedOn": '31/08/2001',
                   "bookedFor": '01/09/2001'
               },
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": ["soccer"],
           "bookings": []
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": ["tennis"],
           "bookings": []
       },
       {
        "name": "abhhishek",
        "dob": "1/12/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": ["cricket"],
        "bookings": []
    },
    {
        "name": "shrikant",
        "dob": "18/08/1994",
        "gender": "male",
        "city": "aurangabad",
        "sports": ["football"],
        "bookings": [
            {
                "bookingNumber": 7,
                "sportId": "",
                "centerId": "",
                "type": "private",
                "slot": '16286598000000',
                "bookedOn": '31/08/2021',
                "bookedFor": '31/10/2021'
            },
        ]
    },
   ]

   router.post("/players", function(req, res) {
       let value =req.body.name
       let flag= true
       for (let i=0; i<players.length; i++) {
           if (players[i].name===value) {
               flag=false
               res.send("Error player name already exist");
           }
       }
       if (flag === true) {
           players.push(req.body);
           res.send(players);

       }
   })

   router.post("/:playersName/bookings/:bookingId", function(req, res) {
    let name =req.params.playersName
    let id =req.params.bookingId
    let value=req.body
    for (let i=0; i<players.length; i++) {
        if (players[i].name===name) {
            let arr=players[i].bookings
            if(arr.length===0) {
                arr.push(value)
                res.send(players)
            } else {
                for (let j=0; j<arr.length; j++) {
                    if(arr[j].bookingNumber != id) {
                        arr.push(value)
                        res.send(players)
                    } else {
                        res.send("booking ID already exists")
                    }
                }
            }
        }
    }
    res.send("name does not exist")
   
   })

   module.exports = router;