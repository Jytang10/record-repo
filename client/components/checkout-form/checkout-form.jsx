import React from 'react';
import './checkout-form.css';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    // this.handleBackToShopping = this.handleBackToShopping.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleBackToShopping() {
  //   this.props.onClick('catalog', {});
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let creditCardInfo = this.state.creditCard;
    const newOrder = {
      name: this.state.name,
      creditCard: parseInt(creditCardInfo),
      shippingAddress: this.state.shippingAddress
    };
    this.props.handlePlaceOrder(newOrder);
    this.setState({ name: '', creditCard: '', shippingAddress: '' });
  }

  render() {
    const nameValue = this.state.name;
    const creditCardValue = this.state.creditCard;
    const shippingAddressValue = this.state.shippingAddress;
    const shippingAddressInput = { 'height': '200px' };
    const cartItemsList = this.props.checkoutItems;
    let orderTotal = 0;
    for (let item of cartItemsList) {
      orderTotal += item.price;
    }
    let convertOrderTotal = orderTotal / 100;
    let fixedOrderTotal = convertOrderTotal.toFixed(2);
    return (
      <div className="container">
        <div>
          <h2 className="text-left">Checkout</h2>
          <h2 className="text-left text-muted">{'Order Total $' + fixedOrderTotal}</h2>
        </div>
        <div>
          <form className="shadow-sm" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Name</label>
              <input type="text" value={nameValue} className="form-control form-control-lg" id="name" placeholder="Your name here" onChange={this.handleChange} name="name" required autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Credit Card</label>
              <input type="number" value={creditCardValue} className="form-control form-control-lg" id="creditCard" placeholder="Your credit card number here" onChange={this.handleChange} name="creditCard" required autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Shipping Address</label>
              <input type="text" value={shippingAddressValue} className="form-control form-control-lg" id="shippingAddress" placeholder="Your shipping addresss here" style={shippingAddressInput} onChange={this.handleChange} name="shippingAddress" required autoFocus />
            </div>
            <div className="row mx-auto">
              <div className="col-sm-9">
                <button className="btn-danger" onClick={this.handleBackToShopping}> {'<'} Back to shopping</button>
              </div>
              <div className="col-sm-3 text-left">
                <button type="submit" className="btn btn-primary btn-lg">Place Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
