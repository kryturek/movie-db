import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [redirect, setRedirect] = useState(false);

	const { userInfo, setUserInfo } = useContext(UserContext);

	async function register(ev) {
		ev.preventDefault();

		const response = await axios.post("/register", {
			username,
			email,
			password,
		});

		if (response.status === 201) {
			setRedirect(true);
		}
	}

	if (redirect) {
		return <Navigate to="/login" registered={true} />;
	}

	return (
		<div className="sign-page-wrapper">
			<form onSubmit={register}>
				<span>{userInfo.username}</span>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(ev) => setUsername(ev.target.value)}
				/>
				<input
					type="email"
					placeholder="E-mail"
					value={email}
					onChange={(ev) => setEmail(ev.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
				/>
				<input
					type="password"
					placeholder="Re-type password"
					value={password2}
					onChange={(ev) => setPassword2(ev.target.value)}
				/>
				{password !== password2 && password2.length > 2 && (
					<span className="passwordFormError">
						&#10005; passwords must match
					</span>
				)}
				{password.length > 4 && password.length < 8 && (
					<span className="passwordFormError">
						&#10005; password must be at least 8 characters long
					</span>
				)}

				{(password !== password2 && password2.length > 2) ||
				password.length < 8 ? (
					<button disabled>Register</button>
				) : (
					<button className="enabled">Register</button>
				)}

				<span>
					Already a member? Sign in{" "}
					<Link to="/login" className="link">
						here
					</Link>
				</span>
			</form>
		</div>
	);
};

export default RegisterPage;
