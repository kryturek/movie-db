import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<UserContext.Provider
			value={{ userInfo, setUserInfo, loggedIn, setLoggedIn }}
		>
			{children}
		</UserContext.Provider>
	);
};
