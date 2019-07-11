import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Container, Col, Row, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import './product-details.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modal: false,
      quantity: 1,
      cartTotal: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleMinusQuantity = this.handleMinusQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.match.params.id)
      .then(res => res.json())
      .then(product => this.setState({ product: product[0] }))
      .catch(err => console.error('No product found', err));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    this.setState({ quantity: currentQuantity + 1 });
  }

  handleMinusQuantity() {
    let currentQuantity = parseInt(this.state.quantity);
    if (currentQuantity > 1) {
      this.setState({ quantity: currentQuantity - 1 });
    }
  }

  handleChange(event) {
    let inputVal = parseInt(event.target.value);
    this.setState({
      [event.target.name]: inputVal
    });
  }

  handleAddToCart() {
    this.props.handleAdd(this.state.product, this.state.quantity);
    this.toggle();
  }

  render() {
    const closeBtn = <button className="close modal-close" onClick={this.toggle}>&times;</button>;
    const productStatus = this.state.product;
    let productRender;
    let productTitle;
    let productPrice;
    let productQuantity;
    let productSumPrice;
    let quantityVal = this.state.quantity;
    if (productStatus) {
      productRender = (
        <CardGroup>
          <Card>
            <CardImg top width="100%" src={window.location.origin + this.state.product.image} alt="Product image" />
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="product-title">{this.state.product.name}</CardTitle>
              <CardSubtitle className="product-artist">{this.state.product.artist}</CardSubtitle>
              <CardText className="product-price">{'$' + (this.state.product.price / 100)}</CardText>
              <Row>
                <Col>
                  <FormGroup>
                    <Row className="quantity-label"><Label for="quantityNumber">Quantity to Add</Label></Row>
                    <Row className="quantity-input-row">
                      <i className="quantity-icon mr-1 fas fa-minus-square fa-lg" onClick={this.handleMinusQuantity}></i>
                      <Input
                        className="quantity-input"
                        type="number"
                        name="quantity"
                        id="quantityNumber"
                        placeholder="1"
                        value={quantityVal}
                        onChange={this.handleChange}
                      />
                      <i className="quantity-icon ml-1 fas fa-plus-square fa-lg" onClick={this.handleAddQuantity}></i>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <Button color="success" onClick={this.handleAddToCart}>
                    <i className="fas fa-cart-plus"></i>
                    &nbsp; Add to Cart
                  </Button>
                </Col>
              </Row>
              <CardText className="product-text">{this.state.product.description}</CardText>
              <Row className="catalog-btn">
                <Link to="/">
                  <Button color="primary">Back to Catalog</Button>
                </Link>
              </Row>
            </CardBody>
          </Card>
        </CardGroup>
      );
      productTitle = this.state.product.name;
      productQuantity = this.state.quantity;
      let convertPrice = this.state.product.price / 100;
      let fixedPrice = convertPrice.toFixed(2);
      productPrice = fixedPrice;
      productSumPrice = (productPrice * productQuantity).toFixed(2);
    }

    return (
      <Container>
        <Row className="mt-1 mb-1">
          <Link to="/">
            Home
          </Link>
          &nbsp; &gt; {productTitle} </Row>
        <Row>{productRender}</Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            <i className="mr-1 far fa-check-circle check-icon"></i>
            Added to Cart!
          </ModalHeader>
          <ModalBody>
            <Row className="modal-body-row">&quot;{productTitle}&quot; x {productQuantity}</Row>
            <Row className="modal-body-row">{'$' + (productPrice) + ' x ' + (productQuantity) + ' = $' + (productSumPrice)}</Row>
            <Row className="modal-body-row">{'Current Cart Total: $' + ((this.props.cartTotal / 100)).toFixed(2)}</Row>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button color="primary" onClick={this.toggle}>Continue Shopping</Button>{' '}
            </Link>
            <Link to="/cart">
              <Button color="success" onClick={this.toggle}>Continue to Cart</Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ProductDetails;
