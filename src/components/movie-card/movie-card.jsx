import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

// moviecard stylesheet
import './moviecard-view.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        return (

            <Card className="moviecard">
                <Card.Title >{movie.Title}</Card.Title>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" onClick={() => onMovieClick(movie)} />

            </Card>

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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
