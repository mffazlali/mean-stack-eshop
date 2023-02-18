import { createFeatureSelector, createSelector } from '@ngrx/store'
import { USERS_FEATURE_KEY, UsersState } from './users.reducer'

export const getUsersState =
    createFeatureSelector<UsersState>(USERS_FEATURE_KEY)

export const getUser = createSelector(getUsersState, (state) => state.user)
export const getUserIsAuth = createSelector(
    getUsersState,
    (state) => state.isAthentication
)
