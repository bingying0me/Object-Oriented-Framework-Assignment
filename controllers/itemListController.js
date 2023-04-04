const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ItemList = mongoose.model('ItemList');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('History').aggregate([
      { $lookup:
         {
           from: 'History',
           localField: 'history_id',
           foreignField: 'history_id',
           as: 'item_history'
         }
       }
   ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

function updateRecord(req, res) {
	ItemList.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('itemList/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("itemList/edit", {
					viewTitle: "Edit ItemList",
					itemList: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	ItemList.find((err, docs) => {
		if(!err){
			res.render("itemList/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving itemList list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	ItemList.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("itemList/edit", {
				viewTitle: "Edit Item List",
				itemList: doc
			});
		}
	});
});

module.exports = router;
