import React, {ReactNode} from 'react'
import {Row} from "react-bootstrap";
import './styles.css'
import InfoSetup from "../info-setup";
import DropMarker from "../drop-marker";
import FormCol from "../form-col";
import Text from "../text";
import {IRow, ISelect, IText} from "../../redux/form/reducer";
import {connect} from "react-redux";
import {createCol} from "../../redux/form/actions";
import Select from "../select";
import {activateDrag} from "../../redux/side-effects/actions";

interface IProps {
    onRemove: (id: string) => void
    row: IRow
    onDropCol: (rid: string) => void
    children?: ReactNode
    activateDrag: (d: { type?: null | string, active?: boolean }) => void
}

const FormRow = ({children, onRemove, row, onDropCol, activateDrag}: IProps) => {
    const handleRemove = () => onRemove(row.id)
    const handleDropCol = (rowId: string) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const data = e.dataTransfer.getData("text");
        if (data !== 'COL') {
            alert("You can't drop in the row")
            return
        }
        onDropCol(rowId)

    }
    const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        activateDrag({active: true})
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        activateDrag({active: false})
    }

    return (
        <Row className={'form_row'}>
            <InfoSetup title={'Row'} onRemove={handleRemove}/>
            {row.children
                .map((c) => (
                    <FormCol rid={row.id} key={c.id} sm={c.size} col={c}>
                        {c.children.map((ch: IText | ISelect) => (
                            ch.type === 'TEXT' ? (
                                //@ts-ignore
                                <Text rid={row.id} cid={c.id} text={ch} key={ch.id} name={ch.name}/>
                            ) : (
                                //@ts-ignore
                                <Select rid={row.id} cid={c.id} select={ch} key={ch.id} name={ch.name}/>
                            )
                        ))}
                    </FormCol>
                ))}
            {children || (
                <DropMarker
                    title={'Drop Column Here'}
                    handleAllowDrop={handleAllowDrop}
                    handleDrop={handleDropCol(row.id)}
                    dragComponent={'COL'}
                    onDragLeave={onDragLeave}
                />
            )}
        </Row>
    )
}

export default connect(null,
    (dispatch) => ({
        onDropCol: (rid: string) => dispatch(createCol(rid)),
        activateDrag: (d: { type?: null | string, active?: boolean }) => dispatch(activateDrag(d))
    }))(FormRow)
