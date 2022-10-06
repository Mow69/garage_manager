const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const homeRoutes = require("./routes/homeRoutes");
const newCarRoutes = require("./routes/newCarRoutes");
const carRoutes = require("./routes/api/carRoutes");
const PORT = 8092;

// charge le fichier de configuration
dotenv.config();

// connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION,
    { useNewUrlParser: true,
    useUnifiedTopology: true });

    console.log("Connexion à MongoDB réussie");

  }
  catch (err) {
    console.log("Connexion à MongoDB échouée : ", err);
  }
}

connectDB();

const app = express();

// défini le moteur de template
app.set("view engine", "ejs");

// défini l'emplacement des vues
app.set("views", __dirname + "/views");

// déclare le dossier qui sera public
app.use(express.static(__dirname + "/public"));

// permet de créer des session (cookie)
app.use(session({secret: 'secretpass'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', homeRoutes);
app.use('/car', newCarRoutes);
app.use('/api', carRoutes);

// cas ou la page n'existe pas
app.use((req, res) =>  {
    res.status(404);
    res.render("404");
});

app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`)
})