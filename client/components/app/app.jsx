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
      cartTotal: 0,
      cartLength: 0,
      lastOrder: {
        customerInfo: {},
        cart: {}
      }
    };
    this.setProductID = this.setProductID.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
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

  getCartTotal() {
    let newCartTotal = 0;
    let newCartLength = 0;
    let cart = this.state.cartItems;
    for (var item in cart) {
      newCartTotal += (cart[item]['price'] * cart[item]['quantity']);
      newCartLength += cart[item]['quantity'];
    }
    this.setState({ cartTotal: newCartTotal, cartLength: newCartLength });
  }

  componentDidMount() {
    this.getProducts();
  }

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
      }, () => this.getCartTotal());
    } else {
      this.setState({
        cartItems: {
          ...cartItems,
          [product.id]: {
            ...cartItems[product.id],
            quantity: cartItems[product.id].quantity + quantity
          }
        }
      }, () => this.getCartTotal());
    }
  }

  updateQuantity(product, quantity) {
    const { cartItems } = this.state;
    this.setState({
      cartItems: {
        ...cartItems,
        [product.id]: {
          ...cartItems[product.id],
          quantity: quantity
        }
      }
    }, () => this.getCartTotal());
  }

  removeFromCart(object, key) {
    const newCartObj = {};
    const objKeys = Object.keys(object);
    objKeys.forEach(itemKey => {
      if (itemKey !== key) {
        newCartObj[itemKey] = object[itemKey];
      }
    });
    this.setState({ cartItems: newCartObj }, () => this.getCartTotal());
  }

  placeOrder(orderDetails) {
    // const fullOrder = { orderInfo: orderDetails, cartInfo: this.state.cartItems };
    const fullOrder = {
      name: 'test name',
      email: 'test email',
      address: 'test address',
      city: 'test city',
      state: 'test state',
      zip: 94537,
      ccnumber: 1235333434343,
      cart: {}
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
        console.log(res);
        res.json();
        this.setState({ cartItems: {}, cartLength: 0 });
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
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal} />}
            />
            <Route
              path="/cart"
              render={ props => <CartSummary {...props}
                cartItems={this.state.cartItems}
                cartTotal={this.state.cartTotal}
                handleRemove={this.removeFromCart}
                handleAdd={this.addToCart}
                updateCart={this.updateQuantity} />}
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
