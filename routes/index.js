var formidable = require('formidable'),
	util = require('util'),
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	error = null,
	mime = require('mime');
var User = require('./../models/produtos')();

var cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dxmpntiki',
	api_key: '277797349887776',
	api_secret: 'YhqhTZvhxY9t1Y_QqlAcKilh4Hs'
});

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
				foto: user.foto,
				url : user.public_id
			})
		})
		res.json(response || '')
	})
});

router.get('/user/:id', function (req, res) {
	User.findOne({ _id: req.params.id}, function (err, user) {
		if (err) throw err;
		res.render('userDetails', {
			id: user._id,
			nome: user.nome,
			descricao: user.descricao,
			foto: user.foto,
			url : user.public_id
		})
	})
});

router.delete('/user/:id', function (req, res) {
	User.findOne({_id: req.params.id}, function(err, user){
		cloudinary.uploader.destroy(user.url, function (result) {
			if (err) throw err;
		})
	});

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
		//fs.readFile(img.path, function (err, data) {
			cloudinary.uploader.upload(img.path).then(function (result) {
				User.create({
					nome: fields.nome,
					descricao: fields.descricao,
					foto: result.url,
					url : result.public_id
				}, function (err, user) {
					console.log('foto', user);
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
		//});
	});

});

module.exports = router;
