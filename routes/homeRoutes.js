const express = require('express');
const router = express.Router();
const Car = require("../models/car");

router.route('/')
    .get((req, res) => {
        // récupère la liste des voitures
        Car.find()
            .then(data => res.render('home',
            {
                cars: data
            }))
            .catch(error => console.log(error));

});

module.exports = router;