import CardComponent from './cardComponent';

const CardInPlay = ({
  position,
  c,
  confirmAttack,
  player,
  playerPhase,
  bolsterCard,
  canUseEffect,
}) => {
  const attackable = playerPhase === 'battle' && !c.tapped ? true : false;
  const useCardEffect = (e, c, position, player) => {
    if (canUseEffect) {
      // Passed prop to make sure the other player can't just randomly select a card.
      c.effect.map((effector) => {
        switch (effector) {
          case 'bolster':
            bolsterCard(e, c, position, player);
            break;
          default:
            break;
        }
      });
    }
  };
  return (
    <div
      onClick={(e) =>
        playerPhase === 'battle'
          ? confirmAttack(e, c, position, player)
          : useCardEffect(e, c, position, player)
      }
    >
      <CardComponent c={c} attackable={attackable} />
    </div>
  );
};

export default CardInPlay;
