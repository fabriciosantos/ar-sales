module.exports = function () {
    var db = require('./../libs/connect_db')();
    var Schema = require('mongoose').Schema;

    var Produto = new Schema({
       nome : {type : String, required :true},
       descricao : {type : String},
       foto : {type : String },
       url : {type : String}
    });

    return db.model('Produtos', Produto);
}
