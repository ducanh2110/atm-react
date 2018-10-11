import React, {Component} from 'react';
import AppNavbar from "../NavBar/AppNavBar";
import { Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Card, Button, AccountDropdown, Site, Nav, Alert} from "tabler-react";
import {Redirect} from "react-router-dom";
class Login extends Component {
    defaultUser = {
        username:'',
        password:''
    }

    constructor(props) {
        super(props);

        this.state = {
            user: this.defaultUser,
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }


    componentWillUnmount() {
        this.setState({user: {}})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user})
    }

    async login() {
        const {user} = this.state;

        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "username=" + user.username + "&password=" + user.password,
            credentials: 'include'
        }).then(text => {
            return text.text()
        }).then(function (res) {

            localStorage.setItem('token-id', res);
            return fetch('/authentication/get?token-id=' + res);
        }).then(
            res => res.json()
        ).then(res => {
            if (res.code === '01') {
                this.props.history.push('/')
            }

            if (res.code !== '01') {
                this.setState({
                    'loggedIn': false
                })
            }
        }).catch(err =>  console.log(err))
    }

    isLoggedIn() {
        return (<Alert type="danger" hasExtraSpace>
                <strong>Tài khoản không chính xác!</strong> Chi tiết liên hệ kỹ thuật.
            </Alert>
        )
    }
    render() {

        return (
            <div>
                <strong style={{'font-size' : '50px'}}>SALE SUPPORT</strong>
                {this.state.loggedIn == false ? this.isLoggedIn() : ''}
                <Container className="col-md-5">
                    <div>
                        <Label for="username">username</Label>
                        <Input type="text" name="username" id="username" onChange={this.handleChange} autoComplete="username"/>
                        <Label for="password">Password</Label>
                        <Input type="text" name="password" id="password" onChange={this.handleChange} autoComplete="password-level1"/>
                        <Button color="primary" name="login" id="login" onClick={this.login}>Login</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
