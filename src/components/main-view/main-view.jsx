import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {

            movies: [
                {
                    _id: 1,
                    Title: 'Fight Club',
                    Description: 'A depressed man suffering from insomnia meets a strange soap salesman and soon finds himself living in his squalid house after his perfect apartment is destroyed. The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives.',
                    ImagePath: 'https://m.media-amazon.com/images/I/71YFxhhSRPL._SY445_.jpg',
                    Genre: 'Action'
                },
                {
                    _id: 2,
                    Title: 'The Shawshank Redemption',
                    Description: 'The film portrays the man"s unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.',
                    ImagePath: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc3NjM4MTY3MV5BMl5BanBnXkFtZTcwODk4Mzg3OA@@._V1_UY1200_CR107,0,630,1200_AL_.jpg',
                    Genre: 'Drama'
                },
                {
                    _id: 3,
                    Title: 'Inception',
                    Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
                    ImagePath: 'https://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
                    Genre: 'Action'
                }
            ],
            seletedMovie: null
        };
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }
}

export default MainView;