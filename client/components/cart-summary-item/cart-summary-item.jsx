import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './cart-summary-item.css';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      cart: null,
      quantity: null,
      subTotal: null,
      modal: false
    };
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleMinusQuantity = this.handleMinusQuantity.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
    this.setState({ cart: this.props.cartItem });
    this.setState({ quantity: this.props.item.quantity });
    this.setState({ subTotal: (this.props.item.quantity * this.props.item.price) });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    let originalPrice = this.props.item.price;
    this.setState({ quantity: currentQuantity + 1 }, () => {
      this.setState({ subTotal: originalPrice * this.state.quantity }, () => {
        this.props.updateCart(this.state.item, this.state.quantity);
      });
    });
  }

  handleMinusQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    let originalPrice = this.props.item.price;
    this.setState({ quantity: currentQuantity - 1 }, () => {
      this.setState({ subTotal: originalPrice * this.state.quantity }, () => {
        this.props.updateCart(this.state.item, this.state.quantity);
      });
    });
  }

  handleRemoveItem() {
    this.props.handleRemove((this.props.id).toString());
    this.toggle();
  }

  render() {
    const productImage = this.props.item.image;
    let convertItemPrice = this.props.item.price / 100;
    let fixedItemPrice = convertItemPrice.toFixed(2);
    let itemQuantity;
    itemQuantity = this.state.quantity;
    let itemSubtotal;
    itemSubtotal = this.state.subTotal;
    let quantityMinus;
    if (itemQuantity === 1) {
      quantityMinus = <i className="quantity-icon-error mr-1 fas fa-minus-square"></i>;
    } else {
      quantityMinus = <i className="quantity-icon mr-1 fas fa-minus-square" onClick={this.handleMinusQuantity}></i>;
    }
    return (
      <tr>
        <td align="center"><img className="cart-image" width="75rem" src={productImage} alt="Cart item image" /></td>
        <td align="center">{this.props.item.name}</td>
        <td align="center">{'$' + (fixedItemPrice)}</td>
        <td align="center">
          {quantityMinus}
          {itemQuantity}
          <i className="quantity-icon ml-1 fas fa-plus-square" onClick={this.handleAddQuantity}></i>
        </td>
        <td align="center" className="subtotal">${(itemSubtotal / 100).toFixed(2)}</td>
        <td align="center">
          <Button color="danger" onClick={this.toggle}>
            <i className="fas fa-trash-alt"></i>
          </Button>
        </td>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Remove Item</ModalHeader>
          <ModalBody>
            <h5>Are you sure you want to remove this item from your cart?</h5>
            <Card className="remove-card">
              <CardImg top className="remove-card-img" src={productImage} alt="Cart item image" />
              <CardBody>
                <CardTitle>{this.props.item.name}</CardTitle>
                <CardText>Quantity: {itemQuantity}</CardText>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Back to Cart</Button>
            <Button color="danger" onClick={this.handleRemoveItem}>Remove Item</Button>
          </ModalFooter>
        </Modal>
      </tr>
    );
  }
}

export default CartSummaryItem;
