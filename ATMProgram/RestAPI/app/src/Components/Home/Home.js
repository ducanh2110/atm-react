import * as React from 'react';
import '../../App.css';
import { NavLink, withRouter, Link } from 'react-router-dom';
import AppNavbar from "../NavBar/AppNavBar";
import {Site, Card} from "tabler-react";
import {Button} from "reactstrap";
import firebase from 'firebase';
const config = {
    apiKey: 'AIzaSyA6TR4PdjAkFR724-7jgQSs6lHbJHDD7LM',
    authDomain: 'amplified-hull-152819.firebaseapp.com',
    databaseURL: 'https://amplified-hull-152819.firebaseio.com/'
}
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
        let user = JSON.parse(localStorage.getItem('user'));
        let firebaseApp = firebase.initializeApp(config, 'amplified-hull-152819');

        let storage = firebaseApp.database();
        let incoming = storage.ref('incomping/' + user.phone);
        incoming.on('child_changed',  (x) => {
            alert('Thay doi roi do a Duc ')
        })

        // let starCountRef = this.storage.ref('posts/' + postId + '/starCount');
        // starCountRef.on('value', function(snapshot) {
        //     updateStarCount(postElement, snapshot.val());
        // });
        console.log(storage.ref('amplified-hull-152819'))
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
