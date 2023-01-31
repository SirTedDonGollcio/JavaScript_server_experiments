'use strict';

const {MongoClient} = require('mongodb');

async function insertOne(client,element){
	const result = await client.db("opa").
							collection("netflix").
							insertOne(element);
	console.log( '${result.insertedId}') ;
}

async function main(){
	const uri = "mongodb://localhost:27017";
	const client = new MongoClient(uri);

	try{
		await client.connect( );
		const fs=require('fs');
		var rawdata = fs.readFileSync('netflix_titles.json');
		var netflix=JSON.parse(rawdata);
		netflix.forEach(element=> {
			insertOne(client,element);
		});
		await readNetflix(client);
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

async function readNetflix(client){
	var netflix = await client.db("opa").
						collection("netflix").
						find({}).toArray();
	console.log(netflix);
};

main().catch(console.error);
