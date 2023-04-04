const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Level = mongoose.model('Level');

router.get('/', (req, res) => {
	res.render("level/add", {
		viewTitle: "Create Level"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});


function insertRecord(req,res){
	var level = new Level();
	level.level_id = req.body.level_id;
	level.level_name = req.body.level_name;
	level.discount_rate = req.body.discount_rate;
	level.save((err,doc) => {
		if(!err)
			res.redirect('level/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}


function updateRecord(req, res) {
	Level.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('level/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("level/add", {
					viewTitle: "Edit Level",
					level: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Level.find((err, docs) => {
		if(!err){
			res.render("level/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving employee list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Level.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("level/add", {
				viewTitle: "Edit Level",
				level: doc
			});
		}
	});
});


router.get('/delete/:id', (req, res) => {
	Level.findByIdAndRemove(req.params.id, (err, doc) => {
		if(!err){
			res.redirect('/level/list');
		}
		else{ console.log('Error in level delete :' +err);}
	});
});

module.exports = router;