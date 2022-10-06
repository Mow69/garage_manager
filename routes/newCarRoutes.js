const express = require('express');
const router = express.Router();
const Car = require('../models/car');

router.route('/new')
    .get((req, res) => {
        res.render('add-item.ejs', 
        {
            erreurs: [],
            car: undefined
        });
    })
    .post((req, res) => {

        let erreurs = [];
        let car = new Car({
            brandName: req.body.brandName,
            modelName: req.body.modelName,
            modelEnergy: req.body.modelEnergy,
            modelPrice: req.body.modelPrice,
            dateBuy: req.body.dateBuy
        });

        // test si les champs sont renseignés
        if (car.brandName == "") {
            erreurs.push("Le champ brandName n'est pas renseigné");
        }
        if (car.modelName == "") {
            erreurs.push("Le champ modelName n'est pas renseigné");
        }
        if (car.modelEnergy == "") {
            erreurs.push("Le champ modelEnergy n'est pas renseigné");
        }
        if (car.modelPrice == null) {
            erreurs.push("Le champ modelPrice n'est pas renseigné");
        }
        if (car.dateBuy == null) {
            erreurs.push("Le champ dateBuy n'est pas renseigné");
        }

        // si pas d'ereurs
        // redirige sur la page principale
        if (erreurs.length == 0) {

            // enregistre la car dans la bdd
            car.save()
                .then(data => res.redirect("/"))
                .catch(error => console.log(error));        
        }
        else {
            // si il y a des erreurs
            // affiche le formulaire avec les erreurs
            res.render('add-item.ejs', 
            {
                erreurs: erreurs,
                car: car
            });
        }
    });

    router.route('/edit/:id')
    .get((req, res) => {
        res.render('edit-item.ejs', 
        {
            erreurs: [],
            car: undefined
        });
    })
    .post((req, res) => {

        let erreurs = [];
        let car = new Car({
            brandName: req.body.brandName,
            modelName: req.body.modelName,
            modelEnergy: req.body.modelEnergy,
            modelPrice: req.body.modelPrice,
            dateBuy: req.body.dateBuy
        });

        // test si les champs sont renseignés
        if (car.brandName == "") {
            erreurs.push("Le champ brandName n'est pas renseigné");
        }
        if (car.modelName == "") {
            erreurs.push("Le champ modelName n'est pas renseigné");
        }
        if (car.modelEnergy == "") {
            erreurs.push("Le champ modelEnergy n'est pas renseigné");
        }
        if (car.modelPrice == null) {
            erreurs.push("Le champ modelPrice n'est pas renseigné");
        }
        if (car.dateBuy == null) {
            erreurs.push("Le champ dateBuy n'est pas renseigné");
        }

        // si pas d'ereurs
        // redirige sur la page principale
        if (erreurs.length == 0) {

            // modifie la car dans la bdd
            car.save()
                .then(data => res.redirect("/"))
                .catch(error => console.log(error));        
        }
        else {
            // si il y a des erreurs
            // affiche le formulaire avec les erreurs
            res.render('edit-item.ejs', 
            {
                erreurs: erreurs,
                car: car
            });
        }
    });

    router.route('/delete/:id')
        .get((req, res) => {
            // supprime la car en bdd
            Car.deleteOne({ _id: req.params.id })
            .then(data =>  
                // redirige sur la home
                res.redirect('/'))
            .catch(error => console.log(error));
        });

module.exports = router;