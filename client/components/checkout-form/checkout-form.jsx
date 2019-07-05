import React from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './checkout-form.css';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const cartItemsList = this.props.checkoutItems;
    let orderTotal = 0;
    for (let item of cartItemsList) {
      orderTotal += item.price;
    }
    let convertOrderTotal = orderTotal / 100;
    let fixedOrderTotal = convertOrderTotal.toFixed(2);
    return (
      <Container>
        <Row className="justify-content-center">
          <h1>Cart Checkout</h1>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Input value={nameValue} onChange={this.handleChange} type="name" name="name" id="name" placeholder="Your full name" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input value={emailValue} onChange={this.handleChange} type="email" name="email" id="email" placeholder="Your e-mail address" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="ccnumber">Credit Card Number</Label>
                <Input value={ccValue} onChange={this.handleChange} type="number" name="ccnumber" id="ccnumber" placeholder="Your credit card number"/>
              </FormGroup>
              <FormGroup>
                <Label for="address1">Address Line 1</Label>
                <Input value={address1Value} onChange={this.handleChange} type="text" name="address1" id="address1" placeholder="1234 Main Street"/>
              </FormGroup>
              <FormGroup>
                <Label for="address2">Address Line 2</Label>
                <Input value={address2Value} onChange={this.handleChange} type="text" name="address2" id="address2" placeholder="Apartment, studio, or floor"/>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input value={cityValue} onChange={this.handleChange} type="text" name="city" id="city"/>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input value={stateValue} onChange={this.handleChange} type="text" name="state" id="state"/>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input value={zipValue} onChange={this.handleChange} type="number" name="zip" id="zip"/>
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
                  <Button color="success" size="lg">Place Order</Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Container>
              <Row>Items</Row>
              <Row>Subtotal</Row>
              <Row>{'Order Total $' + fixedOrderTotal}</Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CheckoutForm;
