import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { getTopRated, getPopular } from "../services/tmdbService.js";

const HomePage = () => {
	const [topRated, setTopRated] = useState([]);
	const [popular, setPopular] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function getMovies() {
			try {
				const fetchedTop = await getTopRated();
				const fetchedPopular = await getPopular();
				setTopRated(fetchedTop);
				setPopular(fetchedPopular);
			} catch (error) {
				console.error("Error in useEffect on HomePage:", error);
				setError(error);
				throw error;
			}
		}

		getMovies();
	}, []);

	return (
		<div className="home-page">
			{error ? (
				<p>{error}</p>
			) : (
				<>
					<MovieList genre="Popular" movies={popular} />
					<MovieList genre="Top of All Time" movies={topRated} />
				</>
			)}
		</div>
	);
};

export default HomePage;
