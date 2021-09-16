const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: String,
    life: Number,
    cards: [Number],
    token: String,
    cardPlayed: Number
});

const Player = mongoose.model('Player', schema);

module.exports = Player;