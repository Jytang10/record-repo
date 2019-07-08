import React from 'react';
import Header from '../header/header';
import HomeCatalog from '../home-catalog/home-catalog';
import ProductDetails from '../product-details/product-details';
import CartSummary from '../cart-summary/cart-summary';
import CheckoutForm from '../checkout-form/checkout-form';
import About from '../about/about';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productID: {},
      cart: []
    };
    this.setProductID = this.setProductID.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('No products found', err));
  }

  setProductID(id) {
    this.setState({ productID: id });
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(err => console.error('No cart items found', err));
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  addToCart(product) {
    const postData = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/cart.php', postData)
      .then(res => res.json())
      .then(product => {
        const cartItemList = this.state.cart.concat(product);
        this.setState({ cart: cartItemList });
      });
  }

  placeOrder(orderDetails) {
    const fullOrder = { orderInfo: orderDetails, cartInfo: this.state.cart };
    const postOrderData = {
      method: 'POST',
      body: JSON.stringify(fullOrder),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/orders.php', postOrderData)
      .then(res => {
        res.json();
        this.setState({ cart: [] });
      });
  }

  render() {

    return (
      <Router>
        <div>
          <Header cartItemCount={this.state.cart.length} />
        </div>
        <div>
          <Switch>
            <Route
              exact path="/"
              render={ props => <HomeCatalog {...props}
                products={this.state.products}
                setProductID={this.setProductID} /> }
            />
            <Route
              path="/products/:id"
              render={ props => <ProductDetails {...props}
                productID={this.state.productID.id}
                handleAdd={this.addToCart} />}
            />
            <Route
              path="/cart"
              render={ props => <CartSummary {...props}
                cartItems={this.state.cart} />}
            />
            <Route
              path="/checkout"
              render={ props => <CheckoutForm {...props}
                // cartItems={this.state.cart}
                checkoutItems={this.state.cart}
                handlePlaceOrder={this.placeOrder} />}
            />
            <Route
              path="/about"
              render={ props => <About {...props}
                products={this.state.products}/>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
