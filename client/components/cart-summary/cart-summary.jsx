import React from 'react';
import CartSummaryItem from '../cart-summary-item/cart-summary-item';
import { Table, Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './cart-summary.css';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cartItemsList = this.props.cartItems;
    let cartItemDisplay;
    let itemTotalDisplay;
    if (cartItemsList.length === 0) {
      cartItemDisplay = (
        <div>
          No Items in Cart
        </div>
      );
    } else {
      let cartList = cartItemsList.map(item => {
        return (
          <CartSummaryItem
            key={item.id}
            item={item}
          />
        );
      });
      cartItemDisplay = cartList;
      let itemTotal = 0;
      for (let item of cartItemsList) {
        itemTotal += item.price;
      }
      let convertItemTotal = itemTotal / 100;
      let fixedItemTotal = convertItemTotal.toFixed(2);
      itemTotalDisplay = 'Subtotal: $' + fixedItemTotal;
    }

    return (
      <Container>
        <Row>
          <h1>My Shopping Cart</h1>
        </Row>
        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItemDisplay}
            </tbody>
          </Table>
        </Row>
        <Row>
          {itemTotalDisplay}
        </Row>
        <Row>
          <Link to="/">
            <Button outline color="secondary">Continue Shopping</Button>
          </Link>
          <Button outline color="secondary">Update Cart</Button>
          <Link to="/checkout">
            <Button color="success">Check Out</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default CartSummary;
