import React from 'react';
import ProductItem from '../product-item/product-item';
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Col,
  Row
} from 'reactstrap';
import './home-catalog.css';

const items = [
  {
    src: '/images/deja.jpg',
    altText: 'Record 1',
    caption: 'Brand New',
    subcaption: 'Deja Entendu'
  },
  {
    src: './images/tricot.jpg',
    altText: 'Record 2',
    caption: 'tricot',
    subcaption: '3'
  },
  {
    src: './images/eits.jpg',
    altText: 'Record 3',
    caption: 'Explosions in the Sky',
    subcaption: 'The Earth is Not a Cold Dead Place'
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
          <img src={item.src} alt={item.altText} />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.subcaption} /> */}
        </CarouselItem>
      );
    });
    const productList = this.props.products.map(product => {
      return (
        <ProductItem
          key={product.id}
          product={product}
        />
      );
    });
    return (
      <Container fluid={true}>
        <Row>
          <Col className="greeting-h1">
            <h1>Welcome to Record Repo</h1>
            <h6>Browse Top Sellers</h6>
          </Col>
        </Row>
        <Row>
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
        <Row>
          {productList}
        </Row>
      </Container>
    );
  }
}

export default HomeCatalog;
