const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
	simbolo: String,
	player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
	codigo: String
});

const Tablero = mongoose.model('Tablero', schema);

module.exports = Tablero;