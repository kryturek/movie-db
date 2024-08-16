import React, { useEffect, useRef, useState } from "react";
import search from "/browse-svgrepo-com.svg";
import lupa from "/glass-magnifier-search-zoom-alert-notification-svgrepo-com.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchSection = () => {
	const [value, setValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [focused, setFocused] = useState(false);

	const inputRef = useRef(null);

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

					setSuggestions(response.data.results.slice(0, 7));
				} catch (error) {}
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		};

		fetchSuggestions();
	}, [value]);

	// useEffect(() => {
	// 	const input = inputRef.current;
	// 	input.addEventListener("focus", () => setFocused(true));
	// 	input.addEventListener("focusout", () => setFocused(false));

	// 	return () => {
	// 		input.removeEventListener("focus", () => setFocused(true));
	// 		input.removeEventListener("focusout", () => setFocused(false));
	// 	};
	// }, []);

	function submit(ev) {
		ev.preventDefault();
		setValue("");
		setSuggestions([]);
		setShowSuggestions(false);
	}

	function handleSelection(el) {
		setValue(el.title);
		setShowSuggestions(false);
	}

	function handleUnfocus() {
		setTimeout(() => {
			setShowSuggestions(false);
		}, 500);
	}

	return (
		<section className="search-wrapper">
			<form
				onSubmit={submit}
				className="input-wrapper"
				onFocus={() => value.length > 1 && setShowSuggestions(true)}
				onBlur={handleUnfocus}
			>
				<input
					type="text"
					value={value}
					onChange={(ev) => setValue(ev.target.value)}
					placeholder="Search for a movie title..."
					ref={inputRef}
				/>

				{showSuggestions &&
					suggestions.length > 0 &&
					document.activeElement === inputRef.current && (
						<ul className="suggestions-list">
							{suggestions.map((el, index) => (
								<Link
									to={`/movie/${el.id}`}
									key={index}
									onClick={() => handleSelection(el)}
								>
									<li>
										{el.title} ({el.release_date.slice(0, 4)})
									</li>
								</Link>
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
