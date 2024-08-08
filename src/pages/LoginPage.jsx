import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="sign-page-wrapper">
			<form>
				<input
					type="text"
					placeholder="Username or e-mail"
					value={username}
					onChange={(ev) => setUsername(ev.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(ev) => setPassword(ev.target.value)}
				/>
				<button>Login</button>
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
