import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

// moviecard stylesheet
import './moviecard-view.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (
            <Link to={`/movies/${movie._id}`}>
                <Card className="moviecard">
                    <Card.Title >{movie.Title}</Card.Title>
                    <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />

                </Card>
            </Link>

        );

    }

}

//<Card.Body>


//           </Card.Body >
//<Card.Text>{movie.Description}</Card.Text>
//<Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired
};
