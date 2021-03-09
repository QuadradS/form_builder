import uniqid from "uniqid";
import {COL, FORM, ROW} from "./constants";
import {createReducer} from '@reduxjs/toolkit'
import {
    createCol,
    createRow, createSelect,
    createText,
    deleteRow,
    editCol, editSelect,
    editText,
    IAction,
    removeCol,
    removeColChild
} from "./actions";

interface IContainer<T, C> {
    id: string
    type: T
    children: C[]
}

export interface IForm extends IContainer<FORM, IRow> {
}

export interface IRow extends IContainer<ROW, ICol> {
}

export interface ICol extends IContainer<COL, IText | ISelect> {
    size: number
}

export interface IText {
    id: string
    type: 'TEXT'
    name: string
    value: string
}

export interface ISelect {
    id: string
    type: 'SELECT'
    name: string
    values: string[]
    selected: string
}

const initialState: IForm = {
    id: uniqid(),
    type: 'FORM',
    children: []
}

export default createReducer(initialState, (builder) => {
    builder.addCase(createRow, (state, action: IAction<IRow>) => ({
        ...state,
        children: [...state.children, action.payload]
    }))
    builder.addCase(deleteRow, (state, action: IAction<string>) => ({
        ...state,
        children: state.children.filter((r) => r.id !== action.payload)
    }))
    builder.addCase(createCol, (state, action: IAction<string>) => {
        const currentRow = state.children.find((r) => r.id === action.payload)
        if (!currentRow) {
            return state
        }

        let updatedRow: IRow = {
            ...currentRow,
            children: [...currentRow.children, {
                id: uniqid(),
                children: [],
                type: 'COL',
                size: 3
            }]
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload ? updatedRow : r)
        }
    })
    builder.addCase(removeCol, (state, action: IAction<{ rid: string, cid: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)

        if (!currentRow) {
            return state
        }

        let updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.filter((r) => r.id !== action.payload.cid)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(createText, (state, action: IAction<{ rid: string, cid: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        if (!currentCol || !currentRow) {
            return state
        }

        const updatedCol: ICol = {
            ...currentCol,
            children: [...currentCol.children, {
                id: uniqid(),
                name: 'Text',
                type: 'TEXT',
                value: ''
            }]
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(removeColChild, (state, action: IAction<{ rid: string, cid: string, id: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        if (!currentCol || !currentRow) {
            return state
        }

        const updatedCol: ICol = {
            ...currentCol,
            children: currentCol.children.filter((ch) => ch.id !== action.payload.id)
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(editCol, (state, action: IAction<{ size: string, cid: string, rid: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        if (!currentCol || !currentRow) {
            return state
        }

        const updatedCol: ICol = {
            ...currentCol,
            size: Number(action.payload.size)
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(editText, (state,
                               action: IAction<{ key: string, value: string, rid: string, cid: string, tid: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        const currentText = currentCol && currentCol.children.find((ch) => ch.id === action.payload.tid)

        if (!currentCol || !currentRow || !currentText) {
            return state
        }

        const updatedText = {
            ...currentText,
            [action.payload.key]: action.payload.value
        }

        const updatedCol: ICol = {
            ...currentCol,
            children: currentCol.children.map((c) => c.id === action.payload.tid ? updatedText : c)
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(createSelect, (state, action: IAction<{ rid: string, cid: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        if (!currentCol || !currentRow) {
            return state
        }

        const updatedCol: ICol = {
            ...currentCol,
            children: [...currentCol.children, {
                id: uniqid(),
                name: 'Select',
                type: 'SELECT',
                values: ['Audi','BMW','Mercedes'],
                selected: ''
            }]
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
    builder.addCase(editSelect, (state,
                               action: IAction<{ key: string, value: string[] | string, rid: string, cid: string, id: string }>) => {
        const currentRow = state.children.find((r) => r.id === action.payload.rid)
        const currentCol = currentRow && currentRow.children.find((r) => r.id === action.payload.cid)
        const currentSelect = currentCol && currentCol.children.find((ch) => ch.id === action.payload.id)

        if (!currentCol || !currentRow || !currentSelect) {
            return state
        }

        const updatedText = {
            ...currentSelect,
            [action.payload.key]: action.payload.value
        }

        const updatedCol: ICol = {
            ...currentCol,
            children: currentCol.children.map((c) => c.id === action.payload.id ? updatedText : c)
        }

        const updatedRow: IRow = {
            ...currentRow,
            children: currentRow.children.map((c) => c.id === action.payload.cid ? updatedCol : c)
        }

        return {
            ...state,
            children: state.children.map((r) => r.id === action.payload.rid ? updatedRow : r)
        }
    })
})
