import {Component} from 'react'
import NavBar from '../NavBar'
import MenuItem from '../MenuItem'
import './index.css'

class RestaurantHome extends Component {
  state = {
    isLoading: true,
    menuData: [],
    cartCount: 0,
    activeCategoryId: '',
  }

  componentDidMount() {
    this.fetchData()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: Boolean(eachDish.dish_Availability),
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
        quantity: 0,
      })),
    }))

  fetchData = async () => {
    const apiResponse = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    if (apiResponse.ok) {
      const data = await apiResponse.json()
      const updatedData = this.getUpdatedData(data[0].table_menu_list)

      this.setState({
        isLoading: false,
        menuData: updatedData,
        activeCategoryId: updatedData[0].menuCategoryId,
      })
    }
  }

  // Increment handler
  onIncrement = dishId => {
    this.setState(prevState => {
      const updatedMenu = prevState.menuData.map(menu => ({
        ...menu,
        categoryDishes: menu.categoryDishes.map(dish => {
          if (dish.dishId === dishId) {
            return {...dish, quantity: dish.quantity + 1}
          }
          return dish
        }),
      }))
      return {
        menuData: updatedMenu,
        cartCount: prevState.cartCount + 1,
      }
    })
  }

  // Decrement handler
  onDecrement = dishId => {
    this.setState(prevState => {
      let decreased = false
      const updatedMenu = prevState.menuData.map(menu => ({
        ...menu,
        categoryDishes: menu.categoryDishes.map(dish => {
          if (dish.dishId === dishId && dish.quantity > 0) {
            decreased = true
            return {...dish, quantity: dish.quantity - 1}
          }
          return dish
        }),
      }))
      return {
        menuData: updatedMenu,
        cartCount: decreased ? prevState.cartCount - 1 : prevState.cartCount,
      }
    })
  }

  onChangeCategory = id => {
    this.setState({activeCategoryId: id})
  }

  renderLoader = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  render() {
    const {menuData, isLoading, cartCount, activeCategoryId} = this.state
    return (
      <>
        <NavBar cartCount={cartCount} />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="home-container">
            <ul className="categories-list">
              {menuData.map(menu => (
                <li key={menu.menuCategoryId}>
                  <button
                    type="button"
                    className={`category-tab ${
                      activeCategoryId === menu.menuCategoryId ? 'active' : ''
                    }`}
                    onClick={() => this.onChangeCategory(menu.menuCategoryId)}
                  >
                    {menu.menuCategory}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="dishes-list">
              {menuData.find(menu => menu.menuCategoryId === activeCategoryId)
                ?.categoryDishes.map(dish => (
                  <MenuItem
                    key={dish.dishId}
                    dishDetails={dish}
                    onIncrement={this.onIncrement}
                    onDecrement={this.onDecrement}
                  />
                ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default RestaurantHome
