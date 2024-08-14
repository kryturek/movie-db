import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Profile from "./Profile";

const Layout = () => {
	return (
		<div className="layout">
			{/* <Profile /> */}
			<Header />
			<div className="content">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
