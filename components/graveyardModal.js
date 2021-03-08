import Modal from 'react-modal';
import {Icon} from '@iconify/react';
import swordIcon from '../node_modules/@iconify-icons/mdi/sword'
import shieldIcon from '../node_modules/@iconify-icons/mdi/shield'
import hexagon from '../node_modules/@iconify-icons/mdi/hexagon-slice-3'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width: '100%',
    transform             : 'translate(-50%, -50%)'
  }
};
const GraveModal = ({modal, setModal, grave}) => {
  return (
    <>
      <Modal
        isOpen={modal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick = {e => setModal(false)}>Close</button>
        <div>Graveyard:</div>
        <div style = {{display: 'flex', flexDirection: 'row', overflow: 'scroll' }}>
        {grave.map(g => {
          return(
              <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}
              >
              <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                <div style = {{margin: 0, color: '#fff'}}> {g.name} </div>
                <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                <Icon icon = {hexagon} />
                {g.value} 
                </div>
              </div>
              <div style = {{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Icon icon = {swordIcon} />
                  {g.atk}
                  </div>
                <div style = {{margin: 0, color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Icon icon = {shieldIcon} />
                  {g.def}
                  </div>
              </div>
            </div>
          )
        })}
      </div>
      </Modal>
    </>
  )
}

export default GraveModal