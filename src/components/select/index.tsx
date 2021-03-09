import React from 'react'
import InfoSetup from "../info-setup";
import {editText, removeColChild} from "../../redux/form/actions";
import {connect} from "react-redux";
import {ISelect} from "../../redux/form/reducer";
import {FormControl} from "react-bootstrap";
import {showEditSelect} from "../../redux/side-effects/actions";

interface IProps {
    rid: string
    cid: string
    name: string
    select: ISelect
    onRemove: (d: { rid: string, cid: string, id: string }) => void
    onShowEditSelect: (d: { c: ISelect, rid: string, cid: string } | null) => void
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => void
}

const Select = ({name, rid, cid, select, onRemove, onShowEditSelect, onEditText}: IProps) => {
    const handleRemove = () => onRemove({
        cid, rid, id: select.id
    })

    const handleShowEditText = () => onShowEditSelect({
        cid, rid, c: select
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => onEditText({
        rid,
        cid,
        tid: select.id,
        key: 'selected',
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
            <FormControl size={'sm'} value={select.selected} onChange={handleChange} as="select" custom>
                <option value="" defaultValue={'Not chosen'} disabled hidden>Not chosen</option>
                {select.values.map((v) => <option key={v}>{v}</option>)}
            </FormControl>
        </div>
    )
}

export default connect(null, (dispatch) => ({
    onRemove: (d: { rid: string, cid: string, id: string }) => dispatch(removeColChild(d)),
    onShowEditSelect: (d: { c: ISelect, rid: string, cid: string } | null) => dispatch(showEditSelect(d)),
    onEditText: (d: { key: string, value: string, rid: string, cid: string, tid: string }) => dispatch(editText(d))
}))(Select)
