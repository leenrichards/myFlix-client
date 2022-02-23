import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Login stylesheet
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        //        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <Row>
            <Col md={12} className="d-flex justify-content-center">
                < div className="main" >
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="login">
                        <Form >
                            <label htmlFor="chk" aria-hidden="true" >MyFlix</label>

                            <Form.Group >
                                <Form.Control type="text"
                                    className="inputbox"
                                    name="txt"
                                    placeholder="User name"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)} required="" />
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    value={password}
                                    className="inputbox"
                                    onChange={e => setPassword(e.target.value)}
                                    required />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                        </Form>
                    </div>

                    <div className="signup">
                        <Form className="signup-form">
                            <label htmlFor="chk" aria-hidden="true" className="signup-label">Sign up</label>
                            <Form.Group controlId="formSigninUsername">
                                <Form.Control type="text"
                                    className="inputbox"
                                    placeholder="User name"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required="" />
                            </Form.Group>

                            <Form.Group >
                                <Form.Control type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="inputbox"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required="" />
                            </Form.Group>

                            <Form.Group controlId="formSigninPassword">
                                <Form.Control type="password"
                                    name="signin-pswd"
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
                                    name="dateofbirth"
                                    placeholder="mm/dd/yy"
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit} type="submit" >Sign up</Button>
                        </Form>
                    </div>
                </div>
            </Col>
        </Row>
    );
}