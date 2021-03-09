import React from 'react'
import FormRow from "../form-row";
import uniqid from 'uniqid';
import {Container, Row} from "react-bootstrap";
import './styles.css'
import DropMarker from "../drop-marker";
import {IRow} from "../../redux/form/reducer";
import {connect} from "react-redux";
import {IStore} from "../../redux/rootReducer";
import {createRow, deleteRow} from "../../redux/form/actions";
import {activateDrag} from "../../redux/side-effects/actions";

interface IProps {
    rows: IRow[]
    onDropRow: (r: IRow) => void
    onRemove: (id: string) => void
    activateDrag: (d: { type?: null | string, active?: boolean }) => void
}

const Form = ({rows, onDropRow, onRemove, activateDrag}: IProps) => {

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        if (data !== 'ROW') {
            alert("You can't drop it in the form")
            return
        }

        onDropRow({
            id: uniqid(),
            children: [],
            type: 'ROW'
        })
    }

    const handleAllowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        activateDrag({active: true})
    }


    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
       activateDrag({active: false})
    }
    return (
        <>
            <h3>
                <strong>Form</strong>
            </h3>
            <Container>
                {rows.map((r) => (
                    <FormRow row={r} onRemove={onRemove} key={r.id}/>
                ))}
                <Row>
                    <DropMarker
                        title={'Drop Widget Here'}
                        handleAllowDrop={handleAllowDrop}
                        handleDrop={handleDrop}
                        dragComponent={'ROW'}
                        onDragLeave={onDragLeave}
                    />
                </Row>
            </Container>
        </>
    )
}

export default connect(({form}: IStore) => ({
    rows: form.children
}), (dispatch) => ({
    onDropRow: (r: IRow) => dispatch(createRow(r)),
    onRemove: (rid: string) => dispatch(deleteRow(rid)),
    activateDrag: (d: { type?: null | string, active?: boolean }) => dispatch(activateDrag(d))
}))(Form)
