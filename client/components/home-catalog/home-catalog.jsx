import React from 'react';
import ProductItem from '../product-item/product-item';
import {
  CardDeck,
  Container,
  Col,
  Row
} from 'reactstrap';
import './home-catalog.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const items = [
//   {
//     src: '/images/meta.jpg',
//     altText: 'Record 1',
//     caption: 'Nujabes',
//     subcaption: 'metaphorical music',
//     id: 2
//   },
//   {
//     src: './images/sun.jpg',
//     altText: 'Record 2',
//     caption: '星野源',
//     subcaption: 'Sun',
//     id: 8
//   },
//   {
//     src: './images/shishamo.jpg',
//     altText: 'Record 3',
//     caption: 'SHISHAMO',
//     subcaption: 'SHISHAMO',
//     id: 4
//   }
// ];

class HomeCatalog extends React.Component {
  render() {

    // const slides = items.map(item => {
    //   return (
    //     <CarouselItem
    //       onExiting={this.onExiting}
    //       onExited={this.onExited}
    //       key={item.src}
    //     >
    //       <Link to={`/products/${item.id}`}>
    //         <img src={item.src} alt={item.altText}/>
    //       </Link>
    //     </CarouselItem>
    //   );
    // });
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
            <h3>Top 3 Sellers</h3>
          </Col>
        </Row>
        <Row className="carousel-row mb-3">
          <Col />
          <Col className="carousel-col">
            <Carousel autoPlay>
              <div className="seller-div">
                {/* <Link to="/checkout"> */}
                  <img src="/images/meta.jpg" />
                {/* </Link> */}
              </div>
              <div className="seller-div">
                <img src="/images/sun.jpg" />
              </div>
              <div className="seller-div">
                <img src="/images/shishamo.jpg" />
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
