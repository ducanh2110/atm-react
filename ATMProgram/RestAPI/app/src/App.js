import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from "./Components/Home/Home";
import AccountList from "./Components/Account/AccountList";
import AccountEdit from "./Components/Account/AccountEdit";
import Login from "./Components/Home/Login"
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.checkAccount = this.checkAccount.call(this);
        // this.isLoggedIn = this.isLoggedIn.bind(this)
    }

    async checkAccount() {
        var self = this;
        await fetch('/authentication/get?token-id=' + localStorage.getItem('token-id')).then(res => res.json()).then(function (res) {
            if (res.code === '01') {
                self.setState({'loggedIn' : true})
                console.log(self.state)
            }
            if (res.code !== '01') {
                self.setState({'loggedIn': false});
                console.log('abcs')
            }
        })
    }
    isLoggedIn(Component) {
        return localStorage.getItem('token-id') ? <Component/> : <Redirect to="/login"/>
    }
    render() {

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path='/' exact={true} render={() => {
                            return this.isLoggedIn(Home)
                        }}/>
                        <Route path='/accounts' exact={true} render={() => this.isLoggedIn(AccountList)}/>
                        <Route path='/accounts/:id' exact={true} render={() => this.isLoggedIn(AccountEdit)}/>
                        <Route path='/login' exact={true} component={Login} render={() => this.isLoggedIn(Home)}/>
                        <Route path='/logout' exact={true} component={Login} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App;
