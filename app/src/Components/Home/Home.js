import * as React from 'react';
import '../../App.css';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { Container, NavbarBrand } from 'reactstrap';
import AppNavbar from "../NavBar/AppNavBar";
import { Card, Button, AccountDropdown, Site, Nav} from "tabler-react";
type Props= {|
    +children: React.Node,
|};

type subNavItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +LinkComponent?: React.ElementType,
|};

type navItem = {|
    +value: string,
    +to?: string,
    +icon?: string,
    +active?: boolean,
    +LinkComponent?: React.ElementType,
    +subItems?: Array<subNavItem>,
|};

const navBarItems: Array<navItem> = [
    {
        value: "Home", to: "/", icon: "home", LinkComponent: withRouter(NavLink)
    },
    {

    }
]
const accountDropdownProps = {
    avatarURL: "./demo/faces/female/25.jpg",
    name: "Jane Pearson",
    description: "Administrator",
    options: [
        { icon: "user", value: "Profile" },
        { icon: "settings", value: "Settings" },
        { isDivider: true },
        { icon: "log-out", value: "Sign out" },
    ],
};
class Home extends React.Component<Props, void> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isAuthenticated: false,
            user: undefined,
            tokenId: undefined
        };
    }

    async componentDidMount() {
    }
    render() {
        return (
            <Site.Wrapper headerProps={{
                href: "/",
                alt: "SaleSupport",
                imageURL: "./assets/Logo.png",
                navItems: (
                    <Nav.Item type="div" className = "d-none d-md-flex">
                        <NavbarBrand tag={Link} to="/login">SaleSupport</NavbarBrand>

                        <Button>Sale</Button>
                    </Nav.Item>
                ),
                accountDropdown: accountDropdownProps,
            }}>

            </Site.Wrapper>
        );
    }
}

export default Home;

/*
<Card>
    <Card.Header>
        <Card.Title>Card Title</Card.Title>
    </Card.Header>
    <Card.Body>
        <Button color="primary" link to="/accounts">Manage Account</Button>
    </Card.Body>
</Card>
*/
{/*       <Site.Header>
                            <AccountDropdown
                                avatarURL="./demo/faces/female/25.jpg"
                                name="Jane Pearson"
                                description="Administrator"
                                options={[
                                    "profile",
                                    "logout",
                                ]}
                            />
                        </Site.Header>*/}
{/*  <Container fluid>
                    <Button className="col-md-12" color="link"><Link to="/accounts">Manage Account</Link></Button>
                </Container>*/}
