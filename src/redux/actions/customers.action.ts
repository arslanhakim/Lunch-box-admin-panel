import {
    removeLocalStorage,
    setLocalStorage,
} from './../../utils/functions/index'
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { CUSTOMERS_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetCustomers = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.USERS.GET, '')
    if (result?.status || result?.data) {
        return dispatch({
            type: CUSTOMERS_ACTION_TYPES.GET,
            payload: result?.data?.allUsers,
        })
    }
}

export const onAddCustomer = (payload: any) => async (dispatch: any) => {
    try {
        dispatch(setAppLoadingState(true))

        const result = await API_HANDLER(
            'POST',
            END_POINTS.AUTH.REGISTER,
            payload
        )

        if (!result?.status || !result?.data) {
            dispatch(setAppLoadingState(false))
            showToast('Something went wrong', TOAST_TYPE.error)
            return
        } else {
            dispatch(setAppLoadingState(false))
            showToast(
                'You have successfully created the User',
                TOAST_TYPE.success
            )
            return dispatch({
                type: CUSTOMERS_ACTION_TYPES.ADD,
                payload: result?.data,
            })
        }
    } catch (err) {
        dispatch(setAppLoadingState(false))
        showToast('User not added', TOAST_TYPE.error)
        return
        // return dispatch({
        //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
        // })
    }
}

export const onUpdateCustomer = (payload: any) => {
    return async (dispatch: any) => {
        try {
            // dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'PUT',
                END_POINTS.USERS.UPDATE,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the User.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: CUSTOMERS_ACTION_TYPES.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Could not meet success', TOAST_TYPE.error)
            // return
            return dispatch({
                type: CUSTOMERS_ACTION_TYPES.UPDATE,
            })
        }
    }
}

export const onDeleteCustomer = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.USERS.REMOVE + payload,
                {}
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the User.',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: CUSTOMERS_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
