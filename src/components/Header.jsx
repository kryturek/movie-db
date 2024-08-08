import React from "react";
import logoIcon from "/movie-camera-svgrepo-com.svg";
import menuIcon from "/menu-svgrepo-com.svg";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header">
			<Link className="logo" to="/">
				<img src={logoIcon} alt="Logo" />
				<span>MovieDB</span>
			</Link>

			<div className="menu">
				<div className="sign">
					<Link to="/login" className="sign-btn">
						Sign in
					</Link>
					<Link to="/register" className="sign-btn">
						Sign up
					</Link>
				</div>

				<Link>
					<img src={menuIcon} alt="Menu" />
				</Link>
			</div>
		</div>
	);
};

export default Header;
