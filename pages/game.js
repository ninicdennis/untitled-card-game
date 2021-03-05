import {Client} from 'boardgame.io/react'
import {useState, useEffect} from 'react'
import GameParam from '../components/gameParam'
import Card from '../components/card'
import SummonBoard from '../components/summonBoard'
import CardInPlay from '../components/cardInPlay'
const Board = (props) => {

  const handleDeckDraw = (e, currentPlayer, playerDeck) => {
    e.preventDefault();
    if(currentPlayer == playerDeck) return props.moves.drawCard();
  }

  return (
    <div>
       {/* Deck Draw */}
       {/* Player 1 deck */}
       <div style = {{display: 'flex', justifyContent: 'left'}}>
       <div style = {{display: 'flex', justifyContent: 'left'}}>
          <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}}
           onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer,0)}>
            Deck: {props.G[0].deck.length}
          </div>
        </div>
      {/* Player Hand */}
      {/* Player 1 hand */}
      <div style = {{display: 'flex', justifyContent: 'left'}}>
        {props.G[0].hand && props.G[0].hand.map((c, i) => {
          return (
            <Card key = {i} c = {c} handPos = {i} cp = {0} ctx = {props.ctx}/>
          )
        })}
      </div>
      </div>
      {/* Board Render */}
      {/* Player 1 board */}
      <div style = {{display: 'flex'}}>
        {props.G[0].board.map((board, i) => {
          if (board == null) {
            return <SummonBoard 
                          key = {i}  position = {i} moves = {props.moves}  
                          playerType = {0}  ctx = {props.ctx}  cp = {props.ctx.currentPlayer}/>
          } else {
            return <CardInPlay  key = {i} c = {props.G[0].board[i]} />
          }
        })
      }
      </div>
      {/* Might find a way to fix this split for each board, I think this looks stupid. */}
      {/* REMINDER: You have to define the specific players number in these sections in order for it to work. */}
      {/* ======================================================================================================================================================= */}
     {/* Board Render */}
      {/* Player 2 board */}
      <div style = {{display: 'flex'}}>
        {props.G[1].board.map((board, i) => {
          if (board == null) {
            return <SummonBoard  
                          key = {i} position = {i} moves = {props.moves} 
                          playerType = {1}  ctx = {props.ctx} cp = {props.ctx.currentPlayer}/>
          } else {
            return <CardInPlay  key = {i} c = {props.G[1].board[i]} />
          }
        })
      }
      </div>
       {/* Deck Draw */}
       {/* Player 2 deck */}
       <div style = {{display: 'flex', justifyContent: 'left'}}>
       <div style = {{display: 'flex', justifyContent: 'left'}}>
          <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} 
          onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer,1)}>
            Deck: {props.G[1].deck.length}
          </div>
        </div>
      {/* Player Hand */}
      {/* Player 1 hand */}
      <div style = {{display: 'flex', justifyContent: 'left'}}>
        {props.G[1].hand && props.G[1].hand.map((c, i) => {
          return (
            <Card key = {i} c = {c} handPos = {i} cp = {1} ctx = {props.ctx}/>
          )
        })}
      </div>
      </div>
 
    </div>
  )
}

const Game = Client({
  game: GameParam,
  board: Board
})

export default Game