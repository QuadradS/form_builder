import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import "./app.css"
import SideBar from "./components/side-bar";
import Form from "./components/form";
import DataView from "./components/data-view";
import EditColModal from "./components/modals/edit-col-modal";
import EditTextModal from "./components/modals/edit-text-modal";
import EditSelectModal from "./components/modals/edit-select-modal";

function App() {

    return (
        <Container className={'main-container'}>
            <Row>
                <Col sm={2}>
                    <SideBar/>
                </Col>
                <Col sm={7} className={'form-container'}>
                    <Form/>
                </Col>
                <Col sm={3}>
                    <DataView/>
                </Col>
            </Row>
            <EditColModal/>
            <EditTextModal/>
            <EditSelectModal/>
        </Container>
    );
}

export default App;
