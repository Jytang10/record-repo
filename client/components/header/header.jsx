import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Badge
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="top-navbar" dark expand="md">
          <NavbarBrand href="/">
            <i className="fas fa-compact-disc mr-1"></i>
            Record Repo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/cart" className="nav-link"> 
                  <i className="fas fa-shopping-cart mr-1"></i>
                  Cart
                  <Badge className="ml-1" color="light">{this.props.cartItemCount}</Badge>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
