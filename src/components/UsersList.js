import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";

class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: {id: -1, value: false},
            name: '',
            showError: false,
            names: this.props.names,
            count: 0,
        };
    }

    changeUserName = (event) => {
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }

    changeUser = (id, event) => {
        if (event.target.value.trim() == '') {
            this.setState({
                ...this.state,
                showError: true
            })
        } else {
            this.setState({
                ...this.state,
                isEditing: {
                    id: -1,
                    value: false
                },
                showError: false
            })
            this.props.changeUser(id, event.target.value.trim())
        }
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
    }

    editUser = (id, name) => {
        this.setState({
            ...this.state,
            isEditing: {
                id,
                value: true
            },
            name
        });
    }

    chnageNameValue = (id, event) => {
        if (event.key == 'Enter') {
            this.changeUser(id, event);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.names != this.props.names) {
            this.setState({
                ...this.state,
                names: this.props.names
            })
        }
    }

    searchUser = (event) => {
        let names = this.props.names.filter(item => item.name.indexOf(event.target.value) > -1);

        if (event.target.value == '') {
            this.setState({
                ...this.state,
                names: this.props.names
            })
        } else {
            this.setState({
                ...this.state,
                names
            })
        }
    }

    copyUser = (id) => {
        this.props.copyUser(id);
    }

    addArchive = (id) => {
        this.props.addArchive(id)
    }

    render() {

        const {names} = this.state;

        return (
            <>
                <input type="search" className='form-control mb-2' onChange={this.searchUser}/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        names.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td onDoubleClick={() => this.editUser(item.id, item.name)}>{
                                    this.state.isEditing.value && this.state.isEditing.id == item.id ?
                                        <input type="text" onChange={this.changeUserName} value={this.state.name}
                                               onBlur={(event) => this.changeUser(item.id, event)}
                                               onKeyPress={(event) => this.chnageNameValue(item.id, event)}
                                               className={"form-control " + (this.state.showError ? 'is-invalid' : null)}/> : item.name
                                }</td>
                                <td>
                                    <Button onClick={() => this.deleteUser(item.id)}>Delete</Button>
                                    <Button className='ml-3' onClick={() => this.copyUser(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-clipboard" viewBox="0 0 16 16">
                                            <path
                                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                                            <path
                                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                                        </svg>
                                    </Button>

                                    <Button className='ml-3 bg-danger' onClick={() => this.addArchive(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                                            <path
                                                d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                    </Button>
                                </td>

                            </tr>
                        ))
                    }

                    </tbody>
                </Table>
            </>
        )
    }
}


export default UsersList;