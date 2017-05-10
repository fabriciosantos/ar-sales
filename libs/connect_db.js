var mongoose = require('mongoose');
var db;

module.exports = function () {
    if(!db){
        db = mongoose.connect('mongodb://arsales:arsales@ds131041.mlab.com:31041/arsales', function(err, db) {
            return db;
        });
    }
    console.log('Conectou no db');
            
    return db;
}