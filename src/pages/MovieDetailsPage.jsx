import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbService";
import formatCurrency from "../lib/formatCurrency";

const MovieDetailsPage = () => {
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [details, setDetails] = useState({});

	useEffect(() => {
		async function fetchDetails() {
			const fetched = await getMovieDetails(id);
			setDetails(fetched);
			setLoading(false);
		}

		fetchDetails();
	}, [id]);

	if (loading) {
		return <p>Loading ...</p>;
	}

	return (
		<div className="movie-details-page">
			<div className="overview">
				<div className="poster">
					<img src={details.poster} alt={`Poster of ${details.title}`} />
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
					{details.budget && details.revenue ? (
						<div className="money">
							<p className="budget">
								Budget: {formatCurrency(details.budget)}
							</p>
							<p className="revenue">
								Revenue: {formatCurrency(details.revenue)}
							</p>
							<p className="profit">
								{formatCurrency(details.revenue - details.budget) > 0
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
		</div>
	);
};

export default MovieDetailsPage;
