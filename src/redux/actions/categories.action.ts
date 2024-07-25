 
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { CATEGORIES_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'
import { onGetDefaultFood } from './defaultFood.action'

// export const resetAuthState = () => {
//     return (dispatch: any) => {
//         return dispatch({
//             type: AUTH_ACTION_TYPES.RESET_AUTH_STATE,
//         })
//     }
// }
export const onGetCategories = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.CATEGORY.GET, '')

    if (result?.status || result?.data) {
        return dispatch({
            type: CATEGORIES_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddCategory = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.CATEGORY.ADD,
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
                    'You have successfully created the Category',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: CATEGORIES_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Category not added', TOAST_TYPE.error)
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
export const onUpdateCategory = (payload: any) => {
    return async (dispatch: any) => {
        try {
            // dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'PATCH',
                END_POINTS.CATEGORY.UPDATE,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the Category',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: CATEGORIES_ACTION_TYPES.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Could not meet success', TOAST_TYPE.error)
            // return
            return dispatch({
                type: CATEGORIES_ACTION_TYPES.UPDATE,
            })
        }
    }
}
export const onDeleteCategory = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.CATEGORY.REMOVE,
                {
                    category_id: payload,
                }
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(onGetDefaultFood())
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the Category.',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: CATEGORIES_ACTION_TYPES.DELETE,
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
