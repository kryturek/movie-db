import React, { useState } from "react";
import search from "/browse-svgrepo-com.svg";
import lupa from "/glass-magnifier-search-zoom-alert-notification-svgrepo-com.svg";

const SearchSection = () => {
	const [value, setValue] = useState("");

	function submit(ev) {
		ev.preventDefault();
		setValue("");
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
				<button>
					<img src={lupa} alt="" />
				</button>
			</form>
		</section>
	);
};

export default SearchSection;
