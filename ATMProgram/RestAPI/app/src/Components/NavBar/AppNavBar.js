import React, { Component } from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {AccountDropdown, Nav, Site, Button} from "tabler-react";
import 'bootstrap/dist/css/bootstrap.min.css';

const navBarItems = [
    { value: "Home", to: "/home", icon: "home", LinkComponent: withRouter(NavLink)},
    {
        value: "Bán hàng",
        icon: "shopping-bag",
        subItems: [
            {
                value: "Đơn hàng",
                to: "/accounts",
                icon: 'shopping-cart',
                LinkComponent: withRouter(NavLink),
            },
            {
                value: "Đơn hàng",
                to: "/accounts/delivery",
                icon: 'truck',
                LinkComponent: withRouter(NavLink) },
        ],
    },
    {
        value: "Bán hàng",
        icon: "shopping-bag",
        subItems: [
            {
                value: "Đơn hàng",
                to: "/accounts",
                LinkComponent: withRouter(NavLink),
            },
            { value: "Charts", to: "/charts", LinkComponent: withRouter(NavLink) },
            {
                value: "Pricing Cards",
                to: "/pricing-cards",
                LinkComponent: withRouter(NavLink),
            },
        ],
    }
];

class AppNavbar extends Component{
    constructor(props) {
        super(props);
        this.state = {isOpen: false, isMenuOpen: false};
        this.toggle = this.toggle.bind(this);
        this.collapseMenu = this.collapseMenu.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    collapseMenu() {
        if (this.state.isMenuOpen == false) {
            document.getElementById('headerMenuCollapse').classList.add('show');
            this.setState({isMenuOpen : true});
        }

        if (this.state.isMenuOpen == true) {
            document.getElementById('headerMenuCollapse').classList.remove('show');
            this.setState({isMenuOpen : false});

        }
    }
    render() {
        return(<Site>
            <Site.Header imageURL="./assets/Logo.png" >
                <Link className="header-brand header-brand-img" to="/">Sale Support</Link>
                <div className="d-flex order-lg-2 ml-auto">
                    <AccountDropdown
                        avatarURL="./assets/img/face.svg"
                        name="Jane Pearson"
                        description="Administrator"
                        options={[
                            "logout",
                        ]}
                    />
                    <a className="header-toggler d-lg-none ml-3 ml-lg-0" onClick={this.collapseMenu}>
                        <span className="header-toggler-icon"></span>
                    </a>
                </div>
            </Site.Header>
            <Site.Nav itemsObjects={navBarItems}>
            </Site.Nav>
            {this.props.children}
        </Site>)
    }
}

export default AppNavbar;
