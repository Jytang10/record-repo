import React from 'react';
import CartSummaryItem from '../cart-summary-item/cart-summary-item';
import { Table, Container, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './cart-summary.css';

class CartSummary extends React.Component {
  render() {
    const cartItemArray = Object.values(this.props.cartItems);
    const cartItemsList = cartItemArray;
    let cartItemDisplay;
    // let cartTotal;
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
            id={item.id}
            item={item}
            handleRemove={this.props.handleRemove}
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
                <th className="text-center">Quantity</th>
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
          <Button outline color="primary" className="mr-4">Update Cart</Button>
          <Link to="/checkout">
            <Button color="success">Check Out</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default CartSummary;
