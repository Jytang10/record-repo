import React from 'react';
import { Button } from 'reactstrap';
import './cart-summary-item.css';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem() {
    this.props.handleRemove(this.props.item, this.props.id);
  }

  render() {
    const productImage = this.props.item.image;
    let convertItemPrice = this.props.item.price / 100;
    let fixedItemPrice = convertItemPrice.toFixed(2);
    let itemSubtotal = this.props.item.quantity * fixedItemPrice;
    return (
      <tr>
        <td align="center"><img className="cart-image" width="150rem" src={productImage} alt="Cart item image" /></td>
        <td align="center">{this.props.item.name}</td>
        <td align="center">{'$' + (fixedItemPrice)}</td>
        <td align="center">
          <i className="quantity-icon mr-1 fas fa-minus-square" onClick={this.handleMinusQuantity}></i>
          {this.props.item.quantity}
          <i className="quantity-icon ml-1 fas fa-plus-square" onClick={this.handleAddQuantity}></i>
        </td>
        <td align="center">{itemSubtotal}</td>
        <td align="center">
          <Button color="danger" onClick={this.handleRemoveItem}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </td>
      </tr>
    );
  }
}

export default CartSummaryItem;
