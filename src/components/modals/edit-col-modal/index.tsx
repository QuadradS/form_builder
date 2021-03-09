import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {IStore} from "../../../redux/rootReducer";
import {ICol} from "../../../redux/form/reducer";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {showEditCol} from "../../../redux/side-effects/actions";
import {editCol} from "../../../redux/form/actions";

interface IProps {
    col: { c: ICol, rid: string } | null,
    hideModal: () => void
    onEditCol: (d: { size: string, cid: string, rid: string }) => void
}

const EditColModal = ({col, hideModal, onEditCol}: IProps) => {

    const [value, setValue] = useState<string>(`${col ? col.c.size : 3}`)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        Number(e.target.value) <= 12 && setValue(e.target.value)

    const handleSave = () => {
        if (Number(value) > 12) {
            alert('Not more 12')
            return
        }

        onEditCol({
            cid: col!.c.id,
            size: value,
            rid: col!.rid
        })
        hideModal()
    }

    useEffect(() => {
        setValue(`${col ? col.c.size : 3}`)
    }, [!!col])

    return (
        <Modal show={!!col} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit column {col?.c.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="edit-column">Current size: {col?.c.size}</label>
                <InputGroup className="mb-3">
                    <FormControl type={'number'} value={value} onChange={handleChange} placeholder={`${col?.c.size}`}/>
                </InputGroup>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default connect((store: IStore) => ({
    col: store.sideEffect.editColModal
}), (dispatch) => ({
    hideModal: () => dispatch(showEditCol(null)),
    onEditCol: (d: { size: string, cid: string, rid: string }) => dispatch(editCol(d))
}))(EditColModal)
