module.exports = function () {
    var db = require('./../libs/connect_db')();
    var Schema = require('mongoose').Schema;

    var Produto = new Schema({
       nome : {type : String, required :true},
       descricao : {type : String},
       foto : {type : Buffer }
    });

    return db.model('Produtos', Produto);
}
