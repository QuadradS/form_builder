import {createAction} from '@reduxjs/toolkit'
import {IRow, IText} from "./reducer";
import * as constants from "./constants";

export interface IAction<P> {
    type: string,
    payload: P
}

export const createRow = createAction<IRow>(constants.CREATE_ROW)
export const deleteRow = createAction<string>(constants.DELETE_ROW)

export const createCol = createAction<string>(constants.CREATE_COL)
export const removeCol = createAction<{ rid: string, cid: string }>(constants.DELETE_COL)
export const editCol = createAction<{ size: string, cid: string, rid: string }>(constants.EDIT_COL)
export const removeColChild = createAction<{ rid: string, cid: string, id: string }>(constants.DELETE_CHILD)

export const createText = createAction<{ rid: string, cid: string }>(constants.CREATE_TEXT)
export const editText = createAction<{ key: string, value: string, rid: string, cid: string, tid: string }>(constants.EDIT_TEXT)

export const createSelect = createAction<{ rid: string, cid: string }>(constants.CREATE_SELECT)
export const editSelect = createAction<{ key: string, value: string[] | string, rid: string, cid: string, id: string }>(constants.EDIT_SELECT)
