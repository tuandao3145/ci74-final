// libraries
import React, { useContext } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { AuthContext } from "./Models/users";

// css
import "../css/SideBar.css";

// components
import LoginForm from "./LoginForm";
import LogoutModal from "./LogoutModal";
import SignupForm from "./SignupForm";

// side bar component
export default function SideBar() {
	// handle active link
	const navLinkClassName = ({ isActive }) =>
		isActive ? "nav-link text-primary" : "nav-link";

	// interact with users from Context
	const auth = useContext(AuthContext);

	// render side bar
	return (
		<>
			<div className="sidebar">
				<Container>
					<h3>History Quiz App</h3>
					<Row className="sidebar-header">
						<Col>
							<LoginForm />
						</Col>
						<Col>
							<SignupForm />
						</Col>
					</Row>
					<Row className="sidebar-body">
						<Accordion>
							<Accordion.Item eventKey="0">
								<Accordion.Header>Ranking Board</Accordion.Header>
								<Accordion.Body>
									<ul>
										{auth.ranks.map((user, index) => (
											<li key={index}>
												<span>Rank {index + 1}:</span>
												{auth.currentUser && user.id === auth.currentUser.id ? (
													<span style={{ color: "red" }}>{user.name}</span>
												) : (
													<span>{user.name}</span>
												)}
											</li>
										))}
									</ul>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</Row>
					<Row className="sidebar-footer">
						<LogoutModal />
					</Row>
				</Container>
			</div>
		</>
	);
}
