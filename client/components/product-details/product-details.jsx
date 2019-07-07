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
      modal: false
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.productID)
      .then(res => res.json())
      .then(product => this.setState({ product }))
      .catch(err => console.error('No product found', err));
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddToCart() {
    this.props.handleAdd(this.state.product);
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
    let cartTotal;
    if (productStatus) {
      productRender = (
        <CardGroup>
          <Card>
            <CardImg top width="100%" src={this.state.product.image} alt="Product image" />
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="product-title">{this.state.product.name}</CardTitle>
              <CardSubtitle className="product-artist">{this.state.product.artist}</CardSubtitle>
              <CardText className="product-price">{'$' + (this.state.product.price / 100)}</CardText>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="quantityNumber">Quantity</Label>
                    <Input
                      type="number"
                      name="quantity"
                      id="quantityNumber"
                      placeholder="1"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Button color="success" size="lg" onClick={this.toggle}>
                    <i className="fas fa-cart-plus"></i>
                    &nbsp; Add to Cart
                  </Button>
                </Col>
              </Row>
              <CardText className="product-text">{this.state.product.longDescription}</CardText>
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
      productQuantity = this.state.product.quantity;
      let convertPrice = this.state.product.price / 100;
      let fixedPrice = convertPrice.toFixed(2);
      productPrice = fixedPrice;
      productSumPrice = productPrice * productQuantity;
      cartTotal = 0;
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
            <Row className="modal-body-row">&quot;{productTitle}&quot; Quantity: {productQuantity}</Row>
            <Row className="modal-body-row">{'$' + (productPrice) + ' x ' + (productQuantity) + ' = $' + (productSumPrice)}</Row>
            <Row className="modal-body-row">{'Cart Total: $' + (cartTotal)}</Row>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button color="primary" onClick={this.toggle}>Continue Shopping</Button>{' '}
            </Link>
            <Link to="/cart">
              <Button color="success" onClick={this.handleAddToCart}>Continue to Cart</Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ProductDetails;
