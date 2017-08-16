var formidable = require('formidable'),
	util = require('util'),
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	error = null;
var User = require('./../models/produtos')();


/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'AR-Sales' })
});

router.get('/user', function (req, res) {
	var response = []
	User.find({}, function (err, users) {
		users.forEach(function (user) {
			response.push({
				id: user._id,
				nome: user.nome,
				descricao: user.descricao,
				foto: 'data:image/jpeg;base64,' + user.foto.toString('base64')
			})
		})
		res.json(response || '')
	})
})

router.get('/testejpg', function (req, res) {
	var response = ''
	User.find({}, function (err, users) {
		users.forEach(function (user) {
			response= user.foto;
			
		})
		res.setHeader("Content-Type": 'image/jpeg'));
		res.send(response || '')
	})
})

router.get('/teste', function (req, res) {
	var response = ''
	User.find({}, function (err, users) {
		users.forEach(function (user) {
			response= user.foto;
			
		})		
		res.contentType(response);
		res.send(response || '')
	})
})

router.get('/user/:id', function (req, res) {
	User.findOne({ _id: req.params.id }, function (err, user) {
		if (err) throw err;
		res.render('userDetails', {
			id: user._id,
			nome: user.nome,
			descricao: user.descricao,
			foto: 'data:image/jpeg;base64,' + user.foto.toString('base64')
		})
	})
})
router.delete('/user/:id', function (req, res) {
	User.remove({ _id: req.params.id }, function (err, result) {

		if (err) {
			res
				.status(500).send({ error: err });
		}
		else {
			res
				.status(200)
				.send('deletado')
		}

	})
});

router.get('/dashboard', function (req, res) {
	res.render('dashboard');
});

router.get('/createUser', function (req, res) {
	res.render('createUser', { error: error });
});

router.post('/user', function (req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		var img = files.foto;

		fs.readFile(img.path, function (err, data) {
			User.create({
				nome: fields.nome,
				descricao: fields.descricao,
				foto: data
			}, function (err, user) {
				if (err) {
					error = err;
					res.redirect('/#createUser');
				}
				if (user) {
					error = null;
					res.redirect('/#dashboard');
				}
			});

		});
	});

});

module.exports = router;
