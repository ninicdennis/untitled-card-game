import {Client} from 'boardgame.io/react'
import { INVALID_MOVE } from 'boardgame.io/core';
import {useState, useEffect} from 'react'
import {useDrag} from 'react-dnd'
import { useDrop } from 'react-dnd'

const GameParam = {
  setup: () => ({
    deck: [{name: 'test', value: 1, id: 0},{name: 'tester', value: 1, id: 1},{name: 'testing', value: 1, id: 2}],
    hand: [],
    board: [null,null,null,null,null,]
  }),
  moves : {
    drawCard: (G, ctx) => {
      if(G.deck.length !== 0) {
        const drawNum = Math.floor(Math.random() * G.deck.length)
        let card = G.deck[drawNum];
        console.log('Card: ', card.name, drawNum)
        G.hand.push(card) // Add card to hand.
        G.deck.splice(drawNum, 1); // Remove from deck.
      } else {
        // This would be the case if you are out of cards.
        return INVALID_MOVE;
      }
    },
    summonCard: (G, ctx, card, position) => {
        console.log('Summoning: ', card, position)
        G.hand.splice(card.handPos, 1);
        G.board[position] = card.c;
    }
  }
}
const ItemTypes = {
  CARD: 'card'
}

let cardInMovement = {}

const Card = ({c, handPos}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    item: {type: ItemTypes.CARD},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [])
  isDragging ? cardInMovement = {c, handPos} : cardInMovement = {}
  return (
    <div
    ref={drag}
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

const SummonBoard = ({x,y,children, position, moves, key}) => {
  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: () =>{ 
      console.log(`Moved card: ${cardInMovement.c.name} into position: ${position}`)
      // Costs and calculation would happen here.
      moves.summonCard(cardInMovement, position)
      
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [x,y])
        return (
          <div ref = {drop} style = {{width: 200, height: 300, margin: 10, border: '1px solid black'}} >
            {children}
            {isOver && (
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
  console.log(c)
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
  console.log(props.moves)

  const handleDeckDraw = (e) => {
    e.preventDefault();
    return props.moves.drawCard();
  }

  return (
    <div>
       {/* Deck to draw from */}
       <div style = {{display: 'flex', justifyContent: 'left'}}>
       <div style = {{display: 'flex', justifyContent: 'left'}}>
          <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} onClick = {e => handleDeckDraw(e)}>
            Deck: {props.G.deck.length}
          </div>
        </div>
      {/* Current Player Hand */}
      <div style = {{display: 'flex', justifyContent: 'left'}}>
        {props.G.hand && props.G.hand.map((c, i) => {
          return (
            <Card key = {i} c = {c} handPos = {i} />
          )
        })}
      </div>
      </div>
      {/* Board Render */}
      <div style = {{display: 'flex'}}>
        {props.G.board.map((board, i) => {
          console.log(board)
          if (board == null) {
            return <SummonBoard position = {i} moves = {props.moves}/>
          } else {
            return <CardInPlay c = {props.G.board[i]} />
          }
        })
      }
      </div>
    </div>
  )
}

const Game = Client({
  game: GameParam,
  board: Board
})

export default Game