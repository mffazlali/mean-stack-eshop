import { createReducer, on, Action } from '@ngrx/store'
import { User } from '../models/user'

import * as UsersActions from './users.actions'

export const USERS_FEATURE_KEY = 'users'

export interface UsersState {
    user: User
    isAthentication: boolean
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState
}

export const initialUserState: UsersState = {
    user: null,
    isAthentication: false,
}

const reducer = createReducer(
    initialUserState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAthentication: true,
    })),
    on(UsersActions.buildUserSessionFailed, (state) => ({
        ...state,
        user: null,
        isAthentication: false,
    }))
)

export function usersReducer(state: UsersState | undefined, action: Action) {
    return reducer(state, action)
}
