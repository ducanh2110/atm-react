import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from "../NavBar/AppNavBar";
class AccountEdit extends Component {
    emptyInfo = {
        username:'',
        accountNumber:'',
        password:''
    }

    constructor(props) {
        super(props);
        this.state = {
            info: this.emptyInfo
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const account = await (await  fetch(`/accounts/${this.props.match.params.id}`, {
                headers: {
                    'token-id': localStorage.getItem('token-id')
                }
            }).catch(function () {
                alert("Vui lòng đăng nhâp lại")
                window.location.href = "/login"
            })).json();
            this.setState({info: account.data})
        }
    }

    componentWillUnmount() {
        this.setState({info: {}})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let info = {...this.state.info};
        info[name] = value;
        this.setState({info})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {info} = this.state;
        var x = await fetch('/api/accounts', {
            method: (info.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token-id' : localStorage.getItem('token-id')
            },
            body: JSON.stringify(info),
        }).then(this.props.history.push('/accounts')).catch(function () {
            alert("Vui lòng đăng nhâp lại")
            window.location.href = "/login"
        }) .catch(function () {
            alert("Vui lòng đăng nhâp lại")
            window.location.href = "/login"
        });

    }

    render() {
        const {info} = this.state;
        const title = <h2>{info.id ? 'Edit Account' : 'Add Account'}</h2>
        return (
            <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="username">username</Label>
                            <Input type="text" name="username" id="username" value={info.username || ''}
                                   onChange={this.handleChange} autoComplete="username"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="accountNumber">accountNumber</Label>
                            <Input type="text" name="accountNumber" id="accountNumber" value={info.accountNumber || ''}
                                   onChange={this.handleChange} autoComplete="accountNumber-level1"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="text" name="password" id="password" value={info.password || ''}
                                   onChange={this.handleChange} autoComplete="password-level1"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/accounts">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(AccountEdit);
