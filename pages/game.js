import { Client } from 'boardgame.io/react';
import { useState, useEffect } from 'react';

import { GameParam } from '../components/gameParam';
import PlayerGameBoard from '../components/playerGameBoard';

const Board = (props) => {
  console.log(props);

  if (props.playerID === '0') {
    return (
      <div>
        Player: 0
        <PlayerGameBoard props={props} />
      </div>
    );
  } else if (props.playerID === '1') {
    return (
      <div>
        Player: 1
        <PlayerGameBoard props={props} />
      </div>
    );
  }
};

import { Local, SocketIO } from 'boardgame.io/multiplayer';

const Game = Client({
  game: GameParam,
  numPlayers: 2,
  board: Board,
  // multiplayer: SocketIO({server: 'localhost:8000'}),
  multiplayer: Local(),
});

const GameScreen = (props) => {
  const [player, setPlayer] = useState(null);
  if (player === null) {
    return (
      <div className="flex justify-evenly items-center w-full h-screen">
        <button
          className="border-2 p-5 hover:bg-gray-200"
          onClick={(e) => {
            setPlayer(0);
          }}
        >
          Player 0
        </button>
        <button
          className="border-2 p-5 hover:bg-gray-200"
          onClick={(e) => {
            setPlayer(1);
          }}
        >
          Player 1
        </button>
      </div>
    );
  } else if (player === 0) {
    return (
      <>
        <Game playerID="0" />
        {/* Uncomment if you want to use local, just adds the second screen there. */}
        <Game playerID="1" />
      </>
    );
  } else if (player === 1) {
    return <Game playerID="1" />;
  }
};

export default GameScreen;
