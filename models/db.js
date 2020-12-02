const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/BookDB', {
    useNewUrlParser: true
},
err => {
    if (!err){
        console.log('connection succeeded')
    } else {
        console.log('error in connection'+err)
    }
})

require('./book.model')