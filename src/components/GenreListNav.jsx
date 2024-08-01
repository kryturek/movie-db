import React, { useRef } from "react";

const GenreListNav = ({ genreList }) => {
	return (
		<div className="genre-list-nav">
			{genreList.map((genre) => {
				return (
					<div key={genre.id} className="genre">
						{genre.name}
					</div>
				);
			})}
		</div>
	);
};

export default GenreListNav;
