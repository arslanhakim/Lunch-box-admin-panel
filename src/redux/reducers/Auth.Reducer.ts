import { AUTH_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    failed: false,
    success: false,
    logout: false,
    error: '',
    user: {},
}

export const AuthReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case AUTH_ACTION_TYPES.LOGIN:
            return {
                ...state,
                success: true,
                failed: false,
                logout: false,
                error: '',
                user: actions.payload,
            }

        case AUTH_ACTION_TYPES.UPDATE:
            return {
                ...state,
                user: { ...state.user, ...actions.payload, error: '' },
            }

        case AUTH_ACTION_TYPES.AUTH_FAILED:
            return {
                ...state,
                failed: true,
                success: false,
                logout: false,
                error: actions.payload,
                user: {},
            }

        case AUTH_ACTION_TYPES.RESET_AUTH_STATE:
            return {
                ...state,
                failed: false,
                success: false,
                logout: false,
                error: '',
                user: {},
            }

        case AUTH_ACTION_TYPES.LOGOUT:
            return {
                ...state,
                failed: false,
                success: false,
                logout: true,
                error: '',
                user: {},
            }

        default:
            return state
    }
}
