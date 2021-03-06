import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavbarView } from '../navbar-view/navbar-view'
import { ProfileView } from '../profile-view/profile-view'

import './main-view.scss';

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"></link>


class MainView extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

        let accessToken = localStorage.getItem('token');

        if (accessToken != null) {
            this.props.setUser({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);

        }
    }


    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(authData) {
        this.props.setUser({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token)
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    //* Get all movies
    getMovies(token) {
        axios.get('https://lynnflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => {
                // Assign the result to the movies props
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {
        const { user, movies } = this.props;



        return (

            // --------NAVBAR---------------
            <Router>
                <NavbarView />

                <Row className="main-view justify-content-md-center">


                    <Route exact path="/" render={() => {
                        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );

                        if (movies.length === 0) return <div className="main-view" />;

                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <LoginView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                user={user}
                                onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                    <Route path='/users/:username'
                        render={({ history, match }) => {
                            if (!user) return
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (movies.length === 0) return <div className="main-view" />;

                            return <Col md={8}>
                                <ProfileView onBackClick={() => history.goBack()} movies={movies}
                                />
                            </Col>
                        }} />
                </Row>
            </Router >


        );
    }
}


let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);