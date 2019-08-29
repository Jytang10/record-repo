import React from 'react';
import { Card, Button, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Container, Col, Row, Label, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import './product-details.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      modal: false,
      quantity: 1
    };
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

  handleAddToCart() {
    let quantity = this.state.quantity;
    for (let i = 0; i < quantity; i++) {
      this.props.handleAdd({ 'id': this.state.product.id });
    }
    this.toggle();
  }

  render() {
    let productImage1;
    let productImage2;
    let productImage3;
    if (this.state.product) {
      productImage1 = this.state.product.images[0];
      productImage2 = this.state.product.images[1];
      productImage3 = this.state.product.images[2];
    }
    const closeBtn = <button className="close modal-close" onClick={this.toggle}>&times;</button>;
    const productStatus = this.state.product;
    let productRender;
    let productTitle;
    let productPrice;
    let productQuantity;
    let productSumPrice;
    let quantityVal = this.state.quantity;
    let quantityMinus;
    if (quantityVal === 1) {
      quantityMinus = <i className="quantity-icon-error mr-1 fas fa-minus-square fa-lg"></i>;
    } else {
      quantityMinus = <i className="quantity-icon mr-1 fas fa-minus-square fa-lg" onClick={this.handleMinusQuantity}></i>;
    }
    if (productStatus) {
      productRender = (
        <CardGroup>
          <Card>
            <Carousel autoPlay>
              <div className="seller-div">
                <img src={productImage1} />
              </div>
              <div className="seller-div">
                <img src={productImage2} />
              </div>
              <div className="seller-div">
                <img src={productImage3} />
              </div>
            </Carousel>
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="product-title">{this.state.product.name}</CardTitle>
              <CardSubtitle className="product-artist">{this.state.product.artist}</CardSubtitle>
              <CardText className="product-price">{'$' + (this.state.product.price / 100).toFixed(2)}</CardText>
              <Row>
                <Col>
                  <Row className="quantity-label"><Label for="quantityNumber">Update Quantity</Label></Row>
                  <Row className="quantity-input-row">
                    {quantityMinus}
                    <Badge color="success">{quantityVal}</Badge>
                    <i className="quantity-icon ml-1 fas fa-plus-square fa-lg" onClick={this.handleAddQuantity}></i>
                  </Row>
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
