import {Icon} from '@iconify/react';
import swordIcon from '@iconify-icons/mdi/sword'
import shieldIcon from '@iconify-icons/mdi/shield'
import hexagon from '@iconify-icons/mdi/hexagon-slice-3'

const CardInPlay = ({c}) => {
  return (
    <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
    <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
      <div style = {{margin: 0, color: '#fff'}}> {c.name} </div>
      <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
      <Icon icon = {hexagon} />
      {c.value} 
      </div>
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
  )
}

export default CardInPlay