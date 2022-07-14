import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


import SearchMapGeo from "./SearchMapGeo";
import CurrentLocation from "./CurrentLocation";


function FindPlace() {
    return(
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first" href="#">
                            주소 검색
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second" href="#">
                            실시간 위치
                        </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <SearchMapGeo />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <CurrentLocation />
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default FindPlace;