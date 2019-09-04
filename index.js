const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/routes");
const MONGOURI = require("./config/keys").mongoURI;
const PORT = process.env.PORT || 4200;
const bodyParser = require("body-parser");

const app = express();

//Config body express app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(MONGOURI, {useNewUrlParser: true})
    .then(() => console.log("Conectado a la base de datos 🚀"))
    .catch((err) => console.log(err));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

