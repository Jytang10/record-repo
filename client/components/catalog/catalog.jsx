import React from 'react';
import ProductItem from '../product-item/product-item';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Catalog extends React.Component {
  render() {
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
        <div>{productList}</div>
      </Container>
    );
  }
}

export default Catalog;