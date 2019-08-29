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

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      fullName: null,
      email: null,
      address: null,
      city: null,
      state: null,
      zip: null,
      ccnumber: null,
      errors: {
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        ccnumber: ''
      }
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

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false)
    );
    return valid;
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 3
            ? 'Name must be at least 3 characters!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Valid email address includes @ and .';
        break;
      case 'address':
        errors.address =
          value.length < 5
            ? 'Address must be at least 5 characters!'
            : '';
        break;
      case 'city':
        errors.city =
          value.length < 3
            ? 'Must be at least 3 characters!'
            : '';
        break;
      case 'state':
        errors.state =
          value.length < 2
            ? 'Must be at least 2 characters!'
            : '';
        break;
      case 'zip':
        errors.zip =
          value.length < 5
            ? 'Must be at least 5 characters!'
            : '';
        break;
      case 'ccnumber':
        errors.ccnumber =
          value.length < 16
            ? 'Credit Card must be at least 16 digits!'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
    this.validateForm(this.state.errors);
  }

  handleKeyPress(event) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let creditCardInfo = this.state.ccnumber;
    const newOrder = {
      name: this.state.fullName,
      email: this.state.email,
      ccnumber: parseInt(creditCardInfo),
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: parseInt(this.state.zip)
    };
    if (this.validateForm(this.state.errors)) {
      this.props.handlePlaceOrder(newOrder);
      this.setState({
        name: null,
        email: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        ccnumber: null
      });
      this.toggleNested();
    } else {
      alert('Invalid form, please check your submission');
    }
  }

  render() {
    const { errors } = this.state;
    const cartItemsList = this.props.cartItems;
    const closeBtn = <button className="close modal-close" onClick={this.toggle}>&times;</button>;
    let orderStatus;
    let cartItemDisplay;
    if (cartItemsList.length === 0) {
      cartItemDisplay = <tr><td>No items in cart</td></tr>;
    } else if (cartItemsList.length === 0) {
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
    let shippingTotal = (parseFloat(orderTotal) + 5).toFixed(2);
    let confirmOrderBtn;

    if (cartItemsList.length && this.state.fullName && this.state.email && this.state.ccnumber && this.state.address && this.state.city && this.state.zip && this.state.zip && this.validateForm(this.state.errors)) {
      confirmOrderBtn = <Button color="success" onClick={this.toggle}>Confirm Order</Button>;
    } else {
      confirmOrderBtn = <Button outline color="secondary" disabled>Confirm Order</Button>;
    }

    if (cartItemsList.length === 0) {
      orderStatus = '$0.00';
    } else {
      orderStatus = '$' + shippingTotal;
    }
    return (
      <Container>
        <Row className="justify-content-center mt-2">
          <h1>Cart Checkout</h1>
        </Row>
        <Row>
          <Col className="cart-item-summary-div mb-2">
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
                <Col>{orderStatus}</Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <Row className="mb-2 ml-1 checkout-disclaimer"> This project is for demonstration purposes only; please do not enter real information. </Row>
            <Form noValidate>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="fullName">Full Name</Label>
                    <Input type="text" placeholder="Your full name" name="fullName" onChange={this.handleChange} noValidate/>
                    {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
                    <FormFeedback className="form-feedback">Please enter your name</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input type="email" placeholder="Your e-mail address" name="email" onChange={this.handleChange} noValidate/>
                    {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                    <FormFeedback className="form-feedback">Please enter a valid e-mail address</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="ccnumber" className="cc-label">Credit Card Number</Label>
                <br/><span className="cc-warning">*Please do not enter real info*</span>
                <Input type="text" onKeyPress={this.handleKeyPress} maxLength="19" placeholder="Your credit card number" name="ccnumber" onChange={this.handleChange} noValidate />
                {errors.ccnumber.length > 0 && <span className='error'>{errors.ccnumber}</span>}
                <FormFeedback className="form-feedback">Please enter a valid credit card number</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address">Shipping Address</Label>
                <Input type="text" placeholder="Your shipping address" name="address" onChange={this.handleChange} noValidate/>
                {errors.address.length > 0 && <span className='error'>{errors.address}</span>}
                <FormFeedback className="form-feedback">Please enter your shipping address</FormFeedback>
              </FormGroup>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" placeholder="Your city" name="city" onChange={this.handleChange} noValidate/>
                    {errors.city.length > 0 && <span className='error'>{errors.city}</span>}
                    <FormFeedback className="form-feedback">Please enter your city</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" maxLength="2" placeholder="Your state" name="state" onChange={this.handleChange} noValidate/>
                    {errors.state.length > 0 && <span className='error'>{errors.state}</span>}
                    <FormFeedback className="form-feedback">Please enter your state</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input type="text" onKeyPress={this.handleKeyPress} maxLength="5" placeholder="Your zip code" name="zip" onChange={this.handleChange} noValidate/>
                    {errors.zip.length > 0 && <span className='error'>{errors.zip}</span>}
                    <FormFeedback className="form-feedback">Please enter your zip code</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-2">
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
                  <Modal backdrop="static" isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
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
        </Row>
      </Container>
    );
  }
}

export default CheckoutForm;
