import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import PropTypes from 'prop-types';


// Login stylesheet
import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('')


    //Initialize useState Hooks 
    //  const [Birthdate, setBirthdate] = useState('');
    const [UsernameErr, setUsernameErr] = useState('');
    const [PasswordErr, setPasswordErr] = useState('');
    const [EmailErr, setEmailErr] = useState('');


    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 4) {
            setPassword('Password must be 4 characters long');
            isReq = false;
        }


        return isReq;
    }

    const valitdateEmail = () => {

        let isEmail = true;
        if (!email) {
            setEmailErr('Email required');
            isEmail = false;
        } else if (email.indexOf('@') === -1) {
            setEmail('Email must be valid');
            isEmail = false;
        }
        return isEmail;
    }

    /* ----------------Sign-up function--------------------*/
    const handleSignup = (e) => {
        e.preventDefault();

        const isReq = validate();
        const isEmail = valitdateEmail();

        if (isReq && isEmail) {
            axios.post('https://lynnflix.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    //console.log(data);
                    alert('Registration succesful, please login!');
                    window.open('/', self);

                })
                .catch(response => {
                    console.error(response);
                    alert('Sorry, unable to register.')
                })
        }
    };

    /* ---------------------Login function-----------*/
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://lynnflix.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user', e)
                })
        }
    };

    return (
        <Row>
            <Col md={12} className="d-flex justify-content-center">
                < div className="main" >
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="login">
                        <Form >
                            <label htmlFor="chk" aria-hidden="true" className="main-label" >MyFlix</label>

                            <Form.Group >
                                <Form.Control
                                    type="text"
                                    className="inputbox"
                                    name="username"
                                    placeholder="User name"
                                    value={username}
                                    isInvalid={!!UsernameErr}
                                    onChange={e => setUsername(e.target.value)} required="" />
                                <Form.Control.Feedback className="feedback" type="invalid">{UsernameErr}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control
                                    type="password"
                                    className="inputbox"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    autoComplete='off'
                                    isInvalid={!!PasswordErr}
                                />
                                <Form.Control.Feedback className="feedback" type="invalid">{PasswordErr}</Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                        </Form>
                    </div>


                    <div className="signup">
                        <Form className="signup-form">
                            <label htmlFor="chk" aria-hidden="true" className="signup-label" >Sign up</label>
                            <Form.Group controlId="formSigninUsername">
                                <Form.Control
                                    type="text"
                                    className="inputbox"
                                    name="username"
                                    placeholder="User name"
                                    value={username}
                                    isInvalid={!!UsernameErr}
                                    onChange={e => setUsername(e.target.value)}
                                    required="" />
                                <Form.Control.Feedback className="feedback" type="invalid">{UsernameErr}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="inputbox"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    isInvalid={!!EmailErr}
                                    required="" />
                                <Form.Control.Feedback className="feedback" type="invalid">{EmailErr}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formSigninPassword">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="inputbox"
                                    autoComplete="off"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    isInvalid={!!PasswordErr}
                                    required="" />
                                <Form.Control.Feedback className="feedback" type="invalid">{PasswordErr}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formDateofBirth">
                                <Form.Control
                                    type="date"
                                    className="inputbox"
                                    name="birthday"
                                    placeholder="mm/dd/yy"
                                    onChange={e => setBirthday(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSignup} type="submit" >Sign up</Button>
                        </Form>
                    </div>

                </div>
            </Col>
        </Row>
    );
}

LoginView.prototypes = {
    user: PropTypes.shape({
        usermame: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};