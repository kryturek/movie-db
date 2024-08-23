import React from "react";
import { Link } from "react-router-dom";
import noPoster from "/no-poster.png";

const MovieCard = ({ id, title, image, rating, voteCount }) => {
	if (image === null) image = noPoster;

	return (
		<Link className="movie-card" to={`/movie/${id}`}>
			<img src={image} alt="poster" />
			<div className="text">
				<h3 className="title">
					{title.length > 32 ? `${title.slice(0, 27)}...` : title}
				</h3>
				<div className="rating">
					&#9733; {Math.round(rating * 10) / 10} ({voteCount})
				</div>
			</div>
		</Link>
	);
};

export default MovieCard;
