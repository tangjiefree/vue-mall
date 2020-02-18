const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allData = new Schema({
    data: Object
})

mongoose.model('alldata', allData);