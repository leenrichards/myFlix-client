import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


// Movie view stylesheet
import './movie-view.scss';


export class MovieView extends React.Component {

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
        const { movie, onBackClick } = this.props;
        return (

            <div className="movie-view" >
                <div className="movie-title">

                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-poster" >
                    <img src={movie.ImagePath} crossOrigin="anonymous" className='movie-image' />
                </div >

                <div className="movie-description">

                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="value">Directed by {movie.Director.Name}</span>
                </div>

                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
        )
    }
}


MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,

        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
    }),
    onBackClick: PropTypes.func.isRequired

};