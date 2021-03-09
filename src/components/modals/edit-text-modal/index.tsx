import React, {useState} from 'react'
import {connect} from "react-redux";
import {IStore} from "../../../redux/rootReducer";
import {IText} from "../../../redux/form/reducer";
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import {showEditTextField} from "../../../redux/side-effects/actions";
import {editText} from "../../../redux/form/actions";

interface IProps {
    text: { c: IText, rid: string, cid: string } | null,
    hideModal: () => void
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => void
}

const EditTextModal = ({text, hideModal, onEditText}: IProps) => {

    const [value, setValue] = useState<string>(text?.c.name || '')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    const handleSave = () => {
        onEditText({
            rid: text!.rid,
            cid: text!.cid,
            tid: text!.c.id,
            key: 'name',
            value
        })
        hideModal()
    }

    return (
        <Modal show={!!text} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit text {text?.c.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="edit-column">Current label: {text?.c.name}</label>
                <InputGroup className="mb-3">
                    <FormControl value={value} onChange={handleChange} placeholder={text?.c.name}/>
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
    text: store.sideEffect!.editTextModal!
}), (dispatch) => ({
    hideModal: () => dispatch(showEditTextField(null)),
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => dispatch(editText(d))
}))(EditTextModal)
