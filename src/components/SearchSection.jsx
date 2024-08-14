import React, { useEffect, useState } from "react";
import search from "/browse-svgrepo-com.svg";
import lupa from "/glass-magnifier-search-zoom-alert-notification-svgrepo-com.svg";
import axios from "axios";

const SearchSection = () => {
	const [value, setValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	useEffect(() => {
		const fetchSuggestions = async () => {
			if (value.length > 1) {
				setShowSuggestions(true);
				try {
					const response = await axios.get(
						"https://api.themoviedb.org/3/search/movie",
						{
							params: {
								api_key: import.meta.env.VITE_TMDB_API_KEY,
								query: value,
								include_adult: true,
							},
						}
					);

					setSuggestions(response.data.results.slice(0, 5));
				} catch (error) {}
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		};

		fetchSuggestions();
	}, [value]);

	function submit(ev) {
		ev.preventDefault();
		setValue("");
		setSuggestions([]);
		setShowSuggestions(false);
	}

	return (
		<section className="search-wrapper">
			<form onSubmit={submit} className="input-wrapper">
				<input
					type="text"
					value={value}
					onChange={(ev) => setValue(ev.target.value)}
					placeholder="Search for a movie..."
				/>

				{showSuggestions && suggestions.length > 0 && (
					<ul className="suggestions-list">
						{suggestions.map((el, index) => (
							<li key={index}>
								{el.title} ({el.release_date.slice(0, 4)})
							</li>
						))}
					</ul>
				)}
				{value.length > 0 ? (
					<button>&#10005;</button>
				) : (
					<button>
						<img src={lupa} alt="" />
					</button>
				)}
			</form>
		</section>
	);
};

export default SearchSection;
