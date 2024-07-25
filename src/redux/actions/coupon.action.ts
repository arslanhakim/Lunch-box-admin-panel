import {
    removeLocalStorage,
    setLocalStorage,
} from './../../utils/functions/index'
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { COUPONS_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'
import swal from 'sweetalert'

export const onGetCoupons = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.COUPONS.GET, '')
    if (result?.status || result?.data) {
        return dispatch({
            type: COUPONS_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddCoupon = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'POST',
                END_POINTS.COUPONS.ADD,
                payload
            )

            if (!result?.status) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully created the Coupon',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: COUPONS_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Coupon not added', TOAST_TYPE.error)
        }
    }
}

export const onUpdateCoupon = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'POST',
                END_POINTS?.COUPONS?.UPDATE,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the Coupon.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: COUPONS_ACTION_TYPES?.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Could not meet success', TOAST_TYPE.error)
        }
    }
}

export const onDeleteCoupon = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.COUPONS.REMOVE,
                {
                    coupon_id: payload,
                }
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the Coupon.',
                    TOAST_TYPE.success
                )

                // showToast('Coupon Successfully Deleted', TOAST_TYPE.success)
                return dispatch({
                    type: COUPONS_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
        }
    }
}
