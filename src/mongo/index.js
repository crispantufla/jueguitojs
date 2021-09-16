const mongoose = require('mongoose');
const Tablero = require('./schemas/Tablero');
const Player = require('./schemas/Player');

const connect = async () => {
    console.log("try to connect")
    await mongoose.connect('mongodb+srv://admin:vA3WC3XFAs8nMWQPcw3PD@cluster0.9lknw.mongodb.net/tablero?retryWrites=true&w=majority', { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true })
    console.log("db connect")
}

module.exports = {
	tablero: Tablero,
    player: Player,
	connect: connect,
}