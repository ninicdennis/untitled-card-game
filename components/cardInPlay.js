const CardInPlay = ({c}) => {
  return (
    <div>
      <div style = {{width: 200, height: 300, backgroundColor: '#424242', margin: 10}}>
        <p style = {{margin: 0, color: '#fff'}}>Name: {c.name} </p>
        <p style = {{margin: 0, color: '#fff'}}>Cost: {c.value} </p>
        <p style = {{margin: 0, color: '#fff'}}>Id: {c.id}</p>
      </div>
    </div>
  )
}

export default CardInPlay