import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ genre, movies }) => {
	const listRef = useRef(null);

	const scroll = (scrollOffset) => {
		listRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
	};

	return (
		<div className="movie-list">
			<span className="genre">{genre}</span>
			<div className="entries-wrapper">
				<button
					className="movie-list-nav left"
					onClick={() => scroll(-400)}
				>
					&#8249;
				</button>
				<div ref={listRef} className="entries">
					{movies.map((movie) => (
						<MovieCard
							key={movie.id}
							id={movie.id}
							title={movie.title}
							image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
							desc={movie.overview}
							rating={movie.vote_average}
							voteCount={movie.vote_count}
						/>
					))}
				</div>
				<button
					className="movie-list-nav right"
					onClick={() => scroll(400)}
				>
					&#8250;
				</button>
			</div>
		</div>
	);
};

export default MovieList;
