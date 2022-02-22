import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MovieCard extends React.Component {
    render() {
<<<<<<< Updated upstream
        const { movie, onMovieClick } = this.props;
        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>);
=======
        const { movie, index, onMovieClick } = this.props;


        return (

            <Card className="moviecard">
                <Card.Title >{movie.Title}</Card.Title>
                <Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" onClick={() => onMovieClick(movie)} />

            </Card>

        );
>>>>>>> Stashed changes

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
