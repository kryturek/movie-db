import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [redirect, setRedirect] = useState(false);

	const { setUserInfo, setLoggedIn } = useContext(UserContext);
	const location = useLocation();

	const justRegistered = location.state?.justRegistered;

	async function login(ev) {
		ev.preventDefault();
		setError(null);
		try {
			const response = await axios.post(
				"/login",
				{ username: username.toLowerCase(), password },
				{ withCredentials: true }
			);
			if (response.status >= 400) {
				throw err;
			}

			if (response.status === 200) {
				setUserInfo({
					username: response.data.username,
					id: response.data.id,
					favorites: response.data.favorites,
				});
				setLoggedIn(true);
				setRedirect(true);
			}
		} catch (error) {
			setError(error.response.data.message);
			console.error(error.response);
		}
	}

	if (redirect) {
		return <Navigate to="/" />;
	}

	return (
		<div className="sign-page-wrapper">
			<form onSubmit={login}>
				{error && <span>{error}</span>}
				{justRegistered && (
					<div className="sign-page-info">
						<span>Registration successful! You can login now!</span>
					</div>
				)}
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(ev) => setUsername(ev.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
				/>
				<button className="enabled">Login</button>
				<span>
					Not a member yet? Sign up{" "}
					<Link to="/register" className="link">
						here
					</Link>
				</span>
			</form>
		</div>
	);
};

export default LoginPage;
