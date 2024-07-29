import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import "./App.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="/movie/:id" element={<MovieDetailsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
