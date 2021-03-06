import React from 'react';
import CartSummaryItem from '../cart-summary-item/cart-summary-item';
import { Table, Container, Row, Button, Col, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import './cart-summary.css';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getCartItems();
  }

  handleRemove(id) {
    this.props.handleRemove(id);
    this.getCartItems();
  }

  getCartItems() {
    this.props.getCartItems();
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    let cartItemDisplay;
    if (this.props.cartItems.length === 0) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else {
      let cartItemArray = this.props.cartItems;
      let cartList = cartItemArray.map(item => {
        return (
          <CartSummaryItem
            key={item.id}
            id={item.id}
            item={item}
            cartItems={this.props.cartItems}
            handleAdd={this.props.handleAdd}
            handleRemove={this.handleRemove}
            updateCart={this.props.updateCart}
            getCartItems={this.props.getCartItems}
          />
        );
      });
      cartItemDisplay = cartList;
    }
    let checkoutCheck;
    if (this.props.cartTotal === 0) {
      checkoutCheck = (
        <div>
          <Button outline size="lg" color="secondary" id="zeroItems">Checkout</Button>
          <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="zeroItems" toggle={this.toggle}>No items in cart</Tooltip>
        </div>
      );
    } else {
      checkoutCheck = (
        <Link to="/checkout">
          <Button size="lg" color="success">Checkout</Button>
        </Link>
      );
    }

    return (
      <Container className="mb-2">
        <Row className="cart-header mt-2">
          <h1>My Shopping Cart</h1>
        </Row>
        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center subtotal">Subtotal</th>
                <th className="text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItemDisplay}
            </tbody>
          </Table>
        </Row>
        <Row className="mb-4">
          <Col></Col>
          <Col></Col>
          <Col>
            <Row className="justify-content-center"><div>{'Current Cart Total: $' + ((this.props.cartTotal / 100)).toFixed(2)}</div></Row>
            <Row className="justify-content-center">
              <Link to="/" className="mr-3">
                <Button size="lg" outline color="secondary" className="mb-2">Continue Shopping</Button>
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
