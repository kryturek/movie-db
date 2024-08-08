import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="sign-page-wrapper">
			<form>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(ev) => setUsername(ev.target.value)}
				/>
				<input
					type="text"
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
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
				/>
				<button>Register</button>
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
