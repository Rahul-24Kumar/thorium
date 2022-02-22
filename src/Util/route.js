let obj = require ('./helper')
const express = require ('express')
const app = express();
const router = express.Router();

router.get('/text-me', function (req, res) {
    let date_ob = new Date();
    let day = ('0' + date_ob.getDate()).slice(-2);
    let month = ('0' + date_ob.getMonth() + 1).slice(-2);
    let year = date_ob.getFullYear();
    let Date= year + " - " + month + " - " + day;
    console.log(Date);
    res.send('Thorium, WeD1, the topic for today is Nodejs module system')
});

module.exports = router;
//adding this comment for no reason