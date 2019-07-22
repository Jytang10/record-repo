import React from 'react';
import CheckoutFormCartItem from '../checkout-form-cart-item/checkout-form-cart-item';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './checkout-form.css';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      name: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      ccnumber: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let creditCardInfo = this.state.ccnumber;
    const newOrder = {
      name: this.state.name,
      email: this.state.email,
      creditCard: parseInt(creditCardInfo),
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: parseInt(this.state.zip)
    };
    this.props.handlePlaceOrder(newOrder);
    this.setState({
      name: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      ccnumber: '' });
    this.toggleNested();
  }

  render() {
    const nameValue = this.state.name;
    const emailValue = this.state.email;
    const address1Value = this.state.address1;
    const address2Value = this.state.address2;
    const ccValue = this.state.ccnumber;
    const cityValue = this.state.city;
    const stateValue = this.state.state;
    const zipValue = this.state.zip;
    const cartItemArray = Object.values(this.props.cartItems);
    const cartItemsList = cartItemArray;
    const closeBtn = <button className="close modal-close" onClick={this.toggle}>&times;</button>;
    let cartItemDisplay;
    if (cartItemsList.length === 0) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else if (Object.keys(cartItemsList).length === 0 && this.state.cart.constructor === Object) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else {
      let cartList = cartItemsList.map(item => {
        return (
          <CheckoutFormCartItem
            key={item.id}
            item={item}
          />
        );
      });
      cartItemDisplay = cartList;
    }
    let orderTotal = 0;
    for (let item of cartItemsList) {
      orderTotal += (item.price / 100);
    }
    let fixedOrderTotal = orderTotal.toFixed(2);
    let shippingTotal = parseFloat(fixedOrderTotal) + 5;
    let nameInputCheck;
    if (nameValue) {
      nameInputCheck = <Input value={nameValue} onChange={this.handleChange} type="name" name="name" id="name" placeholder="Your full name" required valid />;
    } else {
      nameInputCheck = <Input value={nameValue} onChange={this.handleChange} type="name" name="name" id="name" placeholder="Your full name" required invalid />;
    }
    let emailInputCheck;
    if (emailValue) {
      emailInputCheck = <Input value={emailValue} onChange={this.handleChange} type="text" name="email" id="email" placeholder="Your e-mail address" required valid/>;
    } else {
      emailInputCheck = <Input value={emailValue} onChange={this.handleChange} type="text" name="email" id="email" placeholder="Your e-mail address" required invalid/>;
    }
    let ccInputCheck;
    if (ccValue) {
      ccInputCheck = <Input value={ccValue} onChange={this.handleChange} type="number" name="ccnumber" id="ccnumber" placeholder="Your credit card number" required valid />;
    } else {
      ccInputCheck = <Input value={ccValue} onChange={this.handleChange} type="number" name="ccnumber" id="ccnumber" placeholder="Your credit card number" required invalid />;
    }
    let addressInputCheck;
    if (address1Value) {
      addressInputCheck = <Input value={address1Value} onChange={this.handleChange} type="text" name="address1" id="address1" placeholder="1234 Main Street" required valid />;
    } else {
      addressInputCheck = <Input value={address1Value} onChange={this.handleChange} type="text" name="address1" id="address1" placeholder="1234 Main Street" required invalid />;
    }
    let cityInputCheck;
    if (cityValue) {
      cityInputCheck = <Input value={cityValue} onChange={this.handleChange} type="text" name="city" id="city" required valid />;
    } else {
      cityInputCheck = <Input value={cityValue} onChange={this.handleChange} type="text" name="city" id="city" required invalid />;
    }
    let stateInputCheck;
    if (stateValue) {
      stateInputCheck = <Input value={stateValue} onChange={this.handleChange} type="text" name="state" id="state" required valid />;
    } else {
      stateInputCheck = <Input value={stateValue} onChange={this.handleChange} type="text" name="state" id="state" required invalid />;
    }
    let zipInputCheck;
    if (zipValue) {
      zipInputCheck = <Input value={zipValue} onChange={this.handleChange} type="number" name="zip" id="zip" required valid />;
    } else {
      zipInputCheck = <Input value={zipValue} onChange={this.handleChange} type="number" name="zip" id="zip" required invalid />;
    }
    return (
      <Container>
        <Row className="justify-content-center">
          <h1>Cart Checkout</h1>
        </Row>
        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    {nameInputCheck}
                    <FormFeedback invalid>Please enter your name</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    {emailInputCheck}
                    <FormFeedback invalid>Please enter a valid e-mail address</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="ccnumber">Credit Card Number</Label>
                {ccInputCheck}
                <FormFeedback invalid>Please enter a valid credit card number</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address1">Shipping Address Line 1</Label>
                {addressInputCheck}
                <FormFeedback invalid>Please enter your shipping address</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address2">Shipping Address Line 2</Label>
                <Input value={address2Value} onChange={this.handleChange} type="text" name="address2" id="address2" placeholder="Apartment, studio, or floor"/>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    {cityInputCheck}
                    <FormFeedback invalid>Please enter your city</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    {stateInputCheck}
                    <FormFeedback invalid>Please enter your state</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    {zipInputCheck}
                    <FormFeedback invalid>Please enter your zip code</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Link to="/cart">
                    <Button color="danger">
                      <i className="fas fa-chevron-left mr-1"></i>
                      Return to Cart</Button>
                  </Link>
                </Col>
                <Col className="text-center">
                  <Button color="success" onClick={this.toggle}>Confirm Order</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="cart-item-summary-div">
            <Container>
              <Row className="mt-1">
                <Table>
                  <tbody>
                    {cartItemDisplay}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col>Subtotal</Col>
                <Col>{'$' + fixedOrderTotal}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>$5.00</Col>
              </Row>
              <Row>
                <Col>Order Total</Col>
                <Col>{'$' + shippingTotal}</Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            <i className="mr-1 fas fa-exclamation-triangle confirm-icon"></i>
            CONFIRM YOUR ORDER
          </ModalHeader>
          <ModalBody>
            <Row className="modal-body-row">Would you like to submit your order?</Row>
          </ModalBody>
          <ModalFooter>
            <Link to="/checkout">
              <Button color="danger" onClick={this.toggle}>Return to Checkout</Button>{' '}
            </Link>
            <Button color="success" onClick={this.handleSubmit}>Submit Order</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>
                <i className="mr-1 fas fa-handshake"></i>
                THANK YOU
              </ModalHeader>
              <ModalBody>Order successfully placed. Thank you for your patronage.</ModalBody>
              <ModalFooter className="order-success-modal">
                <Link to="/">
                  <Button color="success" onClick={this.toggleAll}>Back to Home</Button>
                </Link>
              </ModalFooter>
            </Modal>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default CheckoutForm;
