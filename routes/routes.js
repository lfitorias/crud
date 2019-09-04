const express = require("express");
const router = express.Router();

const { Movie } = require("../models/movie");

router.get("/", (req, res) => {
    res.send("Server arriba")
});

//CRUD
//CREATE
router.post("/api/v1/movie", (req, res) => {
    // console.log(req.body);
    const { title, year, image, description, theme, director } = req.body;
    const newMovie = Movie({
        title,
        year,
        image,
        description,
        theme,
        director
    });
    newMovie.save((err, movie)=>{
        err ? res.status(500).send(err) : res.status(200).send("Registro exitoso");
    
    });
    // res.send(req.body);
});


//READ
router.get("/api/v1/movie", (req, res) => {
    Movie.find()
        .then(movies => res.status(200).send(movies))
        .catch(err => res.status(400).send(err));
});

router.get("/api/v1/getMovieById", (req, res) => {
    const id = req.query.id;

    Movie.findById(id, (err, movie) => {
        err ? res.status(404).send(err) : res.status(200).send(movie);
    });
        
});

//UPDATE
router.put("/api/v1/replaceMovieById", (req, res) => {
    const { id } = req.query;
    const body = req.body;

    Movie.findByIdAndUpdate(id, { $set:body }, { new:true })
        .then(newMovie => {
            if(newMovie !== null){
                res.status(201).send(newMovie)
            }else{
                res.status(304).send("Registro no modificado");
            }
        })
        .catch(err =>{
            res.status(500).send(err);
        })
        
});
router.patch("/api/v1/patchMovieById", (req, res) => {
    const { id } = req.query;
    const body = req.body;
    const lenght = Object.keys(body).length;

    if( lenght > 5 ){
        res.status(403).send("Numero de elementos excede al modelo")
    }else{
        Movie.findByIdAndUpdate(id, { $set:body }, { new:true })
            .then(newMovie => {
                if(newMovie !== null){
                    res.status(201).send(newMovie)
                }else{
                    res.status(304).send("Registro no modificado");
                }
            })
            .catch(err =>{
                res.status(500).send(err);
            })
    }
        
});

//DELETE
router.delete("/api/v1/deleteMovieById", (req, res) => {
    const { id } = req.query;
    Movie.findByIdAndDelete(id)
    .then(res => {
        if(res === null){
            res.status(201).send("Registro Eliminado");
        }else{
            res.status(304).send("Registro no Eliminado");
        }
    })
    .catch(err => {
        res.status(500).send(err)
    })
});



module.exports = { router };