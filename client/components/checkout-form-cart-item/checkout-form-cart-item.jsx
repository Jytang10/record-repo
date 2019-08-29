import React from 'react';
import './checkout-form-cart-item.css';

class CheckoutFormCartItem extends React.Component {
  render() {
    let productImage;
    if (this.props.item) {
      productImage = this.props.item.url;
    }
    let convertItemPrice = this.props.item.price / 100;
    let fixedItemPrice = convertItemPrice.toFixed(2);
    let itemSubtotal = (this.props.item.count * fixedItemPrice).toFixed(2);
    return (
      <tr>
        <td><img className="cart-image" width="100rem" src={productImage} alt="Cart item image" /></td>
        <td>{this.props.item.name}</td>
        <td>x{this.props.item.count}</td>
        <td>${itemSubtotal}</td>
      </tr>
    );
  }
}

export default CheckoutFormCartItem;
