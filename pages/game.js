import {Client} from 'boardgame.io/react'
import { INVALID_MOVE } from 'boardgame.io/core';
import {useState, useEffect} from 'react'
import {useDrag} from 'react-dnd'
import { useDrop } from 'react-dnd'
import GameParam from '../components/gameParam'
let cardInMovement = {}
const ItemTypes = {
  CARD: 'card'
}

const Card = ({c, handPos, cp, ctx}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    item: {type: ItemTypes.CARD},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [])
  isDragging ? cardInMovement = {c, handPos} : cardInMovement = {}
  return (
    <div
    ref={cp == ctx.currentPlayer ? drag : null}
    style={{
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}>
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10}}>
        <p style = {{margin: 0, color: '#fff'}}>Name: {c.name} </p>
        <p style = {{margin: 0, color: '#fff'}}>Cost: {c.value} </p>
        <p style = {{margin: 0, color: '#fff'}}>Id: {c.id}</p>
      </div>
    </div>
  )
}

const SummonBoard = ({x,y,children, position, moves, playerType,ctx, cp}) => {
  let playerAction = parseInt(ctx.currentPlayer)
  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () =>{ 
      console.log(`Moved card: ${cardInMovement.c.name} into position: ${position}`)
      console.log('Whos field: ', playerType,'Current: ', playerAction)
      // Costs and calculation would happen here.
      moves.summonCard(cardInMovement, position)
      
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x,y])
        return (
          <div ref = {playerType === playerAction ? drop : null} style = {{width: 200, height: 300, margin: 10, border: '1px solid black'}} >
            {children}
            {isOver && playerType === parseInt(cp) && (
            <div
              style={{
                height: 300,
                width: 200,
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: 'yellow',
              }}
            />
           )}
          </div>
        )
      }

const CardInPlay = ({c}) => {
  return (
    <div>
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10}}>
        <p style = {{margin: 0, color: '#fff'}}>Name: {c.name} </p>
        <p style = {{margin: 0, color: '#fff'}}>Cost: {c.value} </p>
        <p style = {{margin: 0, color: '#fff'}}>Id: {c.id}</p>
      </div>
    </div>
  )
}

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
          <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer,0)}>
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
            return <SummonBoard key = {i}  position = {i} moves = {props.moves}  playerType = {0}  ctx = {props.ctx}  cp = {props.ctx.currentPlayer}/>
          } else {
            return <CardInPlay  key = {i} c = {props.G[0].board[i]} />
          }
        })
      }
      </div>
     {/* Board Render */}
      {/* Player 2 board */}
      <div style = {{display: 'flex'}}>
        {props.G[1].board.map((board, i) => {
          if (board == null) {
            return <SummonBoard  key = {i} position = {i} moves = {props.moves} playerType = {1}  ctx = {props.ctx} cp = {props.ctx.currentPlayer}/>
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
          <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer,1)}>
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