import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class AppNavbar extends Component{
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar className="navbar-inverse bg-info" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="https://salesupport.mtop.vn/">@HomeD</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://www.facebook.com/groups/1879917498767043"><i className="socicon socicon-facebook" style={{"color": "#fff"}}></i>Facebook</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/logout">Login</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default AppNavbar;
