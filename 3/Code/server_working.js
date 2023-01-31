//Oswiadczam ze niniejsza praca zostala wykonana przezemnie samodzielnie - Tadeusz Golczyk 300531
//Formularz do edytowania rekordow znaduje sie na stronie /netflixDodaj2 , natomiast strona do ogladania
//bazy danych to /netflix. /netflixDodaj oraz / s¹ efektem ubocznym pracy
const express=require('express')
const app=express()
const port= 3000

const {MongoClient} =require('mongodb');
var url="mongodb://localhost:27017";
var mongoose = require('mongoose');

app.use((req,res,next) => {
	console.log(req.url);
	next( );
});

async function readNetflix(req,res){
const client= new MongoClient(url) 
try {
	await client.connect();
	var netflix=await client.db("opa").collection("netflix") 
										.find( { } ) 
										.toArray( ) ;
	res.send(netflix);
	}catch(e) {
		res.status(500).send("Error:"+err)
	}finally{
		await client.close( );
		}
	};

async function updateRecord(client,id,show_id,type,title,director,cast,country,date_added,release_year,rating,duration){
	const result=await client.db("opa").
						collection("netflix").
						updateRecord({_id:ObjectId(id)} ,
						{$set: {show_id:show_id}},
						{$set: {type:type}},
						{$set: {title:title}},
						{$set: {director:director}},
						{$set: {cast:cast}},
						{$set: {country:country}},
						{$set: {date_added:date_added}},
						{$set: {release_year:release_year}},
						{$set: {rating:rating}},
						{$set: {duration:duration} } ) ;
}


app.get("/netflix", (req,res) => {
	readNetflix(req,res) ;
})

app.get('/', (req,res) => {
	res.send('HelloWorld!')
})

app.get('/netflixDodaj', (req,res) =>{
	res.sendFile('dodajElement.html',{root:__dirname});
})

app.get('/netflixDodaj2', (req,res) =>{
	res.sendFile('dodajElement2.html',{root:__dirname});
})

var Ticket = mongoose.model('Ticket', { status: String, description: String  });


app.post('/submit', function(req, res) {
    var ticektId = req.body.id;
    var ticektShow_id = req.body.show_id;
	var ticektType = req.body.type;
    var ticektTitle = req.body.title; 
	var ticektDirector = req.body.director;
    var ticektCast = req.body.cast; 
	var ticektCountry = req.body.country;
    var ticektDate_added = req.body.date_added; 
	var ticektRelease_year = req.body.release_year;
    var ticektRating = req.body.rating; 
	var ticektDuration = req.body.duration;
    
    var ticket= new Ticket({ id: ticektId , show_id: ticektShow_id ,type: ticektType ,title: ticektTitle ,
								director: ticektDirector ,cast: ticektCast ,country: ticektCountry ,date_added: ticektDate_added ,
								release_year: ticektRelease_year ,rating: ticektRating ,duration: ticektDuration , });
    ticket.save(function (err) {
        if (err) // ...
        console.log('saved');
    });

	updateRecord(client,ticektId,ticektShow_id,ticektType,ticektTitle,ticektDirector,ticektCast,
				ticektCountry,ticektDate_added,ticektRelease_year,ticektRating,ticektDuration);
});

app.listen(port, () => {
	console.log( 'Exampleapplisteningat' +
					'http://localhost:${port}');
})