import { CUSTOMERS_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    customers: [],
}

export const CustomersReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case CUSTOMERS_ACTION_TYPES.GET:
            return {
                customers: [...actions?.payload],
            }

        case CUSTOMERS_ACTION_TYPES.ADD:
            return {
                customers: [...state.customers, actions?.payload],
            }

        case CUSTOMERS_ACTION_TYPES.DELETE:
            const result = state.customers.filter(
                (_item: any) => _item.user_id !== actions?.payload
            )
            return {
                customers: [...result],
            }
        case CUSTOMERS_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.customers]
            arr.forEach((item: any, index: any) => {
                if (item.user_id === actions?.payload?.user_id) {
                    return (arr[index] = actions.payload)
                }
            })

            return {
                customers: [...arr],
            }

        default:
            return state
    }
}
