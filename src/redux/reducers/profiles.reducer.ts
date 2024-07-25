import { PROFILES_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    profiles: [],
}

export const ProfilesReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case PROFILES_ACTION_TYPES.GET:
            return {
                profiles: [...actions.payload],
            }

        default:
            return state
    }
}
