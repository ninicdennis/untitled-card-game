import {Icon} from '@iconify/react';
import swordIcon from '../node_modules/@iconify-icons/mdi/sword'
import shieldIcon from '../node_modules/@iconify-icons/mdi/shield'
import hexagon from '../node_modules/@iconify-icons/mdi/hexagon-slice-3'


const CardComponent = ({c}) => { 
  return (
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
          <div style = {{margin: 0, color: '#fff'}}>{c.name} </div>
          <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Icon icon = {hexagon} />
             {c.value}
         </div>
        </div>
        {/* {parseInt(cp) && console.log(c, handPos)} */}
        {/* {console.log(c)} */}
        <div>{c.tapped ? 'tapped':''}</div>
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
    </div>
  )
}
  

export default CardComponent