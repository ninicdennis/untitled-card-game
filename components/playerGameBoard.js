import Card from './cardInHand'
import SummonBoard from './summonBoard'
import CardInPlay from './cardInPlay'
import {useEffect, useState} from 'react'
import GraveModal from './graveyardModal'

const PlayerGameBoard = ({props}) => {
  const [cpModal, setCPModal] = useState(false)
  const [opModal, setOPModal] = useState(false)
  const p = parseInt(props.ctx.currentPlayer)
  const playerStage = props.ctx.activePlayers
  const connectedPlayer = parseInt(props.playerID) // Current players view.
  const otherPlayer = props.playerID === '0' ? 1: 0

  console.log('Connected Player: ', connectedPlayer)
  console.log('Other Player: ', otherPlayer)

  const handleDeckDraw = (e, currentPlayer, playerDeck) => {
    e.preventDefault();
    console.log(currentPlayer, playerDeck)
    if(currentPlayer == playerDeck) {
      props.moves.drawCard();
      props.moves.addMana();
      props.moves.unTap();
      props.events.setActivePlayers({currentPlayer: 'upkeep'})
    }
  }
  
  const setStage = (e, currentStage) => {
    e.preventDefault();
    console.log('Stage swap: ', currentStage)
    switch (currentStage) {
      case 'upkeep': 
        return props.events.setActivePlayers({currentPlayer: 'battle'});
      case 'battle':
        return props.events.setActivePlayers({currentPlayer: 'downkeep'});
      case 'downkeep':
        return props.events.endTurn(); 
      default:
        return null;
    }
  }

  const confirmAttack = (e, cardSelected, position, player) => {
    e.preventDefault();
    // Checking to make sure the correct player is pressing their own card, instead of the other way around.
    // Also checking if current card is tapped.
    console.log(player)
    if (player === parseInt(props.ctx.currentPlayer) && !cardSelected.tapped) return props.moves.confirmAttack(cardSelected, position);
    else return null;
  }

  return (
    <div className = 'flex flex-col justify-center items-center'>
        <div style = {{justifyContent: 'left', display: 'flex'}} >
          {/* Other Player Graveyard */}
        <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}}
          onClick = {e => setOPModal(true)}>
            Graveyard: {props.G[otherPlayer].grave.length}
        </div>
        {opModal && <GraveModal modal = {opModal} setModal={setOPModal} grave = {props.G[otherPlayer].grave}/>} 
        {/* Other Player Deck */}
        <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} 
          onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer, otherPlayer)}>
          Deck: {props.G[otherPlayer].deck.length}
        </div>
        {/* Other Player Hand */}
        <div style = {{display: 'flex', justifyContent: 'left'}}>
          {props.G[otherPlayer].hand && props.G[otherPlayer].hand.map((c, i) => {
            return (
              <Card key = {i} c = {c} handPos = {i} cp = {otherPlayer} ctx = {props.ctx}/>
            )
          })}
        </div>
      </div>
      <div>
        {/* Other Player Mana and HP */}
        <p>Mana: {props.G[otherPlayer].perTurnMana}/{props.G[otherPlayer].mana} HP: {props.G[otherPlayer].hp}</p> 
        <div style = {{display: 'flex'}}>
          {/* Other Players Summon Board */}
        {props.G[otherPlayer].board.map((board, i) => {
          if (board == null) {
            return <SummonBoard 
                          key = {i}  position = {i} moves = {props.moves}  
                          playerType = {otherPlayer}  ctx = {props.ctx}  cp = {props.ctx.currentPlayer}
                          hand = {props.G[props.ctx.currentPlayer].hand}/>
          } else {
            return <CardInPlay  key = {i} position = {i} c = {props.G[otherPlayer].board[i]} confirmAttack = {confirmAttack} player = {otherPlayer}/>
          }
        })
      }
      </div>
      </div>  
        {playerStage && playerStage[p] === 'upkeep' && <button onClick = {e => {setStage(e,playerStage[p])}}>Enter Battle Step</button>}
        {playerStage && playerStage[p] === 'battle' && <button onClick = {e => {setStage(e, playerStage[p])}}>Enter Downkeep</button>}
        {playerStage && playerStage[p] === 'downkeep' && <button onClick = {e => {setStage(e, playerStage[p])}}>Enter EndPhase</button>}
        {props.ctx.activePlayers && <div>Current Stage: {props.ctx.activePlayers[p]}</div>}
        {/* ============================================================================================================================= */}
      <div style = {{display: 'flex'}}>
        {props.G[connectedPlayer].board.map((board, i) => {
          if (board == null) {
            return <SummonBoard 
                          key = {i}  position = {i} moves = {props.moves}  
                          playerType = {connectedPlayer}  ctx = {props.ctx}  cp = {props.ctx.currentPlayer}
                          hand = {props.G[props.ctx.currentPlayer].hand}/>
          } else {
            return <CardInPlay  key = {i} position = {i} c = {props.G[connectedPlayer].board[i]} confirmAttack = {confirmAttack} player = {connectedPlayer}/>
          }
        })
      }
      </div>
        <div style = {{justifyContent: 'left', display: 'flex'}} >
          {/* Current Player Graveyard */}
        <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}}
          onClick = {e => setCPModal(true)}>
            Graveyard: {props.G[connectedPlayer].grave.length}
        </div>
        {cpModal && <GraveModal modal = {cpModal} setModal={setCPModal} grave = {props.G[connectedPlayer].grave}/>} 
        {/* Current Player Deck */}
        <div style = {{display: 'flex', width: 200, height: 300, backgroundColor: '#e3e3e3', margin: 10, alignItems: 'center', justifyContent: 'center'}} 
          onClick = {e => handleDeckDraw(e, props.ctx.currentPlayer,connectedPlayer)}>
          Deck: {props.G[connectedPlayer].deck.length}
        </div>
        {/* Current Player Hand */}
        <div style = {{display: 'flex', justifyContent: 'left'}}>
          {props.G[connectedPlayer].hand && props.G[connectedPlayer].hand.map((c, i) => {
            return (
              <Card key = {i} c = {c} handPos = {i} cp = {connectedPlayer} ctx = {props.ctx}/>
            )
          })}
        </div>
      </div>
      <div>
        {/* Current Player Mana and HP */}
        <p>Mana: {props.G[connectedPlayer].perTurnMana}/{props.G[connectedPlayer].mana} HP: {props.G[connectedPlayer].hp}</p> 
      </div>  
    </div>
  )
}

export default PlayerGameBoard;