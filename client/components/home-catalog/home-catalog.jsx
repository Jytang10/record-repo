import React from 'react';
import ProductItem from '../product-item/product-item';
import {
  CardDeck,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container,
  Col,
  Row
} from 'reactstrap';
import './home-catalog.css';
import { Link } from 'react-router-dom';

const items = [
  {
    src: '/images/meta.jpg',
    altText: 'Record 1',
    caption: 'Nujabes',
    subcaption: 'metaphorical music',
    id: 2
  },
  {
    src: './images/sun.jpg',
    altText: 'Record 2',
    caption: '星野源',
    subcaption: 'Sun',
    id: 8
  },
  {
    src: './images/shishamo.jpg',
    altText: 'Record 3',
    caption: 'SHISHAMO',
    subcaption: 'SHISHAMO',
    id: 4
  }
];

class HomeCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Link to={`/products/${item.id}`}>
            <img src={item.src} alt={item.altText}/>
          </Link>
        </CarouselItem>
      );
    });
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
            <h3>Weekly Top Sellers</h3>
          </Col>
        </Row>
        <Row className="carousel-row mb-3">
          <Col />
          <Col>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              hover={true}
              pause= "hover"
              ride="carousel"
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} id="carousel-custom"/>
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
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
