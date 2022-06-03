// libraries
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	AuthContext,
	generateInitialUsers,
	getCurrentUser,
	getAllRanks,
} from "./components/Models/users";

// css
import "./App.css";

// components
import Home from "./components/pages/Home";

// generate data
generateInitialUsers();

// quiz app component
export default function App() {
	// handle current user
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	// handle user ranks
	const [ranks, setRanks] = useState(getAllRanks());

	// render quiz app
	return (
		<AuthContext.Provider
			value={{ currentUser, setCurrentUser, ranks, setRanks }}
		>
			<Router>
				<div className="quiz-app">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}
