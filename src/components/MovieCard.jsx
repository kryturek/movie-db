import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ id, title, image, rating, voteCount }) => {
	return (
		<Link className="movie-card" to={`/movie/${id}`}>
			<img src={image} alt="poster" />
			<div className="text">
				<h3 className="title">{title}</h3>
				<div className="rating">
					&#9733; {Math.round(rating * 10) / 10} ({voteCount})
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
