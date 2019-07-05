import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Container, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './product-details.css';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/products.php?id=' + this.props.productID)
      .then(res => res.json())
      .then(product => this.setState({ product }))
      .catch(err => console.error('No product found', err));
  }

  handleAddToCart() {
    this.props.handleAdd(this.state.product);
  }

  render() {
    const productStatus = this.state.product;
    let productRender;
    let routeTitle;
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
                  <Button color="success" size="lg" onClick={this.handleAddToCart}>
                    <i className="fas fa-cart-plus"></i>
                    &nbsp; Add to Cart
                  </Button>
                </Col>
              </Row>
              <CardText className="product-text">{this.state.product.longDescription}</CardText>
            </CardBody>
          </Card>
        </CardGroup>
      );
      routeTitle = this.state.product.name;
    }

    return (
      <Container>
        <Row className="mt-1 mb-1">
          <Link to="/">
            Home
          </Link>
          &nbsp; &gt; {routeTitle} </Row>
        <Row>{productRender}</Row>
      </Container>
    );
  }
}

export default ProductDetails;
