import React from 'react';
import CartSummaryItem from '../cart-summary-item/cart-summary-item';
import { Table, Container, Row, Button, Col, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import './cart-summary.css';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      tooltipOpen: false
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    this.setState({ cart: this.props.cartItems });
  }

  handleRemove(id) {
    this.props.handleRemove(this.state.cart, id);
    this.setState({ cart: this.props.cartItems }, () => {
      this.getCartItems();
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    let cartItemDisplay;
    if (!this.state.cart) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else if (Object.keys(this.state.cart).length === 0 && this.state.cart.constructor === Object) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else {
      let cartItemArray = Object.values(this.state.cart);
      let cartList = cartItemArray.map(item => {
        return (
          <CartSummaryItem
            key={item.id}
            id={item.id}
            item={item}
            cartItems={this.state.cart}
            handleRemove={this.handleRemove}
            updateCart={this.props.updateCart}
          />
        );
      });
      cartItemDisplay = cartList;
    }
    let checkoutCheck;
    if (this.props.cartTotal === 0) {
      checkoutCheck = (
        <div>
          <Button outline color="secondary" id="zeroItems">Check Out</Button>
          <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="zeroItems" toggle={this.toggle}>No items in cart</Tooltip>
        </div>
      );
    } else {
      checkoutCheck = (
        <Link to="/checkout">
          <Button color="success">Check Out</Button>
        </Link>
      );
    }

    return (
      <Container>
        <Row className="cart-header">
          <h1>My Shopping Cart</h1>
        </Row>
        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Current Quantity</th>
                <th className="text-center">Subtotal</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItemDisplay}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Row className="justify-content-center"><div>{'Current Cart Total: $' + ((this.props.cartTotal / 100)).toFixed(2)}</div></Row>
            <Row className="justify-content-center">
              <Link to="/" className="mr-3">
                <Button outline color="secondary">Continue Shopping</Button>
              </Link>
              {checkoutCheck}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CartSummary;
