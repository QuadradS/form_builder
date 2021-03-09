import React from 'react'
import InfoSetup from "../info-setup";
import './styles.css'
import {editText, removeColChild} from "../../redux/form/actions";
import {connect} from "react-redux";
import {IText} from "../../redux/form/reducer";
import {showEditTextField} from "../../redux/side-effects/actions";
import {FormControl} from "react-bootstrap";

interface IProps {
    rid: string
    cid: string
    name: string
    text: IText
    onRemove: (d: { rid: string, cid: string, id: string }) => void
    onShowEditTextField: (d: { c: IText, rid: string, cid: string } | null) => void
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => void
}

const Text = ({name, rid, cid, text, onRemove, onShowEditTextField, onEditText}: IProps) => {

    const handleRemove = () => onRemove({
        cid, rid, id: text.id
    })

    const handleShowEditText = () => onShowEditTextField({
        cid, rid, c: text
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onEditText({
        rid,
        cid,
        tid: text.id,
        key: 'value',
        value: e.target.value
    })

    return (
        <div className={'text'}>
            <InfoSetup
                left={0}
                right={0}
                title={name}
                onRemove={handleRemove}
                onEdit={handleShowEditText}
            />
            <FormControl type="text" value={text.value} onChange={handleChange}/>
        </div>
    )
}

export default connect(null, (dispatch) => ({
    onRemove: (d: { rid: string, cid: string, id: string }) => dispatch(removeColChild(d)),
    onShowEditTextField: (d: { c: IText, rid: string, cid: string } | null) => dispatch(showEditTextField(d)),
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => dispatch(editText(d))
}))(Text)
