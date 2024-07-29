import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbService";

const MovieDetailsPage = () => {
	const { id } = useParams();

	const [details, setDetails] = useState({});

	useEffect(() => {
		async function fetchDetails() {
			const fetched = await getMovieDetails(id);
			setDetails(fetched);
		}

		fetchDetails();
	}, [id]);

	return (
		<div>
			MovieDetailsPage of a movie with id {id}
			<div>
				<p>{details.title}</p>
			</div>
		</div>
	);
};

export default MovieDetailsPage;
