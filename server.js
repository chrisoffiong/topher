let express = require("express");
let app = express();
let server = require('http').Server(app)
var path = require('path');


app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
var io = require('socket.io').listen(server);

var players = {};


io.on('connection', function (socket) {
  console.log('a user connected');
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
  socket.on('Bombset', function (bombData) {
    players[socket.id].x = bombData.x;
    players[socket.id].y = bombData.y;
    // emit a message to all players about the player that set a bomb
    socket.broadcast.emit('Bomb', players[socket.id]);
  });
});
var port = process.env.PORT || 8080
server.listen(port, function () {
  console.log('Listening on 8080 port')
})