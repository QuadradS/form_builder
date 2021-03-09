import React from 'react'
import './styles.css'
import DragMarker from "../drag-marker";

interface IProps {
    title: string
    handleAllowDrop: (e: React.DragEvent<HTMLDivElement>) => void
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
    dragComponent: string
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
}

const DropMarker = ({title, handleAllowDrop, handleDrop, dragComponent, onDragLeave}: IProps) => {


    return (
        <div onDragLeave={onDragLeave} style={{position: 'relative'}}
             onDragOver={handleAllowDrop} onDrop={handleDrop}
             className={'drop_marker'}>
            <p>{title}</p>
            <DragMarker componentName={dragComponent}/>
        </div>
    )
}

export default DropMarker
