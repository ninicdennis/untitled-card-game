import { INVALID_MOVE, TurnOrder } from 'boardgame.io/core';

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
  if(G[ctx.currentPlayer].perTurnMana < card.c.value) {
    return INVALID_MOVE
  } else {
    console.log('Summoning: ', card, position)
    G[ctx.currentPlayer].perTurnMana -= card.c.value
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

const unTap = (G, ctx) => {
  G[ctx.currentPlayer].board.map((c, i) => {
    if(c !== null) {
      G[ctx.currentPlayer].board[i].tapped = false;
      G[ctx.currentPlayer].board[i].def = G[ctx.currentPlayer].board[i].defaultDef;
    }
  })
}

const confirmAttack = (G, ctx, cardSelected, position) => {
  console.log('This card: ', cardSelected, 'Position: ', position);
  const otherPosition = ctx.currentPlayer === '0' ? '1' : '0';
  if (G[otherPosition].board[position] !== null) {
    const attacker = G[ctx.currentPlayer].board[position];
    const defender = G[otherPosition].board[position];
    console.log('Attacking: ', attacker.name, 'Defender: ' , defender.name) // NOTE, this will show you Proxy {<target>, {handler}}, but you can still adjust values from here.
    // card v card!
    const attackSub = defender.def - attacker.atk; // attacker - defender hp 
    const defenderSub = attacker.def - defender.atk; // defender - attacker hp
    console.log('ATK: ', attackSub, 'Def: ', defenderSub)
    if(attackSub <= 0 && defenderSub <= 0) {
      console.log('both die!')
      const atkCardToGrave = G[ctx.currentPlayer].board[position];
      const defCardToGrave = G[otherPosition].board[position];
      G[ctx.currentPlayer].board[position] = null;
      G[otherPosition].board[position] = null;
      G[ctx.currentPlayer].grave.push(atkCardToGrave);
      G[otherPosition].grave.push(defCardToGrave);
    } else if (attackSub <= 0 && defenderSub > 0 ) {
      console.log('Defender dies, attacker lives.')
      const defCardToGrave = G[otherPosition].board[position];
      G[otherPosition].board[position] = null;
      G[otherPosition].grave.push(defCardToGrave);
      G[ctx.currentPlayer].board[position].def = defenderSub; // Resets after untap
    } else if (attackSub > 0 && defenderSub <= 0) {
      console.log('Attacker dies, defender lives.')
      const atkCardToGrave = G[ctx.currentPlayer].board[position];
      G[ctx.currentPlayer].board[position] = null;
      G[ctx.currentPlayer].grave.push(atkCardToGrave);
      G[otherPosition].board[position].def = attackSub; // resets after untap
    } else if (attackSub > 0 && defenderSub > 0 ) {
      console.log('No one dies!')
      G[ctx.currentPlayer].board[position].def = defenderSub; // Resets after untap
      G[otherPosition].board[position].def = attackSub; // resets after untap
    }
    attacker.tapped = true;
  } else {
    const attacker = G[ctx.currentPlayer].board[position];
    console.log('Attacking: ', attacker.name, 'Directly!')
    // Should be pretty easy, just subtract.
    G[otherPosition].hp -= attacker.atk; 
    attacker.tapped = true;
  }
}

const cardSet = [
  {
    id: 0,                // Id for card.
    name: 'Default Card', // Display Name.
    value: 1,             // Mana value for summon.
    atk: 1,               // Cards attack value.
    def: 1,               // Cards defense value.
    defaultAtk: 1,        // Cards default akt value, restores after turn.
    defaultDef: 1,        // Cards devault def value, restores after turn.
    tapped: false,        // A card that has attacked already. 
    effect: 'Nothing.'    // Effects (WIP, probably will be object).
  },
  {
    id: 1,
    name: 'Another card?',
    value: 2,
    atk: 2,
    def: 1,
    defaultAtk: 2,
    defaultDef: 1,
    tapped: false,
    effect: 'Nothing.'
  },
  {
    id: 1,
    name: 'Wow a third card!',
    value: 2,
    atk: 1,
    def: 2,
    defaultAtk: 1,
    defaultDef: 2,
    tapped: false,
    effect: 'Nothing.'
  }
]
export const GameParam = {
  setup: () => (
    {
    [0]: {
      hp: 20,
      mana: 2, // Max 10,
      perTurnMana: 0,
      deck: cardSet,
      hand: [],
      grave: [],
      board: [null,null,null,null,null,]
    },
    [1]: {
      hp: 20,
      mana: 0,
      perTurnMana: 0,
      deck: cardSet,
      hand: [],
      grave: [],
      board: [null,null,null,null,null,]
    }
  }
  ),
  isActive: true,
  turn: { // Stages must be set thru a useEffect checking who the active player is. A stipulation since phases get removed after they end.
    order: TurnOrder.DEFAULT,
    onBegin: (G, ctx) => {
      ctx.events.setActivePlayers({currentPlayer: 'draw'}) // Fixes reset bug where the activeplayer stage doesn't work with the reset key.
    },
    stages: {
      draw: {
        moves: {drawCard, addMana, unTap}, // Pass desired moves here .
        next: 'upkeep' // Next effect moves on to the next described one . 
      },
      upkeep: {
        moves: {summonCard, addHp, removeHp}
      },
      battle: {
        moves: {addHp, removeHp, confirmAttack}
      },
      downkeep : {
        moves: {summonCard, addHp, removeHp}
      },
      end : {
        moves: {}
      }
    }
  },
  disableUndo: true,
}
