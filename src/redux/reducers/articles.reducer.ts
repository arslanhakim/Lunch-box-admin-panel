import { ARTICLES_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    articles: [],
}

export const ArticlesReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case ARTICLES_ACTION_TYPES.GET:
            return {
                articles: [...actions?.payload],
            }

        case ARTICLES_ACTION_TYPES.ADD:
            return {
                articles: [...state.articles, actions?.payload],
            }
        case ARTICLES_ACTION_TYPES.DELETE:
            const result = state?.articles?.filter(
                (_item: any) => _item?.article_id !== actions?.payload
            )
            return {
                articles: [...result],
            }
        case ARTICLES_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.articles]
            arr.forEach((item: any, index: any) => {
                if (item.article_id === actions?.payload?.article_id) {
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
