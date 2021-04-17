import React, {Component} from "react";
import {connect} from "react-redux";
import {addName, addArchive, changeValue, deleteUser, changeUser, copyUser, restoreArchive, LoggedIn} from "./store/actions";
import UsersList from "./components/UsersList";
import Users from "./components/Users";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Archive from "./components/Archive";
import {Button} from "react-bootstrap";
import Login from "./components/Login";

class App extends Component {  /*class based component*/
    constructor(props) {
        super(props);

        this.state = {
            showError: false
        };
    }


    addName = () => {
        if (this.props.currentName.trim() == '') {
            this.setState({
                ...this.state,
                showError: true
            })
        } else {
            this.setState({
                ...this.state,
                showError: false
            })
            this.props.addName();
        }

    }

    changeValue = (event) => {
        this.props.changeValue(event.target.value)
    }

    enterName = (event) => {
        if (event.key == 'Enter') {
            this.addName();
        }
    }

    sortUser = () => {
        console.log(this.props.names.sort(function(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }))
    }


render()
{

    const {color, names, login} = this.props;

    const btnStyle = {
        color: 'white',
        background: 'rgb(60, 60, 108)',
        border: 'none',
        padding: '8px',
        borderRadius: '5px',
        boxShadow: '4px 4px 3px #3e3e7e',
        cursor: 'pointer'
    }

    const box = {
        width: '700px',
        margin: '20px auto'
    }

    const input = {
        padding: '8px',
        borderRadius: '5px',
        marginRight: '8px',
    }

    console.log(login);
    return (
        <Router>
            <div className='container'>
                <Navigation/>
                <div className='mt-3'>
                    <Switch>
                        <Route path="/archive">
                            <Archive restoreArchive={restoreArchive}/>
                        </Route>
                        <Route path="/" exact>
                            <div className="mb-3 mx-auto" style={{width: '50%'}}>
                                {this.state.showError ? <p className="text-danger">Write correct name pls</p> : null}
                                <input type="text" value={this.props.currentName} onChange={this.changeValue}
                                       onKeyPress={this.enterName} style={input}/>
                                <button onClick={this.addName} style={btnStyle}>Add name</button>
                            </div>
                            <UsersList names={names} deleteUser={this.props.deleteUser}
                                       changeUser={this.props.changeUser}
                                       copyUser={this.props.copyUser} addArchive={this.props.addArchive}/>
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>

                        <Route path="/register">
                            <Register />
                        </Route>

                        <Route path="/login">
                            <Login LoggedIn={LoggedIn}/>
                        </Route>
                    </Switch>

                </div>
            </div>
        </Router>
    )
}
}

const mapStateToProps = (state) => ({
    color: state.color,
    currentName: state.currentName,
    names: state.names,
    archive: state.archive,
    login: state.login
})

const mapDispatchToProps = {
    addName,
    changeValue,
    deleteUser,
    changeUser,
    copyUser,
    addArchive,
    restoreArchive,
    LoggedIn
}


const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)

export default Container;
