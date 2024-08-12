import React, { useContext, useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { getTopRated, getPopular } from "../services/tmdbService.js";
import GenreListNav from "../components/GenreListNav.jsx";
import SearchSection from "../components/SearchSection.jsx";
import { UserContext } from "../UserContext.jsx";

const HomePage = ({ genreList }) => {
	const [topRated, setTopRated] = useState([]);
	const [popular, setPopular] = useState([]);
	const [error, setError] = useState("");
	const { userInfo, loggedIn } = useContext(UserContext);

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
					{loggedIn && <span>Welcome {userInfo.username}</span>}
					<SearchSection />
					<GenreListNav genreList={genreList} />
					<MovieList genre="Popular" movies={popular} />
					<MovieList genre="Top of All Time" movies={topRated} />
				</>
			)}
		</div>
	);
};

export default HomePage;
