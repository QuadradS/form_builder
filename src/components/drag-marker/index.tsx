import React from 'react'
import {connect} from "react-redux";
import {IStore} from "../../redux/rootReducer";
import classNames from 'classnames';
import './styles.css'

interface IProps {
    status: {
        type: string | null,
        active: boolean
    }
    componentName: string
}

const DragMarker = ({status, componentName}: IProps) => {

    const dragMarkerClasses = classNames('drag-marker', {
        'active': !!status.type && status.type === componentName,
        'full-active': status.active
    })

    const dragMarkerWrapClasses = classNames('drag-marker-wrap', {
        'none': !status.type,
    })

    return (
        <div className={dragMarkerWrapClasses}>
            <div className={dragMarkerClasses}/>
        </div>
    )
}

export default connect((store: IStore) => ({
    status: store.sideEffect.componentDrag,
}))(DragMarker)
