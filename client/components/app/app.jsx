import React from 'react';
import Header from '../header/header';
import HomeCatalog from '../home-catalog/home-catalog';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: []
      // view: {
      //   name: 'catalog',
      //   params: {}
      // }
    };
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error('No products found', err));
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
        this.setState({ cart: [], view: { name: 'catalog', params: {} } });
      });
  }

  // setView(name, params) {
  //   this.setState({ view: { name: name, params: params } });
  // }

  render() {

    return (
      <Router>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route
              path="/"
              // exact component={HomeCatalog}
              render={ props => <HomeCatalog {...props}
                products={this.state.products} /> }
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
