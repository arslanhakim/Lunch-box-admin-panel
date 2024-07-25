import { COUPONS_ACTION_TYPES } from '../types'

const INITIAL_STATE = {
    coupons: [],
}

export const CouponsReducer = (state = INITIAL_STATE, actions: any) => {
    switch (actions?.type) {
        case COUPONS_ACTION_TYPES.GET:
            return {
                coupons: [...actions?.payload],
            }

        case COUPONS_ACTION_TYPES.ADD:
            return {
                coupons: [...state.coupons, actions?.payload],
            }
        case COUPONS_ACTION_TYPES.DELETE:
            const result = state.coupons?.filter(
                (_item: any) => _item.coupon_id !== actions?.payload
            )
            return {
                coupons: [...result],
            }
        case COUPONS_ACTION_TYPES.UPDATE:
            let arr = <any>[...state.coupons]
            arr.forEach((item: any, index: any) => {
                if (item.coupon_id === actions?.payload?.coupon_id) {
                    return (arr[index] = actions?.payload)
                }
            })

            return {
                coupons: [...arr],
            }
        default:
            return state
    }
}
