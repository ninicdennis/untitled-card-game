import CardComponent from './cardComponent'
import {useDrag} from 'react-dnd'

const ItemTypes = {
  CARD: 'card'
}

const Card = ({c, handPos, cp, ctx}) => { 
  const [{isDragging}, drag] = useDrag(() => ({
    item: {
      type: ItemTypes.CARD,
      data: {c, handPos}
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [])

  return (
    <div
    ref={cp == ctx.currentPlayer ? drag : null}
    style={{
      cursor: 'move',
    }}>
      <CardComponent c={c} handPos = {handPos} cp = {cp} ctx = {ctx}/>
    </div>
  )
}
  

export default Card