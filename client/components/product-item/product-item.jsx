import React from 'react';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    // this.handleViewDescription = this.handleViewDescription.bind(this);
  }

  // handleViewDescription() {
  //   const paramsObj = { id: this.props.product.id };
  //   this.props.onClick('details', paramsObj);
  // }

  render() {
    // const productImage = this.props.product.image;
    // const cardStyle = { 'width': '18rem' };
    return (
      <div className='col-sm-4 card-deck'>
        {/* <div className="card bg-light mb-3" style={cardStyle}>
          <img className="card-img-top img-fluid cardClass " src={productImage} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{this.props.product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{'$' + (this.props.product.price / 100)}</h6>
            <p className="card-text">{this.props.product.shortDescription}</p>
            <a href="#" className="btn btn-primary" onClick={this.handleViewDescription}>View Product Details</a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ProductItem;
