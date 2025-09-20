import {Component} from 'react'
import {IoCartOutline} from 'react-icons/io5'

import './index.css'

class NavBar extends Component {
  render() {
    const {cartCount} = this.props

    return (
      <nav className="nav-bar-con">
        <h1 className="restrant-name">UNI Resto Cafe</h1>
        <div className="cart-con">
          <p className="cart-name">My Orders</p>
          <button className="add-cart-btn" type="button">
            <IoCartOutline size={28} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>
    )
  }
}

export default NavBar
