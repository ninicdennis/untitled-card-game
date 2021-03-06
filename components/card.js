import {useDrag} from 'react-dnd'
import {Icon} from '@iconify/react';
import swordIcon from '../node_modules/@iconify-icons/mdi/sword'
import shieldIcon from '../node_modules/@iconify-icons/mdi/shield'

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
      cursor: 'move',
    }}>
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
          <div style = {{margin: 0, color: '#fff'}}> {c.name} </div>
          <div style = {{margin: 0, color: '#fff'}}> {c.value} </div>
        </div>
        <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
          <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Icon icon = {swordIcon} />
            {c.atk}
            </div>
          <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Icon icon = {shieldIcon} />
            {c.def}
            </div>
        </div>
        {/* <p style = {{margin: 0, color: '#fff'}}>Id: {c.id}</p> */}
      </div>
    </div>
  )
}
  

export default Card