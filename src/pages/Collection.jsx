import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../services/tmdbService";
import MovieCard from "../components/MovieCard";

const Collection = () => {
	const { id } = useParams();
	const [collectionDetails, setCollectionDetails] = useState(null);
	const [backdropPath, setBackdropPath] = useState("");

	useEffect(() => {
		getCollection(id)
			.then((response) => {
				setCollectionDetails(response);
				if (response.backdrop_path) {
					setBackdropPath(
						`https://image.tmdb.org/t/p/original${response.backdrop_path}`
					);
				}
			})
			.catch((err) => console.error("collection getting error:", err));
	}, [id]);

	const backgroundStyle = {
		display: "flex",
		justifyContent: "center", // Horizontally centers the h1
		alignItems: "flex-end", // Vertically center (if needed)
		backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1)), url(${backdropPath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		minHeight: "30vh",
		width: "100%", // Full width container
		color: "black",
	};

	const headingStyle = {
		display: "inline-block",
		textAlign: "center", // Ensure text inside h1 is centered
		margin: 0, // Remove any default margin
	};

	if (!collectionDetails) {
		return <div>Loading...</div>; // Handle loading state
	}

	return (
		<div className="movies-wrapper">
			<div style={backgroundStyle}>
				<h1 style={headingStyle}>{collectionDetails.name}</h1>
			</div>
			<h3>{collectionDetails.overview}</h3>
			<div className="movies-box">
				{collectionDetails.parts.map((movie) => {
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

export default Collection;
