import './index.css'

const MenuItem = props => {
  const {dishDetails, onIncrement, onDecrement} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    addonCat,
    quantity,
  } = dishDetails

  return (
    <li className="menu-item">
      <div className="dish-info">
        <h1>{dishName}</h1>
        <p>{`${dishCurrency} ${dishPrice}`}</p>
        <p>{dishDescription}</p>

        {dishAvailability ? (
          <div className="counter">
            <button type="button" onClick={() => onDecrement(dishId)}>
              -
            </button>
            <p>{quantity}</p>
            <button type="button" onClick={() => onIncrement(dishId)}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}

        {addonCat && addonCat.length > 0 && (
          <p className="customizations">Customizations available</p>
        )}
      </div>

      <div className="dish-extra">
        <p>{`${dishCalories} calories`}</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default MenuItem
