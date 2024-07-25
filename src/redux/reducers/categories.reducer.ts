import { CATEGORIES_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    categories: [],
}

export const CatReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case CATEGORIES_ACTION_TYPES.GET:
            return {
                categories: [...actions?.payload],
            }

        case CATEGORIES_ACTION_TYPES.ADD:
            return {
                categories: [...state.categories, actions.payload],
            }

        case CATEGORIES_ACTION_TYPES.DELETE:
            const result = state.categories.filter(
                (_item: any) => _item.category_id !== actions?.payload
            )
            return {
                categories: [...result],
            }
        case CATEGORIES_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.categories]
            arr.forEach((item: any, index: any) => {
                if (item.category_id === actions?.payload?.category_id) {
                    return (arr[index] = actions.payload)
                }
            })

            return {
                categories: [...arr],
            }

        default:
            return state
    }
}
