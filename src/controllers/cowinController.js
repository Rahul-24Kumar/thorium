let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
//Today
let getByDistrictId = async function (req, res) {
    try {
        let district_id = req.query.district_id
        let districtDate = req.query.districtDate
        console.log(`query params are: ${district_id} ${districtDate}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${districtDate}`
//https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=140&date=06-05-2021
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
//
let getWheatherById = async function (req, res) {
    try {
        let q = req.query.q
        let appid = req.query.appid
        console.log(`query params are: ${q} ${appid}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
//http://api.openweathermap.org/data/2.5/weather?q=London&appid=4ee4b654130634e1c6cf6087467c302a
//localhost:3000/wheather/getWheatherById?q=London&appid=c56644c9dd2d002e1f3bb3e33b031e37
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
//
// let getSortedCities = async function (req, res) {
//     try {
//         let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
//         let cityObjArray = []
//         for(i=0;i<=cities.length;i++) {
//          let obj= {city: cities[i]}
//          let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${c56644c9dd2d002e1f3bb3e33b031e37}`)  
//         //console.log(result.data.main.temp)
//         obj.temp=result.data.main.temp
//         cityObjArray.push(obj)
//     }
//     let sorted= cityObjArray.sort( function(a,b){ 
//         return a.temp-b.temp
//     })
//     //console.log(sorted)
//     res.status(200).send({status:true, msg: sorted})
// }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ status:false, msg: "server error"})
//     }
// }


let getSortedCities = async function (req, res) {
    try {
        let cities = ["Bangalore", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let appid = req.query.appid
        let arrays = []
        for (i = 0; i < cities.length; i++) {
            let sort = { city: cities[i] } 
            
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${appid}`
                //localhost:3000/wheather/getSortedCities?appid=c56644c9dd2d002e1f3bb3e33b031e37
            }
            let result = await axios(options)
            sort.temp = result.data.main.temp
            arrays.push(sort) 
        }
        let citiesTemp= arrays.sort(function (a, b) { return (a.temp - b.temp) }) 
             res.status(200).send({status:true, data: citiesTemp})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

let memeCreater = async function (req, res) {
    try {
        let options = {
            method: "post",
        url: "https://api.imgflip.com/caption_image?template_id=61579&text0=Hey, Are you fine?&text1=yes&username=chewie12345&password=meme@123"
    
        }
        let result = await axios(options)
        //console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getByDistrictId = getByDistrictId
module.exports.getWheatherById = getWheatherById
module.exports.getSortedCities = getSortedCities
module.exports.memeCreater = memeCreater