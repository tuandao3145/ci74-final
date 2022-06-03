// libraries
import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext, logout } from "./Models/users";

//login form component
export default function LogoutModal() {
	// interact with users from Context
	const auth = useContext(AuthContext);

	// hold showing stt of login modal
	const [show, setShow] = useState(false);

	// handle show and close modal actions
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// handle log out
	const handleLogout = () => {
		auth.setCurrentUser(null);
		logout();
		handleClose();
	};

	// render login form
	return (
		<>
			<div className="login-form">
				{auth.currentUser && (
					<Button variant="primary" onClick={handleShow}>
						Logout
					</Button>
				)}

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<h2 className="text-center">Logout</h2>
					</Modal.Header>
					<Modal.Body>Are you sure you want to log out?</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={handleLogout}>
							Yes
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							No
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	);
}
