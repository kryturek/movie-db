import React from "react";
import lupaIcon from "/glass-magnifier-search-zoom-alert-notification-svgrepo-com.svg";

const SearchBar = () => {
	return (
		<form className="searchbar">
			<input type="text" />
			<button>
				<img src={lupaIcon} alt="search" />
			</button>
		</form>
	);
};

export default SearchBar;
