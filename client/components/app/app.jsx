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
      cartItems: [],
      cartTotal: 0,
      cartLength: 0
    };
    this.setProductID = this.setProductID.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.updateCartTotal = this.updateCartTotal.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('No products found', err));
  }

  async getCartItems() {
    try {
      const response = await fetch('/api/cart.php');
      const json = await response.json();
      this.setState({ cartItems: json }, () => this.getCartTotal());
    } catch (err) {
      console.error('Cart items could not be retrieved', err);
    }
  }

  setProductID(id) {
    this.setState({ productID: id });
  }

  getCartTotal() {
    let newCartTotal = 0;
    let newCartLength = 0;
    let cart = this.state.cartItems;
    for (let i = 0; i < cart.length; i++) {
      newCartTotal += parseInt((cart[i]['price'] * cart[i]['count']));
      newCartLength += parseInt(cart[i]['count']);
      this.updateCartTotal(newCartTotal, newCartLength);
    }
  }

  updateCartTotal(total, length) {
    this.setState({ cartTotal: total, cartLength: length });
  }

  async addToCart(productId) {
    const postData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    };
    try {
      const response = await fetch('/api/cart.php', postData);
      const json = await response.json();
      this.getCartItems();
    } catch (err) {
      console.error('Could not add to cart. Please try again: ', err);
    }
  }

  async updateCart(productId) {
    const putData = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    };
    try {
      const response = await fetch('/api/cart.php', putData);
      const json = await response.json();
      this.getCartItems();
    } catch (err) {
      console.error('Could not update cart. Please try again: ', err);
    }
  }
  
  async removeFromCart(productId) {
    const deleteData = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    };
    try {
      const response = await fetch('/api/cart.php', deleteData);
      const json = await response.json();
      this.getCartItems();
    } catch (err) {
      console.error('Could not removce item from cart. Please try again: ', err)
    }
  }

  placeOrder(orderDetails) {
    const fullOrder = {
      name: orderDetails.name,
      email: orderDetails.email,
      address: orderDetails.address,
      city: orderDetails.city,
      state: orderDetails.state,
      zip: orderDetails.zip,
      ccnumber: orderDetails.ccnumber,
      cart: this.state.cartItems
    };
    const postOrderData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fullOrder)
    };
    fetch('/api/orders.php', postOrderData)
      .then(res => {
        res.json();
        this.setState({ cartItems: [], cartLength: 0 });
      })
      .catch(err => console.error('Could not place order. Please try again: ', err));
  }

  render() {
    let cartLength;
    if (this.state.cartItems) {
      cartLength = this.state.cartLength;
    } else {
      cartLength = 0;
    }
    return (
      <Router>
        <div>
          <Header cartItemCount={cartLength} />
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
                handleAdd={this.addToCart}
                updateCart={this.updateCart}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                getCartItems={this.getCartItems} />}
            />
            <Route
              path="/cart"
              render={ props => <CartSummary {...props}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                handleRemove={this.removeFromCart}
                handleAdd={this.addToCart}
                updateCart={this.updateCart}
                getCartItems={this.getCartItems} />}
            />
            <Route
              path="/checkout"
              render={ props => <CheckoutForm {...props}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                handlePlaceOrder={this.placeOrder} />}
            />
            <Route
              path="/about"
              render={ props => <About {...props}
                products={this.state.products} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
