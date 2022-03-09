import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';


// Movie view stylesheet
import './profile-view.scss';


export class ProfileView extends React.Component {

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
        const { user, email, onBackClick } = this.props;


        return (
            <Row className="justify-content-md-center">
                < Col md={12} >
                    <Row>
                        <Col className="user-col" md={12}>
                            <div className="user-name">
                                <span className="value">Name: {user}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="user-col" md={12}>
                            <div className="user-name">
                                <span className="value">Email: {email}</span>
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>

        )
    }
}

