import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import './product-item.css';
class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePassProductID = this.handlePassProductID.bind(this);
  }

  handlePassProductID() {
    const idObject = { id: this.props.product.id };
    this.props.setProductID(idObject);
  }

  render() {
    const productImage = this.props.product.image;
    // const cardStyle = { 'width': '18rem' };
    return (
      <Card className="shadow p-2 mb-5 bg-white rounded">
        <CardImg className="product-image" top width="100%" src={productImage} alt="Item image" />
        <CardBody>
          <CardTitle className="product-title">{this.props.product.name}</CardTitle>
          <CardSubtitle className="product-price">{'$' + (this.props.product.price / 100)}</CardSubtitle>
          <CardText className="product-text">{this.props.product.shortDescription}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ProductItem;
