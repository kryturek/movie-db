import React, { useRef } from "react";
import { Link } from "react-router-dom";

const GenreListNav = ({ genreList }) => {
	return (
		<div className="genre-list-nav">
			{genreList.map((genre) => {
				return (
					<Link
						key={genre.id}
						className="genre"
						to={`/movies/${genre.name}`}
					>
						{genre.name}
					</Link>
				);
			})}
		</div>
	);
};

export default GenreListNav;
