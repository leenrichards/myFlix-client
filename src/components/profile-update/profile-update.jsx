import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Form, Button, Container } from 'react-bootstrap';


// Movie view stylesheet
import './update-view.scss';


export function ProfileUpdate(onBackClick, user) {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, updateBirthday] = useState('');

    console.log({ user });

    return (
        <Container>


            <Form className="update-view">
                <label htmlFor="chk" aria-hidden="true" className="update-title" >Update Profile</label>
                <Form.Group controlId="formSigninUsername">
                    <Form.Control
                        type="text"
                        className="inputbox"
                        name="username"
                        placeholder="User name"
                        value={user.username}

                        onChange={e => setUsername(e.target.value)}
                        required="" />

                </Form.Group>

                <Form.Group >
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="inputbox"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                        required="" />

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

                        required="" />

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
            </Form>
            <Button variant="light" className="button" >Submit</Button>
        </Container>
    )
}

