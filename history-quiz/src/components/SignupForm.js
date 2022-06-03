// libraries
import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext, signup } from "./Models/users";

// signup form component
export default function SignupForm() {
	// interact with users from Context
	const auth = useContext(AuthContext);

	// hold showing stt of login modal
	const [show, setShow] = useState(false);

	// handle show and close modal actions
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// hold email, password and error
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [signupErr, setSignupErr] = useState("");

	// handle login action
	const handleSignupForm = (event) => {
		event.preventDefault();

		if (!name) {
			setSignupErr("Input your name");
		}
		if (name && !email) {
			setSignupErr("Input your email");
		}
		if (name && email && !password) {
			setSignupErr("Input your password");
		}
		if (name && email && password !== confirmPassword) {
			setSignupErr("Confirm password is not matched");
		}
		if (name && email && password === confirmPassword) {
			const signupData = signup(name, email, password);

			if (!signupData.user) {
				setSignupErr(signupData.err);
			} else {
				handleClose();
				auth.setCurrentUser(signupData.user);
			}
		}
	};

	// render signup form
	return (
		<>
			<div className="signup-form">
				{!auth.currentUser && (
					<Button variant="primary" onClick={handleShow}>
						Sign-up
					</Button>
				)}
				<Modal show={show} onHide={handleClose}>
					<Form
						className="bg-white p-3 border rounded shadow-sm"
						onSubmit={handleSignupForm}
					>
						<Modal.Header closeButton>
							<h2 className="text-center">Sign-up your account!</h2>
						</Modal.Header>

						<Modal.Body>
							<Form.Group className="mb-3">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									onChange={(event) => setName(event.target.value)}
								/>
							</Form.Group>

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

							<Form.Group className="mb-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									onChange={(event) => setConfirmPassword(event.target.value)}
								/>
							</Form.Group>

							<div className="text-danger">{signupErr}</div>
						</Modal.Body>

						<Modal.Footer>
							<Button type="submit" variant="primary">
								Sign-up
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
