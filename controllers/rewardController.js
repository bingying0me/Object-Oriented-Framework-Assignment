const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Reward = mongoose.model('Reward');

router.post('/', (req, res) => {
    updateRecord(req, res);
});



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('Reward').aggregate([
      { $lookup:
         {
           from: 'Member',
           localField: 'member_id',
           foreignField: 'member_id',
           as: 'member_rewards'
         }
       }
   ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

function updateRecord(req, res) {
	Reward.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('reward/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("reward/edit", {
					viewTitle: "Edit Reward",
					reward: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Reward.find((err, docs) => {
		if(!err){
			res.render("reward/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving reward list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Reward.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("reward/edit", {
				viewTitle: "Edit Reward",
				reward: doc
			});
		}
	});
});

module.exports = router;
