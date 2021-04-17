import React from "react";
import {Nav, Navbar, NavLink} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const Navigation = () => {

    const count = {
        position: 'absolute',
        top: '0',
        background: 'red',
        width: '20px',
        height: '20px',
        borderRadius: '180px',
        textAlign: 'center',
    }

    const archive = {
        position: 'relative'
    }

    const archiveRedux = useSelector(state => state.archive);

    console.log('archiveRedux', archiveRedux.length);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to={'archive'} className='text-white ml-3' activeClassName='text-danger'>
                    Archive <span className="badge badge-light">{archiveRedux.length}</span>
                </Link>
                <Link exact to={'/'} className='text-white ml-3' activeClassName='text-danger'>
                    Home
                </Link>
                <Link to={'/users'} className='text-white ml-3' activeClassName='text-danger'>
                    Users
                </Link>

                <Link to={'/register'} className='text-white ml-3' activeClassName='text-danger'>
                    Register
                </Link>

                <Link to={'/login'} className='text-white ml-3' activeClassName='text-danger'>
                    Login
                </Link>

            </Nav>
        </Navbar>
    )

}


export default Navigation;