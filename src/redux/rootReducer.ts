import { combineReducers } from 'redux';
import reducer, {IForm} from './form/reducer';
import sideEffect, {ISideEffect} from './side-effects';

export interface IStore {
    form: IForm
    sideEffect: ISideEffect
}

export default combineReducers<IStore>({
    form: reducer,
    sideEffect
});
