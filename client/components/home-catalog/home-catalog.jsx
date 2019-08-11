import React from 'react';
import ProductItem from '../product-item/product-item';
import {
  CardDeck,
  Container,
  Col,
  Row,
  Tooltip
} from 'reactstrap';
import './home-catalog.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class HomeCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const productList = this.props.products.map(product => {
      return (
        <ProductItem
          key={product.id}
          product={product}
          setProductID={this.props.setProductID}
        />
      );
    });
    return (
      <Container fluid={true}>
        <Row className="greeting-row mt-2">
          <Col className="greeting-h1">
            <h3 href="#" id="disclaimerTip">Top 3 Sellers</h3>
            <Tooltip placement="top" isOpen={this.state.tooltipOpen} autohide={false} target="disclaimerTip" toggle={this.toggle}>
              Disclaimer: This is a demo project for demonstration purposes only. Thank you for visiting!
            </Tooltip>
          </Col>
        </Row>
        <Row className="carousel-row mb-3">
          <Col />
          <Col className="carousel-col">
            <Carousel autoPlay>
              <div className="seller-div">
                <img src="/images/meta.jpg" />
                <Link to="/products/2" className="legend">metaphorical music</Link>
              </div>
              <div className="seller-div">
                <img src="/images/sun.jpg" />
                <Link to="/products/8" className="legend">SUN</Link>
              </div>
              <div className="seller-div">
                <img src="/images/shishamo.jpg" />
                <Link to="/products/4" className="legend">SHISHAMO</Link>
              </div>
            </Carousel>
          </Col>
          <Col />
        </Row>
        <Row className="mr-2 ml-2">
          <CardDeck>
            {productList}
          </CardDeck>
        </Row>
      </Container>
    );
  }
}

export default HomeCatalog;
