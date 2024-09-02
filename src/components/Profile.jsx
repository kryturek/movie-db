import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

const Profile = () => {
	const { userInfo, setUserInfo, setLoggedIn } = useContext(UserContext);

	useEffect(() => {
		const fetchProfile = async () => {
			const response = await axios.get("/profile", {
				withCredentials: true,
			});
			if (response.status === 200) {
				setLoggedIn(true);

				setUserInfo({
					username: response.data.username,
					id: response.data.id,
					favorites: response.data.favorites,
				});
				console.log("Profile res data: ", response.data);
				console.log("Profile userInfo: ", userInfo);
			} else {
				setLoggedIn(false);
				setUserInfo({});
			}
		};

		if (!userInfo.username) {
			fetchProfile();
		}
	}, []);

	return <div className="profile-wrapper">Profile</div>;
};

export default Profile;
