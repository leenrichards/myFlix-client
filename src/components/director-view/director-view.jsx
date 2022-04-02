import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';


// Movie view stylesheet
import './director-view.scss';


export class DirectorView extends React.Component {

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
        const { director, onBackClick } = this.props;


        return (
            <Row className="justify-content-md-center">
                < Col md={12} className="director-view">
                    <Row>
                        <Col className="director-col" md={12}>
                            <div className="director-name">
                                <span className="value">{director.Name}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="director-col" md={12}>
                            <div className="director-birth">
                                <span className="value">D.O.B: {director.Birth.slice(0, 10)}.</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="director-col" md={12}>
                            <div className="director-bio">
                                <span className="value">{director.Bio}</span>
                            </div>
                        </Col>
                    </Row>


                    <Row className="back-row"><Col ><Button className="back-button" onClick={() => { onBackClick(); }} >Back</Button></Col></Row>
                    <Row><Col md={12}>  </Col></Row>
                </Col>
            </Row>
        )
    }
}


DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired,

    onBackClick: PropTypes.func.isRequired

};