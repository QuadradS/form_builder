import React from 'react'
import {Col, ColProps} from "react-bootstrap";
import InfoSetup from "../info-setup";
import './styles.scss'
import {ICol} from "../../redux/form/reducer";
import {connect} from "react-redux";
import {createSelect, createText, removeCol} from "../../redux/form/actions";
import {activateDrag, showEditCol} from "../../redux/side-effects/actions";
import DragMarker from "../drag-marker";

interface IProps extends ColProps {
    rid: string
    col: ICol
    onCreateText: (d: { rid: string, cid: string }) => void
    onRemoveCol: (d: { rid: string, cid: string }) => void
    showEditCol: (c: { c: ICol, rid: string } | null) => void
    createSelect: (d: { rid: string, cid: string }) => void
    activateDrag: (d: { type?: null | string, active?: boolean }) => void
}

const FormCol = ({
                     children,
                     onRemoveCol,
                     col,
                     onCreateText,
                     rid,
                     showEditCol,
                     createSelect,
                     activateDrag,
                     ...props
                 }: IProps) => {

    const handleRemove = () => {
        onRemoveCol({
            rid,
            cid: col.id
        })
    }

    const handleCreateText = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text");


        if (data === 'TEXT') {
            onCreateText({
                rid,
                cid: col.id
            })
            return;
        }

        if (data === 'SELECT') {
            createSelect({
                rid,
                cid: col.id
            })
            return
        }
        alert("You can't put in the col")

    }

    const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        activateDrag({active: true})
    }

    const handleShowModal = () => {
        showEditCol({c: col, rid})
    }

    const handleDragLeave = () => activateDrag({active: false})

    return (
        <Col onDragLeave={handleDragLeave} onDragOver={handleAllowDrop} onDrop={handleCreateText} {...props}
             className={'form_col'}>
            <div className={'form_col_cont'}>
                <InfoSetup onEdit={handleShowModal} title={'Col'} onRemove={handleRemove}/>
                {children}
                <DragMarker componentName={'TEXT'}/>
                <DragMarker componentName={'SELECT'}/>
            </div>
        </Col>
    )
}

export default connect(null, (dispatch) => ({
    createSelect: (d: { rid: string, cid: string }) => dispatch(createSelect(d)),
    onCreateText: (d: { rid: string, cid: string }) => dispatch(createText(d)),
    onRemoveCol: (d: { rid: string, cid: string }) => dispatch(removeCol(d)),
    showEditCol: (c: { c: ICol, rid: string } | null) => dispatch(showEditCol(c)),
    activateDrag: (d: { type?: null | string, active?: boolean }) => dispatch(activateDrag(d))
}))(FormCol)
