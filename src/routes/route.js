const express = require('express');
const router = express.Router();

router.get('/test-me', function(req, res) {
    res.send('My first ever api!')
});

// 1
router.get('/movies', function(req,res) {
    res.send('["Fukrey", "Delhi", "Dabang", "Rockstar", "Suryawanshi"]')
});

// 2
router.get('/movies/:movieId', function(req, res) {
    mov = ["Fukrey", "Delhi", "Dabang", "Rockstar", "Suryawanshi"]
    let value = req.params.movieId;
    if(value>mov.length-1) {
        res.send('"Doesnt exist"')
    } else {
        res.send(mov[value])
    }
})

// 3
router.get('/moviez', function(req,res) {
    res.send([ {id: 1,name: 'The Shining'}, {id: 2, name: 'Incendies'},  {id: 3, name: 'Rang de Basanti'}, {id: 4, name: 'Finding Demo'} ])
});

// 4
router.get('/films/:filmId', function (req,res) {
    let movi = [ {id: 1,name: 'The Shining'}, {id: 2, name: 'Incendies'},  {id: 3, name: 'Rang de Basanti'}, {id: 4, name: 'Finding Demo'} ]
    let value = req.params.filmId;
    let found = false;
    for(i=0; i<movi.length;i++) {
        if(movi[i].id==value) {
            found = true
            res.send(movi[i])
            break
        }
    }
    if(found==false) {
        res.send('No Movie exists with this id') 
    }
});

module.exports = router;
