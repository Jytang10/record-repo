import React from 'react';
import { Button } from 'reactstrap';
import './cart-summary-item.css';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      cart: null,
      quantity: null,
      subTotal: null
    };
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleMinusQuantity = this.handleMinusQuantity.bind(this);
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
    this.setState({ cart: this.props.cartItem });
    this.setState({ quantity: this.props.item.quantity });
    this.setState({ subTotal: (this.props.item.quantity * this.props.item.price) });
  }

  handleAddQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    let originalPrice = this.props.item.price;
    this.setState({ quantity: currentQuantity + 1 }, () => {
      this.setState({ subTotal: originalPrice * this.state.quantity });
    });
  }

  handleMinusQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    let originalPrice = this.props.item.price;
    if (currentQuantity !== 0) {
      this.setState({ quantity: currentQuantity - 1 }, () => {
        this.setState({ subTotal: originalPrice * this.state.quantity });
      });
    }
  }

  handleRemoveItem() {
    this.props.handleRemove((this.props.id).toString());
  }

  render() {
    const productImage = this.props.item.image;
    let convertItemPrice = this.props.item.price / 100;
    let fixedItemPrice = convertItemPrice.toFixed(2);
    let itemQuantity;
    itemQuantity = this.state.quantity;
    let itemSubtotal;
    itemSubtotal = this.state.subTotal;
    return (
      <tr>
        <td align="center"><img className="cart-image" width="150rem" src={productImage} alt="Cart item image" /></td>
        <td align="center">{this.props.item.name}</td>
        <td align="center">{'$' + (fixedItemPrice)}</td>
        <td align="center">
          <i className="quantity-icon mr-1 fas fa-minus-square" onClick={this.handleMinusQuantity}></i>
          {itemQuantity}
          <i className="quantity-icon ml-1 fas fa-plus-square" onClick={this.handleAddQuantity}></i>
        </td>
        <td align="center">${(itemSubtotal / 100).toFixed(2)}</td>
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
