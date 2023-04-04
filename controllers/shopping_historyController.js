const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Shopping_history = mongoose.model('Shopping_history');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('Shopping_history').aggregate([
      { $lookup:
         {
           from: 'Member',
           localField: 'member_id',
           foreignField: 'member_id',
           as: 'member_history'
         }
       }
   ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

function updateRecord(req, res) {
	Shopping_history.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('shopping_history/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("shopping_history/edit", {
					viewTitle: "Edit Shopping History",
					shopping_history: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Shopping_history.find((err, docs) => {
		if(!err){
			res.render("shopping_history/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving shopping history list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Shopping_history.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("shopping_history/edit", {
				viewTitle: "Edit Shopping History",
				shopping_history: doc
			});
		}
	});
});

module.exports = router;
