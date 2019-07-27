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
      address: '',
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
      [event.target.name]: event.target.value,
      [event.target.id]: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let creditCardInfo = this.state.ccnumber;
    const newOrder = {
      name: this.state.name,
      email: this.state.email,
      ccnumber: parseInt(creditCardInfo),
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: parseInt(this.state.zip)
    };
    this.props.handlePlaceOrder(newOrder);
    this.setState({
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      ccnumber: '' });
    this.toggleNested();
  }

  render() {
    const nameValue = this.state.name;
    const emailValue = this.state.email;
    const addressValue = this.state.address;
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
    let ccInputValueLength;
    if (ccValue.length >= 16 && ccValue.length <= 19) {
      ccInputValueLength = true;
    } else {
      ccInputValueLength = false;
    }
    let zipInputValueLength;
    if (zipValue.length === 5) {
      zipInputValueLength = true;
    } else {
      zipInputValueLength = false;
    }
    let fixedOrderTotal = orderTotal.toFixed(2);
    let shippingTotal = (parseFloat(orderTotal) + 5).toFixed(2);
    if (this.state.nameCheck) {
      var validateName = !nameValue;
    } else if (this.state.emailCheck) {
      var validateEmail = !emailValue;
    } else if (this.state.ccnumberCheck) {
      var validateCc = !ccValue;
    } else if (this.state.addressCheck) {
      var validateAddress = !addressValue;
    } else if (this.state.cityCheck) {
      var validateCity = !cityValue;
    } else if (this.state.stateCheck) {
      var validateState = !stateValue;
    } else if (this.state.zipCheck) {
      var validateZip = !zipValue;
    }
    const nameInputCheck = <Input value={nameValue} onChange={this.handleChange} type="name" name="name" id="nameCheck" placeholder="Your full name" required valid={!!nameValue} invalid={validateName}/>;
    const emailInputCheck = <Input value={emailValue} onChange={this.handleChange} type="text" name="email" id="emailCheck" placeholder="Your e-mail address" required valid={!!emailValue} invalid={validateEmail}/>;
    const ccInputCheck = <Input value={ccValue} onChange={this.handleChange} type="tel" pattern="[0-9]{13,16}" maxLength="19" name="ccnumber" id="ccnumberCheck" placeholder="Your credit card number" required valid={ccInputValueLength} invalid={validateCc} />;
    const addressInputCheck = <Input value={addressValue} onChange={this.handleChange} type="text" name="address" id="addressCheck" placeholder="1234 Main Street" required valid={!!addressValue} invalid={validateAddress} />;
    const cityInputCheck = <Input value={cityValue} onChange={this.handleChange} type="text" name="city" id="cityCheck" placeholder="Your City" required valid={!!cityValue} invalid={validateCity} />;
    const stateInputCheck = <Input value={stateValue} onChange={this.handleChange} type="text" name="state" id="stateCheck" placeholder="Your State" required valid={!!stateValue} invalid={validateState} />;
    const zipInputCheck = <Input value={zipValue} onChange={this.handleChange} type="tel" pattern="[0-9]" maxLength="5" name="zip" id="zipCheck" placeholder="Zip code" required valid={zipInputValueLength} invalid={validateZip} />;
    let confirmOrderBtn;
    if (nameInputCheck.props.valid && emailInputCheck.props.valid && ccInputCheck.props.valid && addressInputCheck.props.valid && cityInputCheck.props.valid && stateInputCheck.props.valid && zipInputCheck.props.valid) {
      confirmOrderBtn = <Button color="success" onClick={this.toggle}>Confirm Order</Button>;
    } else {
      confirmOrderBtn = <Button outline color="secondary">Confirm Order</Button>;
    }
    return (
      <Container>
        <Row className="justify-content-center mt-2">
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
                    <FormFeedback className="form-feedback">Please enter your name</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    {emailInputCheck}
                    <FormFeedback className="form-feedback">Please enter a valid e-mail address</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="ccnumber">Credit Card Number</Label>
                {ccInputCheck}
                <FormFeedback className="form-feedback">Please enter a valid credit card number</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address">Shipping Address</Label>
                {addressInputCheck}
                <FormFeedback className="form-feedback">Please enter your shipping address</FormFeedback>
              </FormGroup>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    {cityInputCheck}
                    <FormFeedback className="form-feedback">Please enter your city</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    {stateInputCheck}
                    <FormFeedback className="form-feedback">Please enter your state</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    {zipInputCheck}
                    <FormFeedback className="form-feedback">Please enter your zip code</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col className="text-center">
                  <Link to="/cart">
                    <Button color="danger">
                      <i className="fas fa-chevron-left mr-1"></i>
                      Return to Cart</Button>
                  </Link>
                </Col>
                <Col className="text-center">
                  {confirmOrderBtn}
                </Col>
              </Row>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle} close={closeBtn}>
                  <i className="mr-1 fas fa-exclamation-triangle confirm-icon"></i>
                  Please do not submit real information
                </ModalHeader>
                <ModalBody>
                  <Row className="modal-body-row">
                    Would you like to submit your order?
                  </Row>
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
            </Form>
          </Col>
          <Col className="cart-item-summary-div">
            <Container>
              <Row className="mt-1">
                <Table borderless>
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
      </Container>
    );
  }
}

export default CheckoutForm;
