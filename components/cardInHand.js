import CardComponent from './cardComponent';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
};

const Card = ({ c, handPos, cp, ctx, playerStage, playerMana }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      item: {
        type: ItemTypes.CARD,
        data: { c, handPos },
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  );
  let playableCard =
    playerStage === 'upkeep' && playerMana >= c.value ? true : false;
  return (
    <div ref={cp == ctx.currentPlayer ? drag : null} className="cursor-move">
      <CardComponent
        c={c}
        handPos={handPos}
        cp={cp}
        ctx={ctx}
        playable={playableCard}
      />
    </div>
  );
};

export default Card;
