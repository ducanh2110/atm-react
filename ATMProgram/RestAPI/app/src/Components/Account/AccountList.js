import React, {Component} from 'react';
import AppNavbar from "../NavBar/AppNavBar";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
class AccountList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, accounts: []
        }
        this.remove= this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('/api/accounts',{
            headers: {
                'token-id': localStorage.getItem('token-id')
            }
        }).then(response => response.json())
            .then(data => this.setState({accounts: data.data, isLoading: false}))
            .catch( () => {
                alert("Vui lòng đăng nhâp lại");
                localStorage.clear();
                window.location.href = "/login"
            });
    }

    componentWillUpdate(nextProps, nextState) {
    }

    /*   componentDidUpdate(prevProps, prevState) {
           if(prevProps !== this.props) {
               fetch('/api/accounts', {
                   headers: {
                       'token-id': '516a9a4f-3d6c-4645-a0ac-4653a632790e'
                   }
               }).then(response => response.json())
                   .then(data => this.setState({accounts: data.data, isLoading: false}));
           }
           if (prevState !== this.state) {
               fetch('/api/accounts', {
                   headers: {
                       'token-id' : '516a9a4f-3d6c-4645-a0ac-4653a632790e'
                   }
               }).then(response => response.json())
                   .then(data => this.setState({accounts: data.data, isLoading: false}));
           }
       }*/


    componentWillUnmount() {
        this.setState({
            accounts: [],
            isLoading:true
        })
    }


    async remove(id) {
        await fetch(`/api/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token-id' : localStorage.getItem('token-id')
            }
        }).then(() => {
            let updatedAccounts = [...this.state.accounts].filter(i => i.id !== id);
            this.setState({accounts : updatedAccounts})
        }) .catch( () => {
            alert("Vui lòng đăng nhâp lại");
            localStorage.clear();
            window.location.href = "/login"
        });
    }
    render() {
        const {accounts, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const accountList = accounts.map(acc => {
            return <tr key={acc.id}>
                <td style={{whiteSpace: 'nowrap'}}>{acc.id}</td>
                <td>{acc.username}</td>
                <td>{acc.accountNumber}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/accounts/" + acc.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(acc.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/accounts/new">Add Accounts</Button>
                    </div>
                    <h3>My Account List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Id</th>
                            <th width="20%">UserName</th>
                            <th width="20%">AccountNumber</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {accountList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AccountList;
