import { DEFAULT_FOOD_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    default_food: <any>[],
    selected_category: <any>'',
}

export const DefaultFoodReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case DEFAULT_FOOD_ACTION_TYPES.GET:
            return {
                default_food: [...actions?.payload],
            }
        case DEFAULT_FOOD_ACTION_TYPES.CATEGORY_SELECTED:
            return {
                ...state,
                selected_category: actions?.payload,
            }

        case DEFAULT_FOOD_ACTION_TYPES.ADD:
            return {
                ...state,
                default_food: [...state.default_food, actions.payload],
            }

        case DEFAULT_FOOD_ACTION_TYPES.DELETE:
            const result = state.default_food.filter(
                (_item: any) => _item.fooditem_id !== actions?.payload
            )
            return {
                ...state,
                default_food: [...result],
            }
        case DEFAULT_FOOD_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.default_food]
            arr.forEach((item: any, index: any) => {
                if (item?.fooditem_id === actions?.payload?.fooditem_id) {
                    return (arr[index] = actions.payload)
                }
            })

            return {
                ...state,
                default_food: [...arr],
            }

        default:
            return state
    }
}
