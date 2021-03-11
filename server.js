const {Server} = require('boardgame.io/server');
const {GameParam} = require('./components/gameParam');
const admin = require('firebase-admin');
const { Firestore } = require('bgio-firebase');

const db = new Firestore({
  config: {
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://untitled-card-game.firebaseio.com',
  }
})
const server = Server({
  games: [GameParam],
  db
})

server.run(8000);