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
      cartItems: {},
      cartTotal: 0
    };
    this.setProductID = this.setProductID.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    // this.updateCartTotal = this.updateCartTotal.bind(this);
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
      .then(cartItems => this.setState({ cartItems }))
      .catch(err => console.error('No cart items found', err));
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  // addToCart(product) {
  //   const postData = {
  //     method: 'POST',
  //     body: JSON.stringify(product),
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   fetch('/api/cart.php', postData)
  //     .then(res => res.json())
  //     .then(product => {
  //       const cartItemList = this.state.cart.concat(product);
  //       this.setState({ cart: cartItemList });
  //     });
  // }

  addToCart(product, quantity) {
    const { cartItems } = this.state;
    if (!(product.id in cartItems)) {
      this.setState({
        cartItems: {
          ...cartItems,
          [product.id]: {
            ...product,
            quantity: quantity
          }
        }
      });
    } else {
      this.setState({
        cartItems: {
          ...cartItems,
          [product.id]: {
            ...cartItems[product.id],
            quantity: cartItems[product.id].quantity + quantity
          }
        }
      });
    }
  }

  // updateCartTotal() {
  //   let newCartTotal = 0;
  //   for (var item in this.state.cartItems) {
  //     newCartTotal += parseInt(this.state.cartItems[item]['price']);
  //   }
  //   this.setState({ cartTotal: newCartTotal });
  // }

  removeFromCart(object, key) {
    const newCartObj = {};
    const objKeys = Object.keys(object);
    objKeys.forEach(itemKey => {
      if (itemKey !== key) {
        newCartObj[itemKey] = object[itemKey];
      }
    });
    this.setState({ cartItems: newCartObj });
  }

  placeOrder(orderDetails) {
    const fullOrder = { orderInfo: orderDetails, cartInfo: this.state.cartItems };
    const postOrderData = {
      method: 'POST',
      body: JSON.stringify(fullOrder),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/api/orders.php', postOrderData)
      .then(res => {
        res.json();
        this.setState({ cartItems: {} });
      });
  }

  render() {
    let cartLength;
    if (this.state.cartItems) {
      cartLength = Object.keys(this.state.cartItems).length;
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
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal} />}
            />
            <Route
              path="/cart"
              render={ props => <CartSummary {...props}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                handleRemove={this.removeFromCart}
                handleAdd={this.addToCart} />}
            />
            <Route
              path="/checkout"
              render={ props => <CheckoutForm {...props}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                handlePlaceOrder={this.placeOrder}
                handleAdd={this.addToCart} />}
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
