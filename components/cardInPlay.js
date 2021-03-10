import CardComponent from './cardComponent'

const CardInPlay = ({position, c, confirmAttack, player}) => {
  return (
    <div onClick = {e => confirmAttack(e, c, position, player)} >
      <CardComponent c={c}/>
    </div>
  )
}

export default CardInPlay