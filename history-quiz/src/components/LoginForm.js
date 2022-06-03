// libraries
import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext, login } from "./Models/users";

//login form component
export default function LoginForm() {
	// interact with users from Context
	const auth = useContext(AuthContext);

	// hold showing stt of login modal
	const [show, setShow] = useState(false);

	// handle show and close modal actions
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// hold email, password and error
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginErr, setLoginErr] = useState("");

	// handle login action
	const handleLoginForm = (event) => {
		event.preventDefault();

		if (!email) setLoginErr("Input your email");
		if (email && !password) setLoginErr("Input your password");

		if (email && password) {
			const loginData = login(email, password);

			if (!loginData.user) {
				setLoginErr(loginData.err);
			} else {
				handleClose();
				auth.setCurrentUser(loginData.user);
			}
		}
	};

	// handle get rank of user
	const userRank = auth.currentUser
		? auth.ranks.findIndex((user) => user.id === auth.currentUser.id) + 1
		: NaN;
	// render login form
	return (
		<>
			<div className="login-form">
				{auth.currentUser ? (
					<>
						<h3>{auth.currentUser.name}</h3>
						<h3>Rank: {userRank}</h3>
					</>
				) : (
					<Button variant="primary" onClick={handleShow}>
						Login
					</Button>
				)}

				<Modal show={show} onHide={handleClose}>
					<Form
						className="bg-white p-3 border rounded shadow-sm"
						onSubmit={handleLoginForm}
					>
						<Modal.Header closeButton>
							<h2 className="text-center">Login to your account</h2>
						</Modal.Header>
						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									onChange={(event) => setEmail(event.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</Form.Group>
							<div className="text-danger">{loginErr}</div>
						</Modal.Body>
						<Modal.Footer>
							<Button type="submit" variant="primary">
								Login
							</Button>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</div>
		</>
	);
}
