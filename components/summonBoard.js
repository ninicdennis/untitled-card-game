import { useDrop } from 'react-dnd';
// import useStableCallback from '../stableCallbackHelper/useStableCallback';
import { useRef, useCallback } from 'react';

const ItemTypes = {
  CARD: 'card',
};

const SummonBoard = ({
  x,
  y,
  children,
  position,
  moves,
  playerType,
  ctx,
  cp,
  hand,
}) => {
  const useStableCallback = (callback) => {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const stableCallback = useCallback((...args) => {
      return callbackRef.current(...args);
    }, []);
    return stableCallback;
  };

  let playerAction = parseInt(ctx.currentPlayer);
  const dropCb = useStableCallback((item, monitor) => {
    const card = hand[item.data.handPos];
    console.log(`Moved card: ${card.name} into position: ${position}`);
    moves.summonCard({ c: card, handPos: item.data.handPos }, position);
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item, monitor) => dropCb(item, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y],
  );

  return (
    <div
      ref={playerType === playerAction ? drop : null}
      className="m-2 border-4 rounded-md border-double border-gray-400"
      style={{ width: 200, height: 210 }}
    >
      {children}
      {isOver && playerType === parseInt(cp) && (
        <div
          className="z-0 opacity-50 bg-yellow-100"
          style={{
            height: 210,
            width: 200,
          }}
        />
      )}
    </div>
  );
};
export default SummonBoard;
