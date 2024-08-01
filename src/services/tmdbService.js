// import "dotenv/config.js";
import axios from "axios";

const tmdb = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: import.meta.env.VITE_TMDB_API_KEY,
	},
});

export async function getTopRated() {
	try {
		const response = await tmdb.get("/movie/top_rated");
		// console.log(response);
		return response.data.results;
	} catch (error) {
		console.error("Error fetching top movies: ", error);
		throw error;
	}
}

export async function getPopular() {
	try {
		const response = await tmdb.get("/movie/popular");
		return response.data.results;
	} catch (error) {
		console.error("Error fetching popular movies: ", error);
		throw error;
	}
}

export async function getMovieDetails(id) {
	try {
		const response = await tmdb.get(`/movie/${id}`);
		const data = response.data;

		return {
			...data,
			poster: data.poster_path
				? `https://image.tmdb.org/t/p/w500${data.poster_path}`
				: null,
		};
	} catch (error) {
		console.error(`Error fetching movie with id ${id}:`, error);
		throw error;
	}
}

export async function getSimilar(id) {
	try {
		const response = tmdb.get(`/movie/${id}/similar`);
		const data = response.data;

		return data;
	} catch (error) {
		console.error("Error fetching info about similar movies: ", error);
	}
}
