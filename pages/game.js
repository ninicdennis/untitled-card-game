import {Client} from 'boardgame.io/react'
import {useState, useEffect} from 'react'

import {GameParam} from '../components/gameParam'
import PlayerGameBoard from '../components/playerGameBoard'

const Board = (props) => {
  console.log(props)

  if(props.playerID === '0') {
    return (
      <div>
        Player: 0
        <PlayerGameBoard props = {props} />
      </div>
    )
  } else if (props.playerID === '1') {
    return (
      <div>
        Player: 1
        <PlayerGameBoard props = {props} />
      </div>
    )
  }
}

import {Local, SocketIO} from 'boardgame.io/multiplayer';

const Game = Client({
  game: GameParam,
  numPlayers: 2,
  board: Board,
  multiplayer: SocketIO({server: 'localhost:8000'}),
  // multiplayer: Local()
})

const GameScreen = (props) => {
  const [player, setPlayer] = useState(null);
  if(player === null) {
    return (
      <div>
        <button onClick = { e => {setPlayer(0)}}>P0</button>
        <button onClick = { e => {setPlayer(1)}}>P1</button>
      </div>
    )
  } else if (player === 0) {
    return (
      <Game playerID = '0' />
    )
  } else if (player === 1) {
    return (
      <Game playerID = '1' />
    )
  }
}

export default GameScreen