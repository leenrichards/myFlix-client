import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor() {
        super();
        //Initial stat is set to null
        this.state = {
            movies: [],
            seletedMovie: null,
            user: null
        };

    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            this.setState({
                user: localStorage.getItem('user')
            })
            this.getMovies(accessToken);
        }
    }


    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(authData) {
        //console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token)
    }

    //* Get all movies
    getMovies(token) {
        axios.get('https://lynnflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (

            <Router>

                <Row className="main-view justify-content-md-center">
                    <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
                        <Navbar.Brand href="#" className="navbar-logo">MyFlix </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
                            <Nav>
                                <Nav.Link active className="navbar-link" >Favourites</Nav.Link>
                                <Nav.Link >Profile</Nav.Link>
                                <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>


                    {/*Main Route*/}
                    <Route exact path="/" render={() => {

                        return movies.map(m => (
                            <Col md={4} xs={2} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    {/*Movie ID Route*/}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) {
                            return <Redirect to="/login" />;
                        }
                        if (movies.length === 0) return <div className="main-view" />;

                        <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/*Director Route*/}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) {
                            return <Redirect to="/login" />;
                        }
                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <DirectorView Director={movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/*Genres Route*/}
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) {
                            return <Redirect to="/login" />;
                        }
                        <GenreView Genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                    }} />



                </Row>

            </Router>
        );
    }

}

export default MainView;