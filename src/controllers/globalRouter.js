const { render } = require('ejs');
const express = require('express');
const models = require('../mongo');

const globalRouter = () => {
	const router = express.Router();

	router.get('/', (req, res) => {
		return res.status(200).render('index');
	})

	router.post('/crearsala', async (req, res) => {
		let player1 = new models.player({
			name: "cristian",
			life: 100,
			cards: [1,2,3],
			token: "150382",
			cardPlayed: 0
		})
		let player2 = new models.player({
			name: "martin",
			life: 100,
			cards: [2,1,4],
			token: "1503822",
			cardPlayed: 0
		})

		let savedPlayer1 = await player1.save();
		let savedPlayer2 = await player2.save();

		let newTablero = new models.tablero({
			player1: savedPlayer1._id,
			player2: savedPlayer2._id,
			simbolo: "+",
			codigo: req.body.codigo
		});
		return newTablero.save().then((result) => {
			res.cookie('player', player1._id);
			res.status(200).render('index', result)
		})
	})

	router.post('/unirseSala', async (req, res) => {
		console.log("hola")
		let tablero = await models.tablero.findOne({codigo: req.body.codigo}).populate('player2');
		res.cookie('player', tablero.player2._id);
		return res.redirect(200, `/sala/${tablero.codigo}`)
	})

	router.get('/sala/:codigo', async (req, res) => {
		if (!req.cookies.player) {
			res.redirect( '/');
		}

		let tablero = await models.tablero.findOne({codigo: req.params.codigo}).populate('player1').populate('player2');

		if (req.cookies.player == tablero.player1._id) {
			console.log("hola")
		}

		models.tablero.findOne({codigo: req.params.codigo}).populate('player1').populate('player2').then((tablero) => {
			res.status(200).render('tablero', {tablero});
		}).catch(err => {
			res.status(500).send({ error: err })
			console.log(err)
		})
	})

	router.post('/playCard/:card', (req, res) => {
		console.log(req.cookies.player)
		return models.player.findByIdAndUpdate(req.cookies.player, {cardPlayed: req.params.card}).then((data) =>{
			console.log(data);
			res.status(200);
		})
		
	})

	return router;
}

module.exports = {
	globalRouter
}