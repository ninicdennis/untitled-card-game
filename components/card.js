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
  // Not required anymore since I made the connection from drag to drop :)
  // isDragging ? cardInMovement = {c, handPos} : cardInMovement = {}
  return (
    <div
    ref={cp == ctx.currentPlayer ? drag : null}
    style={{
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}>
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10}}>
        <p style = {{margin: 0, color: '#fff'}}>Name: {c.name} </p>
        <p style = {{margin: 0, color: '#fff'}}>Cost: {c.value} </p>
        <p style = {{margin: 0, color: '#fff'}}>Id: {c.id}</p>
      </div>
    </div>
  )
}
  

export default Card