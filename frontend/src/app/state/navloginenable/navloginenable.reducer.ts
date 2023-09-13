import { createReducer, on } from '@ngrx/store';
import { enableLoginItems, disableLoginItems } from './navloginenable.actions';

export const initialState: boolean = true;

export const navLoginEnable = createReducer (
    initialState,
    on(enableLoginItems, (state) => true),
    on(disableLoginItems, (state) => false)
);