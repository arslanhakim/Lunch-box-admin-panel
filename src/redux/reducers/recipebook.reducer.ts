import { RECIPE_BOOK_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    recipebook: [],
}

export const RecipeBookReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions?.type) {
        case RECIPE_BOOK_ACTION_TYPES.GET:
            return {
                recipebook: [...actions?.payload],
            }

        case RECIPE_BOOK_ACTION_TYPES.ADD:
            return {
                recipebook: [...state.recipebook, actions?.payload],
            }

        case RECIPE_BOOK_ACTION_TYPES.DELETE:
            const result = state.recipebook.filter(
                (_item: any) => _item.recipe_book_id !== actions?.payload
            )
            return {
                recipebook: [...result],
            }
        case RECIPE_BOOK_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.recipebook]
            arr.forEach((item: any, index: any) => {
                if (item.recipe_book_id === actions?.payload?.recipe_book_id) {
                    return (arr[index] = actions.payload)
                }
            })

            return {
                recipebook: [...arr],
            }

        default:
            return state
    }
}
