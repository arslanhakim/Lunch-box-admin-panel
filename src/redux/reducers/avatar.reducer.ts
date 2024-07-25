import { AVATAR_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    avatar: <any>[],
}

export const AvatarReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case AVATAR_ACTION_TYPES.GET:
            return {
                avatar: [...actions?.payload],
            }

        case AVATAR_ACTION_TYPES.ADD:
            return {
                avatar: [...state.avatar, actions.payload],
                // avatar: [state.avatar.push(...actions.payload)],
            }
        case AVATAR_ACTION_TYPES.DELETE:
            const result = state.avatar.filter(
                (_item: any) => _item.avatar_id !== actions.payload
            )
            return {
                avatar: [...result],
            }

        default:
            return state
    }
}
