import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faWrench} from "@fortawesome/free-solid-svg-icons";
import './styles.css'

interface IProps {
    title: string
    onRemove?: () => void
    onEdit?: () => void
    right?: number
    left?: number

}

const InfoSetup = ({title, right, left, onRemove, onEdit}: IProps) => {
    return (
        <div style={{right, left}} className={'info_setup'}>
            <h5 className={'info_setup_title'}>{title}</h5>
            {onEdit && (
                <button onClick={onEdit} className={'info_setup__settings_btn'}>
                    <FontAwesomeIcon icon={faWrench}/>
                </button>
            )}

            {onRemove && (
                <button onClick={onRemove} className={'info_setup__close_btn'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
            )}
        </div>
    )
}

InfoSetup.defaultProps = {
    right: 15,
    left: 15
}

export default InfoSetup
