import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	getCollection,
	getMovieDetails,
	getSimilar,
} from "../services/tmdbService";
import formatCurrency from "../lib/formatCurrency";
import MovieCard from "../components/MovieCard";
import noPoster from "/no-poster.png";
import { UserContext } from "../UserContext";
import Heart from "/heart-svgrepo-com-2.svg";
import HeartAdd from "/heart-add-svgrepo-com.svg";
import axios from "axios";

const MovieDetailsPage = () => {
	const { id } = useParams();

	const { userInfo, setUserInfo } = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState({});
	const [similarMovies, setSimilarMovies] = useState([]);
	const [favorited, setFavorited] = useState(false);

	useEffect(() => {
		async function fetchDetails() {
			const fetched = await getMovieDetails(id);
			setDetails(fetched);
			setLoading(false);
		}

		fetchDetails();
	}, [id]);

	useEffect(() => {
		console.log(userInfo);
		setFavorited(userInfo.favorites?.includes(id) ?? false);
	}, [id, userInfo.favorites]);

	useEffect(() => {
		async function fetchSimilar() {
			const response = await getSimilar(id);

			const array = response.results.slice(0, 6);

			setSimilarMovies(array);
		}

		fetchSimilar();
	}, [id]);

	const handleFav = async () => {
		setFavorited(!favorited);

		console.log(userInfo);

		let updatedFavorites;

		if (!favorited) {
			updatedFavorites = [...userInfo.favorites, id];
			setUserInfo({ ...userInfo, favorites: updatedFavorites });
		} else {
			updatedFavorites = userInfo.favorites.filter((el) => el !== id);
			setUserInfo({ ...userInfo, favorites: updatedFavorites });
		}

		try {
			const response = await axios.put(
				"/addFavourite",
				{ favorites: updatedFavorites },
				{ withCredentials: true }
			);

			if (response.status === 200) {
				console.log("Favorites updated successfully");
			} else {
				console.error("Failed to update favorites:", response.data.message);
			}
		} catch (error) {
			console.error("Error updating favorites:", error);
		}
	};

	if (loading) {
		return <p>Loading ...</p>;
	}

	return (
		<div className="movie-details-page">
			<div className="overview">
				<div className="poster">
					<img
						src={details.poster ? details.poster : noPoster}
						alt={`Poster of ${details.title}`}
					/>

					{favorited ? (
						<div className="addToFav-btn added" onClick={handleFav}>
							<img
								src={Heart}
								alt="add to favourites"
								className="heart-icon"
							/>
						</div>
					) : (
						<div className="addToFav-btn" onClick={handleFav}>
							<img
								src={HeartAdd}
								alt="remove from favourites"
								className="heart-icon"
							/>
						</div>
					)}

					<div className="rating">
						{Math.round(details.vote_average * 10)}%
					</div>
				</div>
				<div className="info">
					<div className="title">
						<h1>{details.title}</h1>
						<h4>
							{details.title !== details.original_title
								? details.original_title
								: ""}
						</h4>
					</div>

					<div className="genres">
						{details.genres.map((line, index) => {
							return (
								<div className="genrePod" key={index}>
									{line.name}
								</div>
							);
						})}
					</div>
					<p>Released on {details.release_date}</p>
					<h2 className="tagline">{details.tagline}</h2>
					<p>{details.overview}</p>
					{details.belongs_to_collection && (
						<Link to={`/collection/${details.belongs_to_collection.id}`}>
							{details.belongs_to_collection.name}
						</Link>
					)}
					{details.budget && details.revenue ? (
						<div className="money">
							<p className="budget">
								Budget: {formatCurrency(details.budget)}
							</p>
							<p className="revenue">
								Revenue: {formatCurrency(details.revenue)}
							</p>
							<p className="profit">
								{details.revenue - details.budget > 0
									? "Profit:"
									: "Loss:"}
								{formatCurrency(details.revenue - details.budget)}
							</p>
						</div>
					) : (
						""
					)}
				</div>
			</div>
			{console.log(details)}
			{similarMovies.length > 0 && (
				<div className="movies-wrapper">
					<h2>Similar movies</h2>
					<div className="movies-box">
						{similarMovies.map((movie) => {
							return (
								<MovieCard
									key={movie.id}
									id={movie.id}
									title={movie.title}
									image={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
											: null
									}
									desc={movie.overview}
									rating={movie.vote_average}
									voteCount={movie.vote_count}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieDetailsPage;
