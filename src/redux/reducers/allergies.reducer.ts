import { ALLERGIES_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    allergies: <any>[],
}

export const AllergiesReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case ALLERGIES_ACTION_TYPES.GET:
            return {
                allergies: [...actions?.payload],
            }

        case ALLERGIES_ACTION_TYPES.ADD:
            return {
                allergies: [...state.allergies, actions.payload],
            }
        case ALLERGIES_ACTION_TYPES.DELETE:
            const result = state.allergies.filter(
                (_item: any) => _item.alergy_id !== actions.payload
            )
            return {
                allergies: [...result],
            }

        default:
            return state
    }
}
