import React, {Component} from 'react';
import AppNavbar from "../NavBar/AppNavBar";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import { Card, Button, AccountDropdown, Site, Nav} from "tabler-react";
class Login extends Component {
    defaultUser = {
        username:'',
        password:''
    }

    constructor(props) {
        super(props);

        this.state = {
            user: this.defaultUser
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this)
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user})
    }

    async login(event) {
        event.preventDefault();
        const {user} = this.state;

        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "username=" + user.username + "&password=" + user.password,
            credentials: 'include'
        }).then(text => text.text()).then(function (res) {
            localStorage.setItem('token-id', res);
        }).then(this.props.history.push('/')).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                {/*<Site.Wrapper/>*/}
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
