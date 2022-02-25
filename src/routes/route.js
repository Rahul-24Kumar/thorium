const express = require('express');
const router = express.Router();


// ASSIGNMENT:
// you will be given an array of persons ( i.e an array of objects )..each person will have  a {name: String , age: Number, votingStatus: true/false(Boolean)}
// take input in query param as votingAge..and for all the people above that age, change votingStatus as true
// also return an array consisting of only the person that can vote


let persons= [
    {
    name: "PK",
    age: 10,
    votingStatus: false
},
{
    name: "SK",
    age: 20,
    votingStatus: false
},
{
    name: "AA",
    age: 70,
    votingStatus: false
},
{
    name: "SC",
    age: 5,
    votingStatus: false
},
{
    name: "HO",
    age: 40,
    votingStatus: false
}
]
router.post("/post-query-3", function (req, res) {
let input = req.query.input;
// {age is above 18}
let finalArray = [];
for(let i=0; i<persons.length; i++) {
    if(persons[i].age >= input) {
        persons[i].votingStatus = true;
        finalArray.push(persons[i])
    } 
}
    return res.send(finalArray)
})
module.exports = router;