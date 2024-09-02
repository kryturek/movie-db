import React, { useContext } from "react";
import logoIcon from "/movie-camera-svgrepo-com.svg";
import menuIcon from "/menu-svgrepo-com.svg";
import userIcon from "/user-alt-1-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import Profile from "./Profile";

const Header = () => {
	const { userInfo, setUserInfo, loggedIn, setLoggedIn } =
		useContext(UserContext);

	async function logout() {
		try {
			await axios.post("/logout", {}, { withCredentials: true });
			setUserInfo({});
			setLoggedIn(false);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="header">
			<Profile />
			<Link className="logo" to="/">
				<img src={logoIcon} alt="Logo" />
				<span>MovieDB</span>
			</Link>

			<div className="menu">
				{!loggedIn ? (
					<div className="sign">
						<Link to="/login" className="sign-btn">
							Sign in
						</Link>
						<Link to="/register" className="sign-btn">
							Sign up
						</Link>
					</div>
				) : (
					<div className="sign">
						<Link to="/" className="sign-btn username">
							<img className="avatar" src={userIcon} alt="user icon" />
							{userInfo.username.length > 12
								? "user"
								: userInfo.username}
						</Link>
						<Link onClick={logout} className="sign-btn">
							Logout
						</Link>
					</div>
				)}

				<Link className="hamburger">
					<img src={menuIcon} alt="Menu" />
				</Link>
			</div>
		</div>
	);
};

export default Header;
