import React from 'react'
import {ListGroup} from "react-bootstrap";
import './styles.css'
import {COL, ROW, SELECT, TEXT} from "../../redux/form/constants";
import {connect} from "react-redux";
import {activateDrag} from "../../redux/side-effects/actions";

interface IProps {
    activateDrag: (d: { type?: null | string, active?: boolean }) => void
}

const SideBar = ({activateDrag}: IProps) => {

    const handleDragStart = (type: ROW | COL | TEXT | SELECT) => (ev: React.DragEvent<HTMLDivElement>) => {
        ev.dataTransfer.setData("text", type);
        activateDrag({type})
    }

    const onDragEnd = () => activateDrag({type: null, active: false})

    return (
        <div className={'side-bar'}>
            <h3><strong>Wigets</strong></h3>
            <ListGroup className={'wiget_list_group'}>
                <ListGroup.Item
                    children={'Row'}
                    onDragStart={handleDragStart('ROW')}
                    onDragEnd={onDragEnd}
                    draggable={true}
                    className={'wiget_list_item'}
                />
                <ListGroup.Item
                    children={'Col'}
                    onDragStart={handleDragStart('COL')}
                    onDragEnd={onDragEnd}
                    draggable={true}
                    className={'wiget_list_item'}
                />
                <ListGroup.Item
                    children={'Text'}
                    onDragStart={handleDragStart('TEXT')}
                    onDragEnd={onDragEnd}
                    draggable={true}
                    className={'wiget_list_item'}
                />
                <ListGroup.Item
                    children={'Select'}
                    onDragStart={handleDragStart('SELECT')}
                    onDragEnd={onDragEnd}
                    draggable={true}
                    className={'wiget_list_item'}
                />
            </ListGroup>
        </div>
    )
}

export default connect(null, (dispatch) => ({
    activateDrag: (d: { type?: null | string, active?: boolean }) => dispatch(activateDrag(d))
}))(SideBar)
