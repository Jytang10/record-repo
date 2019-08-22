import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
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
    let productImage;
    let productID;
    if (this.props.product) {
      productImage = this.props.product.images[0];
      productID = this.props.product.id;
    }
    return (
      <Card className="shadow p-2 mb-4 bg-white rounded">
        <Link to={`/products/${productID}`}>
          <CardImg className="product-image" top width="100%" src={productImage} alt="Item image" />
        </Link>
        <CardBody>
          <CardTitle className="product-title">{this.props.product.name}</CardTitle>
          <CardSubtitle className="product-artist">{this.props.product.artist}</CardSubtitle>
          <CardText className="product-price">{'$' + (this.props.product.price / 100)}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ProductItem;
