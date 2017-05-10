module.exports = function () {
    var db = require('./../libs/connect_db')();
    var Schema = require('mongoose').Schema;

    var Produto = new Schema({
       name : {type : String, required :true},
    foto : {type : Buffer }
    });

    return db.model('Produtos', Produto);
}