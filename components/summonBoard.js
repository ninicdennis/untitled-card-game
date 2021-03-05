import { useDrop } from 'react-dnd'

const ItemTypes = {
  CARD: 'card'
}
const SummonBoard = ({x,y,children, position, moves, playerType,ctx, cp}) => {
  let playerAction = parseInt(ctx.currentPlayer)
  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) =>{ 
      let card = monitor.getItem().data
      console.log(`Moved card: ${card.c.name} into position: ${position}`)
      console.log('Whos field: ', playerType,'Current: ', playerAction)
      // Costs and calculation would happen here.
      moves.summonCard(card, position)
      return item
    },
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