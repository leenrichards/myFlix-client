import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

        < div className="main" >
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
                <Form >
                    <label htmlFor="chk" aria-hidden="true" >MyFlix</label>
                    <Form.Group controlId="formLoginUsername">
                        <Form.Control type="text" name="txt" placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} required="" />
                    </Form.Group>

                    <Form.Group controlId="formLoginPassword">
                        <Form.Control type="password"
                            name="pswd"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                </Form>
            </div>

            <div className="signup">
                <Form >
                    <label htmlFor="chk" aria-hidden="true">Sign up</label>
                    <Form.Group controlId="formSigninUsername">
                        <Form.Control type="text"
                            name="txt"
                            placeholder="User name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required="" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required="" />
                    </Form.Group>

                    <Form.Group controlId="formSigninPassword">
                        <input type="password" name="pswd" placeholder="Password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} required="" />
                    </Form.Group>

                    <input type="date" name="dateofbirth" placeholder="mm/dd/yy" id="dateofbirth" />


                    <Button variant="primary" type="submit" onClick={handleSubmit}>Sign up</Button>
                </Form>
            </div>
        </div>


    );
}