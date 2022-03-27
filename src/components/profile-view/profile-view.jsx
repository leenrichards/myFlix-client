import React from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import Button from 'react-bootstrap/Button';

import { Form, Button, Container } from 'react-bootstrap';
// Movie view stylesheet
import './profile-view.scss';


export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            email: "",
            birthday: "",
            Favorites: []
        };
    }

    //Get user information based on username
    getUser(token) {
        const userId = localStorage.getItem('user');

        axios.get(`https://lynnflix.herokuapp.com/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            //  console.log("get user", res.data)


            this.setState({
                username: res.data.Username,
                password: res.data.Password,
                email: res.data.Email,
                birthday: res.data.Birthday,
                favorites: res.data.Favorites
            })


        }).catch(function (err) {
            console.log("get user error")
            console.log(err);
            console.log(err.response.data);
        });
    }

    //Update user information based on username
    updateUser = (e) => {

        e.preventDefault();
        const userId = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        console.log("this.state:", this.state);

        axios
            .put(
                `https://lynnflix.herokuapp.com/users/${userId}`,
                {
                    Username: this.state.username,
                    Password: this.state.password,
                    Email: this.state.email,
                    Birthday: this.state.birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                });

                localStorage.setItem('user', this.state.username);
                alert("Profile updated");
                window.open('/users/:user', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    //Delete user
    DeleteUser() {
        const userId = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .delete(`https://lynnflix.herokuapp.com/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Component mounted
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }


    setUsername(value) {
        this.setState({
            Username: value,
        });
    }

    setPassword(value) {
        this.setState({
            password: value,
        });
    }

    setEmail(value) {
        this.setState({
            email: value,
        });
    }

    setBirthday(value) {
        this.setState({
            birthday: value,
        });
    }

    //render movie view
    render() {
        const { onBackClick, movies } = this.props;


        return (

            <Container>
                <Form
                    className="update-form"
                    onSubmit={(e) =>
                        this.updateUser(
                            e,
                            this.username,
                            this.password,
                            this.email,
                            this.birthday
                        )
                    }
                >
                    <label htmlFor="chk" aria-hidden="true" className="profile-title" >Hello {this.state.username}!  </label>
                    <Form.Group controlId="formSigninUsername">
                        <Form.Control
                            type="text"
                            className="inputbox"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={e => this.setUsername(e.target.value)}
                            required="" />

                    </Form.Group>

                    <Form.Group >
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="inputbox"
                            value={this.state.email}
                            onChange={e => this.setEmail(e.target.value)}
                            required="" />

                    </Form.Group>

                    <Form.Group controlId="formSigninPassword">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="inputbox"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={e => this.setPassword(e.target.value)}
                            required="" />

                    </Form.Group>

                    <Form.Group controlId="formDateofBirth">
                        <Form.Control
                            type="date"
                            className="inputbox"
                            value={Moment(this.state.birthday).format('YYYY-MM-DD')}
                            name="birthday"
                            placeholder="mm/dd/yy"
                            onChange={e => this.setBirthday(e.target.value)}
                        />
                    </Form.Group>
                    <Button className="update-button" type="submit" >Update</Button>
                    <Button className="delete-button" onClick={() => this.DeleteUser()}>Delete </Button>

                </Form>


            </Container>


        )
    }
}



