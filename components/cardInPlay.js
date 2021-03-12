import CardComponent from './cardComponent';

const CardInPlay = ({ position, c, confirmAttack, player, playerPhase }) => {
  const attackable = playerPhase === 'battle' && !c.tapped ? true : false;
  return (
    <div onClick={(e) => confirmAttack(e, c, position, player)}>
      <CardComponent c={c} attackable={attackable} />
    </div>
  );
};

export default CardInPlay;
