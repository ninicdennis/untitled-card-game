import { INVALID_MOVE } from 'boardgame.io/core';

const drawCard = (G, ctx) => {
  console.log('player: ', ctx.currentPlayer)
  if(G[ctx.currentPlayer].deck.length !== 0) {
    const drawNum = Math.floor(Math.random() * G[ctx.currentPlayer].deck.length)
    let card = G[ctx.currentPlayer].deck[drawNum];
    console.log('Card: ', card.name, drawNum)
    G[ctx.currentPlayer].hand.push(card) // Add card to hand.
    G[ctx.currentPlayer].deck.splice(drawNum, 1); // Remove from deck.
  } else {
    // This would be the case if you are out of cards.
    return INVALID_MOVE;
  }
}

const summonCard = (G, ctx, card, position) => {
  console.log(G[ctx.currentPlayer].perTurnMana)
  if(G[ctx.currentPlayer].perTurnMana < card.c.value) {
    return INVALID_MOVE
  } else {
    console.log('Summoning: ', card, position)
    G[ctx.currentPlayer].perTurnMana -= 1
    G[ctx.currentPlayer].hand.splice(card.handPos, 1);
    G[ctx.currentPlayer].board[position] = card.c;
  }

}
const addMana = (G, ctx) => {
  G[ctx.currentPlayer].mana + 1 <= 10 ? G[ctx.currentPlayer].mana += 1 : null; // Adds +1 to mana counter
  G[ctx.currentPlayer].perTurnMana = G[ctx.currentPlayer].mana;
}

const addHp = (G, ctx, amount) => {
  if (amount === null || amount === undefined || typeof amount != 'number' || amount.length === 0) {
    return INVALID_MOVE
  } else G[ctx.currentPlayer].hp += amount;
}

const removeHp = (G, ctx, amount) => {
  if (amount === null || amount === undefined || typeof amount != 'number' || amount.length === 0) {
    return INVALID_MOVE
  } else G[ctx.currentPlayer].hp -= amount;
  // Win condition should sit here, this should be the final step after calculation to determine who won.
  // Or so I think. I don't know YET.
}

const cardSet = [
  {
    id: 0,                // Id for card.
    name: 'Default Card', // Display Name.
    value: 1,             // Mana value for summon.
    atk: 1,               // Cards attack value.
    def: 1,               // Cards defense value.
    effect: 'Nothing.'    // Effects (WIP, probably will be object).
  },
  {
    id: 1,
    name: 'Another card?',
    value: 2,
    atk: 1,
    def: 1,
    effect: 'Nothing.'
  },
  {
    id: 1,
    name: 'Another card?',
    value: 2,
    atk: 1,
    def: 1,
    effect: 'Nothing.'
  }
]
const GameParam = {
  setup: () => ({
    [0]: {
      hp: 20,
      mana: 0, // Max 10,
      perTurnMana: 0,
      deck: cardSet,
      hand: [],
      board: [null,null,null,null,null,]
    },
    [1]: {
      hp: 20,
      mana: 0,
      perTurnMana: 0,
      deck: cardSet,
      hand: [],
      board: [null,null,null,null,null,]
    }
  }),
  turn: { // Stages must be set thru a useEffect checking who the active player is. A stipulation since phases get removed after they end.
    stages: {
      draw: {
        moves: {drawCard, addMana},
        next: 'upkeep' // Next effect moves on to the next described one . 
      },
      upkeep: {
        moves: {summonCard, addHp, removeHp}
      },
      battle: {
        moves: {addHp, removeHp}
      },
      downkeep : {
        moves: {summonCard, addHp, removeHp}
      },
      end : {
        moves: {}
      }
    }
  }
  // moves : {
  //   drawCard,
  //   summonCard,
  //   addMana,
  //   addHp,
  //   removeHp,
  // }
}

export default GameParam