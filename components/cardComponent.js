import {Icon} from '@iconify/react';
import swordIcon from '../node_modules/@iconify-icons/mdi/sword'
import shieldIcon from '../node_modules/@iconify-icons/mdi/shield'
import hexagon from '../node_modules/@iconify-icons/mdi/hexagon-slice-3'


const CardComponent = ({c}) => { 
  return (
      <div className = 'flex flex-col items-center justify-between bg-indigo-400 m-2' style = {{width: 200, height: 300}}>
        <div className = 'flex justify-between w-11/12'>
          <div className = 'm-0' style = {{color: '#fff'}}>{c.name} </div>
          <div className = 'flex justify-center items-center m-0' style = {{color: '#fff'}}>
            <Icon icon = {hexagon} />
              {c.value}
         </div>
        </div>
        <div style = {{color: '#fff'}}>{c.tapped ? 'tapped':''}</div>
        <div className = 'flex justify-between w-11/12'>
          <div className = 'flex justify-center items-center m-0' style = {{color: '#fff'}}>
            <Icon icon = {swordIcon} />
            {c.atk}
            </div>
             <div className = 'flex justify-center items-center m-0' style = {{color: '#fff'}}>
                <Icon icon = {shieldIcon} />
                {c.def}
             </div>
        </div>
    </div>
  )
}
  

export default CardComponent