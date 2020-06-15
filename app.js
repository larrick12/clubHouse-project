// server.js
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
const url = // database url in here;
const dbName = 'hngDb';

MongoClient.connect(url,{useUnifiedTopology: true}) 

	//want to use a promise instead of callback function()
	//(err, client) => {
	//if(err) return console.log(err);
	//const db;
	//storing a reference to the database
	//db = client.db(dbName)
	//console.log('connected mongoDb');
	//console.log(`Database: ${dbName}`);
	//})
	
	.then(client => {
	const db = client.db(dbName);
	console.log(`connected MongoDb: ${dbName}`)
	// write to the database collection
	const dbCollection = db.collection('path')
	
	//can be place before any 'use' or crud
	app.set('view engine', 'ejs')
	app.use(express.static('public'))
	app.use(bodyParser.json())
	
	//make sure you use bodyparser before crud
	app.use(bodyParser.urlencoded({extended: true}));
	

	app.get('/', (req, res) => {
	   db.collection('quotes').find().toArray()
	   .then(results => {
	   res.render('index.ejs', {quotes: results})
	})
	.catch(err => console.error(err))
	})

	app.post('/', (req, res) => {
	   dbCollection.insertOne(req.body)
	   .then(result => {
		res.redirect('/')
	   })
	   .catch(error => console.error(error))
	})
	// want to update on user input
	app.put('/', (req, res) => {
		dbCollection.findOneAndUpdate(
		{ name: name }, 
		{
			$set: {
				name: req.body.name,
				
			}
		}
		)
		.then(respond => {
			res.json('success')
		})
		.catch(error => console.error(error))
	})
	
	app.delete('/', (req, res) => {
		quoteCollect.findOneAndDelete(
		{ name: req.body.name }
		)
  		.then(result => {
  			if(result.deletedCount === 0){
  				return res.json('Nothing to delete')
  			}
  			res.json('Deleted')
  		})
  		.catch(error => console.error(error))
	})

	app.listen(8080, () => { console.log('listening to port 8080')});

	})
	.catch(error => console.error(error));
