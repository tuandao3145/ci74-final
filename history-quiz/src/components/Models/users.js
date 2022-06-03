// libraries
import React from "react";
import shortid from "shortid";

// generate demo users list
export function generateInitialUsers() {
	const initialData = [
		{
			id: shortid.generate(),
			name: "Admin",
			email: "admin",
			password: "123",
			point: 10,
		},
		{
			id: shortid.generate(),
			name: "User 01",
			email: "user.01",
			password: "123",
			point: 32,
		},
		{
			id: shortid.generate(),
			name: "User 02",
			email: "user.02",
			password: "123",
			point: 21,
		},
		{
			id: shortid.generate(),
			name: "User 03",
			email: "user.03",
			password: "123",
			point: 78,
		},
		{
			id: shortid.generate(),
			name: "User 04",
			email: "user.04",
			password: "123",
			point: 78,
		},
		{
			id: shortid.generate(),
			name: "User 05",
			email: "user.05",
			password: "123",
			point: 45,
		},
		{
			id: shortid.generate(),
			name: "User 06",
			email: "user.06",
			password: "123",
			point: 4,
		},
	];
	// check existing users list
	if (!localStorage.getItem("users")) {
		localStorage.setItem("users", JSON.stringify(initialData));
	}
}

// get users list from local storage
export function getUsers() {
	let json = localStorage.getItem("users");
	return !json ? [] : JSON.parse(json);
}

// get existing logged user aka current user
export function getCurrentUser() {
	const json = localStorage.getItem("current-user");

	return json ? JSON.parse(json) : null;
}

// handle login user => user and message
export function login(email, password) {
	const users = getUsers();

	let err = "";

	let foundEmail = users.find(
		(user) => user.email.toLowerCase() === email.toLowerCase()
	);

	let foundUser = users.find(
		(user) =>
			user.email.toLowerCase() === email.toLowerCase() &&
			user.password === password
	);

	if (!foundEmail) {
		err = "This user is not exist";
	}

	if (foundEmail && !foundUser) {
		err = "Password does not matched";
	}

	if (foundUser) {
		localStorage.setItem("current-user", JSON.stringify(foundUser));
	}
	return { user: foundUser, err: err };
}

// handle clear current user after logging out
export function logout() {
	localStorage.removeItem("current-user");
}

// handle sign up a new user
export function signup(name, email, password) {
	const users = getUsers();

	let newUser = {};

	let err = "";

	let foundEmail = users.find(
		(user) => user.email.toLowerCase() === email.toLowerCase()
	);

	if (foundEmail) {
		err = "This email has been taken";
	} else {
		newUser = {
			id: shortid.generate(),
			name: name,
			email: email,
			password: password,
			point: 0,
		};

		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));

		localStorage.setItem("current-user", JSON.stringify(newUser));
	}
	return { user: newUser, err: err };
}

// get rank of a user
export const getAllRanks = () => {
	const users = getUsers();
	const ranks = users.sort((a, b) => (a.point < b.point ? 1 : -1));
	return ranks;
};

// create auth context to save users data
export const AuthContext = React.createContext(null);
