import React from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// Movie view stylesheet
import './profile-view.scss';


export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            Favorites: []
        };
    }

    keypressCallback(event) {
        console.log(event.key);
    }

    //Add Keypress event listener
    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);


    }

    //Unmount event listener
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    //render movie view
    render() {
        const { onBackClick, movies, user } = this.props;


        return (


            <Row className="justify-content-md-center">
                < Col md={12} className="user-view">
                    <Row >
                        <Col className="user-col" md={12}>
                            <div className="user-title">Hello {user.Username}!  </div>
                        </Col>
                    </Row>

                    <Row className="user-row">
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-label" >Username: </label>
                        </Col>
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-value" >{user.Username} </label>
                        </Col>
                    </Row>
                    <Row className="user-row">
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-label" >Email: </label>
                        </Col>
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-value" >{user.Email} </label>
                        </Col>
                    </Row>
                    <Row className="user-row">
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-label" >Birthday: </label>
                        </Col>
                        <Col className="user-col" md={6}>
                            <label htmlFor="chk" aria-hidden="true" className="profile-value" >{user.Birthday.slice(0, 10)} </label>
                        </Col>
                    </Row>
                    <Row className="back-row">
                        <Col >
                            <Button className="back-button" onClick={() => { onBackClick(); }} >Go Back</Button></Col>

                        <Col >
                            <Link to={`/update/${user.Username}`}>
                                <Button className="back-button"  >Update</Button>
                            </Link>
                        </Col>
                    </Row>


                </Col >

            </Row >



        )
    }
}
