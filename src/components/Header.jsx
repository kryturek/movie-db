import React from "react";
import logoIcon from "/movie-camera-svgrepo-com.svg";
import menuIcon from "/menu-svgrepo-com.svg";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header">
			<Link className="logo" to="/">
				<img src={logoIcon} alt="Logo" />
				<span>MovieDB</span>
			</Link>

			<SearchBar />

			<a href="#" className="menu">
				<img src={menuIcon} alt="Menu" />
			</a>
		</div>
	);
};

export default Header;
