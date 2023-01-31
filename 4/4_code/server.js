//Wykonano przez Tadeusz Golczyk 300531
//Oswiadczam ze niniejsza praca bedaca podstawa do ocenienia pracy z przedmiotu OPA zostala wykonana przezemnie samodzielnie.
//Jako baze danych w Compasie uzylem netflix_titles.json w bazie pod nazwa opa i kolekcji pod nazwa netflix
const express = require('express')
const app = express();
const port = 3000

const {MongoClient} = require('mongodb');
var url = "mongodb://localhost:27017";

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
 });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('static'))


app.get('/webresources/netflix', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("netflix");  
            opaDB.collection("netflix").find({}).toArray(function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.send(result);
                }
            });
        }
    });
})


app.post('/webresources/netflix', (req, res) => {
    console.log(req.body);
    data = {
        show_id: req.body.show_id,
        type: req.body.type,
        title: req.body.title,
        director: req.body.director,
        cast: req.body.cast,
        country: req.body.country,
        date_added: req.body.date_added,
        release_year: req.body.release_year,
        rating: req.body.rating,
        duration: req.body.duration,
        listed_in: req.body.listed_in ,
        description: req.body.description.split('\n')
    }
    console.log(data);      // \todo validate data !!!
    
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("netflix");    
            collection.insertOne(data, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send("Rekord utworzony: id=" + result.insertedId);
                }
            });
        }
    });
})


app.listen(port, () => {
    console.log(`Example app listening at ` + 
                `http://localhost:${port}`   );
  })
