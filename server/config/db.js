const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://umamahesh:maheshmongodb123@cluster0.ouvzfui.mongodb.net/cosmofeed")

module.exports = {connection};