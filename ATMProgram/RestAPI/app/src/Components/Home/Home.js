import * as React from 'react';
import '../../App.css';
import { NavLink, withRouter, Link } from 'react-router-dom';
import AppNavbar from "../NavBar/AppNavBar";
import {Site, Card} from "tabler-react";
import {Button} from "reactstrap";
class Home extends React.Component {
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
        return (<Site>
            <AppNavbar/>
            </Site>
        );
    }
}

export default Home;

{/*  <Container fluid>
                    <Button className="col-md-12" color="link"><Link to="/accounts">Manage Account</Link></Button>
                </Container>*/}
