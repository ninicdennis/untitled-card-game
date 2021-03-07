import { useDrop } from 'react-dnd'
// import useStableCallback from '../stableCallbackHelper/useStableCallback';
import { useRef, useCallback} from 'react';

const ItemTypes = {
  CARD: 'card'
}


const SummonBoard = ({x,y,children, position, moves, playerType,ctx, cp,}) => {
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
    console.log(item)
    let card = monitor.getItem().data
    console.log(card.c, item)
    console.log(`Moved card: ${card.c.name} into position: ${position}`)
    console.log('Whos field: ', playerType,'Current: ', playerAction)
    moves.summonCard(card, position)
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

