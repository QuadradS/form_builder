import React from 'react'
import {connect} from "react-redux";
import {IStore} from "../../redux/rootReducer";
import {IRow, ISelect, IText} from "../../redux/form/reducer";
import './styles.css'

interface IProps {
    rows: IRow[]
}

const DataView = ({rows}: IProps) => {
    const renderData = rows.reduce((acc: any[], r) => {
        acc.push(r.children.map((c) => c.children))
        return acc
    }, [])

    return (
        <div className={'data_view'}>
            <h3><strong>Data</strong></h3>

            {renderData.map((r:[]) => r.map((c: []) => (
                c.map((ch: ISelect | IText) => (
                    <div key={ch.id} className={'data_view_cont'}>
                        <div className={'data_view_key'}>{ch.name}</div>
                        {/*@ts-ignore*/}
                        <div className={'data_view_value'}>{ch.selected || ch.value || '---'}</div>
                    </div>
                ))
            )))}

        </div>
    )
}

export default connect((store: IStore) => ({
    rows: store.form.children
}))(DataView)
