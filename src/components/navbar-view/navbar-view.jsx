import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


// profile-update stylesheet
import './navbar-view.scss';

export function NavbarView({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
            <Navbar.Brand href="#" className="navbar-logo">MyFlix </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
                <Nav>
                    {isAuth() && (
                        <Nav.Link href={`/`} activeClassName="active" >Movies</Nav.Link>
                    )}
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`} activeClassName="active" ><div className="navbar-link">Profile</div></Nav.Link>

                    )}
                    {isAuth() && (
                        <Nav.Link onClick={() => { onLoggedOut() }} activeClassName="active">Logout</Nav.Link>
                    )}

                    {!isAuth() && (
                        <Nav.Link href="/" activeClassName="active">Sign up or login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}