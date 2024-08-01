import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import "./App.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [genreList, setGenreList] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		async function getGenreList() {
			try {
				const response = await axios.get(
					"https://api.themoviedb.org/3/genre/movie/list",
					{
						params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
					}
				);

				setGenreList(response.data.genres);
			} catch (error) {
				setError(error);
				console.error("Error loading list of genres:", error);
				throw error;
			}
		}

		getGenreList();
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage genreList={genreList} />} />
						<Route path="/movie/:id" element={<MovieDetailsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
