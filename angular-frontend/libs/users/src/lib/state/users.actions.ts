import { createAction, props } from '@ngrx/store'
import { User } from '../models/user'

export const buildUserSession = createAction('[Users] Bulid User Session')

export const buildUserSessionSuccess = createAction(
    '[Users] Bulid User Session Success',
    props<{ user: User }>()
)

export const buildUserSessionFailed = createAction(
    '[Users] Bulid User Session Failed'
)
