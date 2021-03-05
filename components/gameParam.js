import { INVALID_MOVE } from 'boardgame.io/core';

const GameParam = {
  setup: () => ({
    [0]: {
      deck: [{name: 'test', value: 1, id: 0},{name: 'tester', value: 1, id: 1},{name: 'testing', value: 1, id: 2}],
      hand: [],
      board: [null,null,null,null,null,]
    },
    [1]: {
      deck: [{name: 'test', value: 1, id: 0},{name: 'tester', value: 1, id: 1},{name: 'testing', value: 1, id: 2}],
      hand: [],
      board: [null,null,null,null,null,]
    }
  }),
  // Turns have to be created, cant find a solution to automate an entire player stage. 
  // turn: {
  //   stages: {
  //     draw: {
  //       moves: {
  //         drawCard: (G, ctx) => {
  //         console.log('player: ', ctx.currentPlayer)
  //         if(G[ctx.currentPlayer].deck.length !== 0) {
  //           const drawNum = Math.floor(Math.random() * G[ctx.currentPlayer].deck.length)
  //           let card = G[ctx.currentPlayer].deck[drawNum];
  //           console.log('Card: ', card.name, drawNum)
  //           G[ctx.currentPlayer].hand.push(card) // Add card to hand.
  //           G[ctx.currentPlayer].deck.splice(drawNum, 1); // Remove from deck.
  //         } else {
  //           // This would be the case if you are out of cards.
  //           return INVALID_MOVE;
  //         }
  //       },}
  //     }
  //   }
  // },
  moves : {
    drawCard: (G, ctx) => {
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
    },
    summonCard: (G, ctx, card, position) => {
        console.log('Summoning: ', card, position)
        G[ctx.currentPlayer].hand.splice(card.handPos, 1);
        G[ctx.currentPlayer].board[position] = card.c;
    }
  }
}

export default GameParam