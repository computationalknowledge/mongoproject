const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model("Book");

router.get('/', (req, res) => {
    res.render('book/addOrEdit', {
        viewTitle: 'Insert Book'
    });
});

router.post('/', (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

function insertRecord(req, res){
    var book = new Book()
    book.bookName = req.body.bookName;
    book.author = req.body.author;
    book.year = req.body.year;
    book.language = req.body.language;
    book.save((err, doc) => {
        if (!err) {
            res.redirect('book/list')
        } else {
            console.log("error " + err)
        }
    });
};

function updateRecord(req, res) {
    Book.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('book/list');
        } else {
            console.log('error: '+ err);
        }
   });
}

router.get('/list', (req, res) => {
    Book.find((err, docs) => {
        if(!err){
            res.render('book/list', {
                list: docs,
            })
        } else {
            console.log('error: ' +err)
        }
    })
})

router.get('/:id', (req,res) => {
    Book.findById(req.params.id, (err, doc) => {
        if (!err){
            res.render("book/addOrEdit", {
                viewTitle: "Update Book",
                book: doc,
            });
            console.log(doc);
        }
    });
});

router.get('/delete/:id', (req,res) => {
    Book.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err){
            res.render("book/list");
        } else {
            console.log("error " +err);
        }
    });
});

module.exports = router;