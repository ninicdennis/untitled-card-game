import { useDrop } from 'react-dnd'
// import useStableCallback from '../stableCallbackHelper/useStableCallback';
import { useRef, useCallback} from 'react';

const ItemTypes = {
  CARD: 'card'
}


const SummonBoard = ({x,y,children, position, moves, playerType,ctx, cp, hand}) => {
  function useStableCallback(callback) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
  
    const stableCallback = useCallback((...args) => {
      return callbackRef.current(...args);
    }, []);
    return stableCallback;
  }
  
  let playerAction = parseInt(ctx.currentPlayer)
  const dropCb = useStableCallback((item, monitor) => {
    const card = hand[item.data.handPos]
    console.log(`Moved card: ${card.name} into position: ${position}`)
    moves.summonCard({c:card, handPos: item.data.handPos}, position)
  });

  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop:(item, monitor) => dropCb(item, monitor),
    collect: (monitor) => ({
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
export default SummonBoard

