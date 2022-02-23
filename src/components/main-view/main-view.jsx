import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"></link>


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
        axios.get('https://lynnflix.herokuapp.com/movies')
            .then(Response => {
                this.setState({
                    movies: Response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(user) {
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

            // --------NAVBAR---------------



            <Row className="main-view justify-content-md-center">
                <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
                    <Navbar.Brand href="#" className="navbar-logo">MyFlix </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link active className="navbar-link" >Favourites</Nav.Link>
                            <Nav.Link >Profile</Nav.Link>
                            <Nav.Link >Logout</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? (

                        <Col md={8} >
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>

                    )

                    : movies.map(movie => (
                        <Col md={4} xs={2} key={movie._id}>
                            <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                        </Col>

                    ))
                }

            </Row>
        );
    }
}

export default MainView;