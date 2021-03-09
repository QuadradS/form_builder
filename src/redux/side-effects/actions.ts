import {createAction} from "@reduxjs/toolkit";
import * as constants from "../side-effects/constants";
import {ICol, ISelect, IText} from "../form/reducer";

export const showEditCol = createAction<{ c: ICol, rid: string } | null>(constants.EDIT_COL_MODAL)
export const showEditTextField = createAction<{ c: IText, rid: string, cid: string } | null>(constants.EDIT_TEXT_MODAL)
export const showEditSelect = createAction<{ c: ISelect, rid: string, cid: string } | null>(constants.EDIT_SELECT_MODAL)

export const activateDrag = createAction<{ type?: null | string, active?: boolean }>(constants.ACTIVATE_DRAG)
