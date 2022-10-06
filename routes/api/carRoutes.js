const express = require('express');
const router = express.Router();
const Car = require('../../models/car');

router.route("/car")
    .post((req, res) => {
        let car = new Car(req.body);
        car.save()
            .then(data => res.status(201).json({ data }))
            .catch(error => res.status(400).json({ error }));
    });

router.route("/cars")
    .get((req, res) => {
        Car.find()
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(400).json({ error }));
    });

router.route("/car/:id")
    .get((req, res) => {
        Car.findOne({ _id: req.params.id })
            .then(data =>  res.status(200).json({ data }))
            .catch(error =>  res.status(400).json({ error }));
    })
    .put((req, res) => {
        Car.updateOne({ _id: req.params.id }, req.body)
            .then(data => res.status(200).json({ data }))
            .catch(error => res.status(400).json({ error }));
    })
    .delete((req, res) => {
        Car.deleteOne({ _id: req.params.id })
            .then(data =>  res.status(200).json({ data }))
            .catch(error => res.status(400).json({ error }));
    });

module.exports = router;