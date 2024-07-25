import { NOTIFICATION_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    notifications: <any>[],
}

export const NotificationReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions.type) {
        case NOTIFICATION_ACTION_TYPES.GET:
            return {
                notifications: [...actions?.payload],
            }

        case NOTIFICATION_ACTION_TYPES.DELETE:
            const result = state.notifications.filter(
                (_item: any) => _item.id !== actions?.payload._id
            )

            return {
                notifications: [...result],
            }
        case NOTIFICATION_ACTION_TYPES.CLEAR:
            return {
                notifications: [],
            }
        case NOTIFICATION_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.notifications]
            arr.forEach((item: any, index: any) => {
                if (item.defaultfood_id === actions?.payload?.defaultfood_id) {
                    return (arr[index] = actions.payload)
                }
            })

            return {
                default_food: [...arr],
            }

        default:
            return state
    }
}
