import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getByGenre } from "../services/tmdbService";
import MovieCard from "../components/MovieCard";

const Movies = () => {
	const { genre } = useParams();

	useEffect(() => {
		getByGenre(genre).then((result) => setMovies(result));
	}, [genre]);

	const [movies, setMovies] = useState([]);

	return (
		<div className="movies-wrapper">
			<h1>{genre}</h1>
			<div className="movies-box">
				{movies.map((movie) => {
					return (
						<MovieCard
							key={movie.id}
							id={movie.id}
							title={movie.title}
							image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
							desc={movie.overview}
							rating={movie.vote_average}
							voteCount={movie.vote_count}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Movies;
