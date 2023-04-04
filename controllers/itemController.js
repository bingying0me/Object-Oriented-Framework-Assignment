const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

router.get('/', (req, res) => {
	res.render("item/add", {
		viewTitle: "Create Item"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});


function insertRecord(req,res){
	var item = new Item();
	item.item_id = req.body.item_id;
	item.item_name = req.body.item_name;
	item.price = req.body.price;
	item.save((err,doc) => {
		if(!err)
			res.redirect('item/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

function updateRecord(req, res) {
	Item.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('item/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("item/add", {
					viewTitle: "Edit Item",
					item: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Item.find((err, docs) => {
		if(!err){
			res.render("item/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving item list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("item/add", {
				viewTitle: "Edit Item",
				item: doc
			});
		}
	});
});

router.get('/delete/:id', (req, res) => {
	Item.findByIdAndRemove(req.params.id, (err, doc) => {
		if(!err){
			res.redirect('/item/list');
		}
		else{ console.log('Error in item delete :' +err);}
	});
});

module.exports = router;