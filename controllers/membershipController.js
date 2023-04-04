const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Membership = mongoose.model('Membership');
const Member = mongoose.model('Member');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";


router.post('/', (req, res) => {
    updateRecord(req, res);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('Membership').aggregate([
      { $lookup:
         {
           from: 'Member',
           localField: 'member_id',
           foreignField: 'member_id',
           as: 'member_membership'
         }
       }
   ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

function updateRecord(req, res) {
	Membership.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('membership/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("membership/edit", {
					viewTitle: "Edit Membership",
					membership: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Membership.find((err, docs) => {
		if(!err){
			res.render("membership/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving employee list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Membership.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("membership/edit", {
				viewTitle: "Edit Membership",
				membership: doc
			});
		}
	});
});

module.exports = router;
