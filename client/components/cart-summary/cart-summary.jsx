import React from 'react';
import CartSummaryItem from '../cart-summary-item/cart-summary-item';
import { Table, Container, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './cart-summary.css';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null
    };
    this.handleRemove = this.handleRemove.bind(this);
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
      // cartTotal = this.props.cartTotal;
      // let itemTotal = 0;
      // for (let item of cartItemsList) {
      //   itemTotal += item.price;
      // }
      // let convertItemTotal = itemTotal / 100;
      // let fixedItemTotal = convertItemTotal.toFixed(2);
      // itemTotalDisplay = 'Total: $' + fixedItemTotal;
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
        <Row className="float-right">
          {'Current Cart Total: $' + ((this.props.cartTotal / 100)).toFixed(2)}
        </Row>
        <Row>
          <Link to="/">
            <Button outline color="secondary">Continue Shopping</Button>
          </Link>
        </Row>
        <Row className="float-right">
          {/* <Button outline color="primary" className="mr-4" onClick={this.updateCart}>Update Cart</Button> */}
          <Link to="/checkout">
            <Button color="success">Check Out</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default CartSummary;
