// file: models/user.js 
function userHandler() {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var schema = null;

  schema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    foto: { type: Buffer }
  });

  return mongoose.model('User', schema);
}
module.exports = exports = userHandler();
