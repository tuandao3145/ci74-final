// libraries
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// components
import SideBar from "../SideBar";
import SearchBox from "../SearchBox";
import HomeFact from "../HomeFact";
import TimeLine from "../TimeLine";
import QuizList from "../QuizList";

// Home page component
export default function Home() {
	// render home page
	return (
		<div className="home-page">
			<Container>
				<Row>
					<Col md={3}>
						<SideBar />
					</Col>
					<Col md={6}>
						<SearchBox />
						<HomeFact />
						<QuizList />
					</Col>
					<Col md={3}>
						<TimeLine />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
