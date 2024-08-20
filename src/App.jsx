import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import "./App.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import Profile from "./components/Profile";
import Movies from "./pages/Movies";

axios.defaults.baseURL =
	import.meta.env.VITE_AXIOS_BASE_URL || "http://localhost:4000";

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
				{
				}
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
			<UserContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route
								index
								element={<HomePage genreList={genreList} />}
							/>
							<Route path="/movie/:id" element={<MovieDetailsPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							{/* <Route path="/profile" element={<Profile />} /> */}
							<Route path="/movies/:genre" element={<Movies />} />
							<Route path="/collection/:name" element={<Movies />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</UserContextProvider>
		</>
	);
}

export default App;
