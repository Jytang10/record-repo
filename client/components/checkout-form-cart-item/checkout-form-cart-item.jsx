import React from 'react';
import './checkout-form-cart-item.css';

class CheckoutFormCartItem extends React.Component {
  render() {
    const productImage = this.props.item.image;
    // const cardStyle = { 'width': '18rem' };
    return (
      // <Card className="shadow p-2 mb-5 bg-white rounded">
      //   <CardImg className="product-image" top width="100%" src={productImage} alt="Item image" />
      //   <CardBody>
      //     <CardTitle className="product-title">{this.props.item.name}</CardTitle>
      //     <CardSubtitle className="product-artist">{this.props.item.artist}</CardSubtitle>
      //     <CardText className="product-price">{'$' + (this.props.item.price / 100)}</CardText>
      //     <CardText className="product-text">{this.props.item.shortDescription}</CardText>
      //   </CardBody>
      // </Card>
      // <tbody>
      <tr>
        <td><img className="cart-image" width="100%" src={productImage} alt="Cart item image" /></td>
        <td>{this.props.item.name}</td>
        <td>Quantity</td>
        <td>Subtotal</td>
      </tr>
    );
  }
}

export default CheckoutFormCartItem;
