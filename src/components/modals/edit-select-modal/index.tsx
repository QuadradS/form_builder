import React, {useEffect, useState} from 'react'
import {Button, FormGroup, ListGroup, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {IStore} from "../../../redux/rootReducer";
import {showEditSelect, showEditTextField} from "../../../redux/side-effects/actions";
import {ISelect} from "../../../redux/form/reducer";
import {editSelect} from "../../../redux/form/actions";

interface IProps {
    select: { c: ISelect, rid: string, cid: string } | null,
    hideModal: () => void
    onEditSelect: (d: { key: string, value: string[] | string, rid: string, cid: string, id: string }) => void
}

const EditSelectModal = ({hideModal, select, onEditSelect}: IProps) => {

    const [values, setValues] = useState<string[]>(select?.c?.values || [])
    const [value, setValue] = useState<string>('')
    const [name, setName] = useState<string>('')

    const handleSave = () => {
        onEditSelect({
            key: 'value',
            rid: select!.rid,
            cid: select!.cid,
            id: select!.c.id,
            value: values
        })
        if (name) {
            onEditSelect({
                key: 'name',
                rid: select!.rid,
                cid: select!.cid,
                id: select!.c.id,
                value: name
            })
        }
        hideModal()
    }

    const onAdd = () => {
        const isUniq = !values.find((v) => v === value)
        if (isUniq && value) {
            setValues([...values, value])
        }
    }
    const onDelete = (value: string) => () => setValues(values.filter((v) => v !== value))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

    useEffect(() => {
        setValues(select?.c?.values || [])
    }, [select])

    return (
        <Modal show={!!select} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Select {select?.c?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="select_name">Name</label>
                <FormGroup
                    placeholder={select?.c?.name || ''}
                    id={'select_name'}
                    onChange={handleChangeName}
                    style={{width: '100%'}}
                    as={'input'}
                />
                <label htmlFor="select_options">Options</label>
                <ListGroup>
                    {values.map((v) => (
                        <ListGroup.Item key={v} style={{display: 'flex'}}>
                            {v}
                            <Button variant="secondary" style={{marginLeft: 'auto'}}
                                    onClick={onDelete(v)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <FormGroup id={'select_options'} onChange={handleChange} style={{width: '100%', marginTop: '15px'}}
                           as={'input'}/>
                <Button variant="primary" onClick={onAdd}>
                    Add
                </Button>
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
    select: store.sideEffect!.editSelectModal
}), (dispatch) => ({
    hideModal: () => dispatch(showEditSelect(null)),
    onEditSelect: (d: { key: string, value: string[] | string, rid: string, cid: string, id: string }) => dispatch(editSelect(d))
}))(EditSelectModal)
