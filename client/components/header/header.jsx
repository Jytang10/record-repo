import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
          <Link to="/">
            <div className="navbar-brand">
              <i className="fas fa-compact-disc mr-1"></i>
              Record Repo
              <small>J-Pop Record Specialist</small>
            </div>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Contact
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a className="contact-link" href="https://github.com/Jytang10/record-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/about" className="contact-link">
                      About
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart mr-1"></i>
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
