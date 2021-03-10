import Modal from 'react-modal';
import CardComponent from './cardComponent';

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
        {grave.map(c => {
          return(
            <CardComponent c = {c} />
          )
        })}
      </div>
      </Modal>
    </>
  )
}

export default GraveModal