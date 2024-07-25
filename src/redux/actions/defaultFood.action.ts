import {
    removeLocalStorage,
    setLocalStorage,
} from './../../utils/functions/index'
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { DEFAULT_FOOD_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'
import { onGetCategories } from './categories.action'

export const onGetSpecificFood =
    (payload: any, navigate: any) => (dispatch: any) => {
        navigate('/food')
        return dispatch({
            type: DEFAULT_FOOD_ACTION_TYPES.CATEGORY_SELECTED,
            payload: payload,
        })
    }
export const onGetDefaultFood = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.DEFAULT_FOOD.GET, '')

    if (result?.status || result?.data) {
        return dispatch({
            type: DEFAULT_FOOD_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddDefaultFood = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.DEFAULT_FOOD.ADD,
                payload
            )

            if (!result?.status) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                // dispatch(onGetCategories())
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully created the Food Item',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: DEFAULT_FOOD_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Food Item not added', TOAST_TYPE.error)
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
export const onUpdateDefaultFood = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'PATCH',
                END_POINTS.DEFAULT_FOOD.UPDATE,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the Food Item.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: DEFAULT_FOOD_ACTION_TYPES.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Could not meet success', TOAST_TYPE.error)
            // return
            return dispatch({
                type: DEFAULT_FOOD_ACTION_TYPES.UPDATE,
            })
        }
    }
}
export const onDeleteFood = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.DEFAULT_FOOD.REMOVE,
                {
                    fooditem_id: payload,
                }
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the Food Item.',
                    TOAST_TYPE.success
                )
                dispatch(onGetCategories())
                return dispatch({
                    type: DEFAULT_FOOD_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            return showToast('Something went wrong', TOAST_TYPE.error)
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
