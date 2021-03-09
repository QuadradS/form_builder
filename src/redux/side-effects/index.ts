import {createReducer} from "@reduxjs/toolkit";
import {IAction} from "../form/actions";
import {activateDrag, showEditCol, showEditSelect, showEditTextField} from "./actions";
import {ICol, ISelect, IText} from "../form/reducer";

export interface ISideEffect {
    editColModal: { c: ICol, rid: string } | null
    editTextModal: { c: IText, rid: string, cid: string } | null
    editSelectModal: { c: ISelect, rid: string, cid: string } | null
    componentDrag: {
        type: string | null
        active: boolean
    }
}

const initialState: ISideEffect = {
    editColModal: null,
    editTextModal: null,
    editSelectModal: null,
    componentDrag: {
        type: null,
        active: false
    }
}

export default createReducer(initialState, (builder) => {
    builder.addCase(showEditCol, (state, action: IAction<{ c: ICol, rid: string } | null>) => ({
        ...state,
        editColModal: action.payload
    }))
    builder.addCase(showEditTextField, (state, action: IAction<{ c: IText, rid: string, cid: string } | null>) => ({
        ...state,
        editTextModal: action.payload
    }))
    builder.addCase(showEditSelect, (state, action: IAction<{ c: ISelect, rid: string, cid: string } | null>) => ({
        ...state,
        editSelectModal: action.payload
    }))
    builder.addCase(activateDrag, (state, action: IAction<{ type?: null | string, active?: boolean }>) => ({
        ...state,
        componentDrag: {
            ...state.componentDrag,
            ...action.payload
        }
    }))
})
