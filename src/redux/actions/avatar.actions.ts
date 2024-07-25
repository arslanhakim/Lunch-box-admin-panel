import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { AVATAR_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetAvatar = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.AVATAR.GET, '')
    if (result?.status || result?.data) {
        return dispatch({
            type: AVATAR_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddAvatar = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.AVATAR.ADD,
                payload
            )

            if (!result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
                // return dispatch({
                //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
                //     payload: result.data,
                // })
            } else {
                showToast(
                    'You have successfully created the Avatar',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: AVATAR_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Request Denied', TOAST_TYPE.error)
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
export const onDeleteAvatar = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.AVATAR.REMOVE,
                {
                    avatar_id: payload,
                }
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
                // return
                return dispatch({
                    type: AVATAR_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            } else {
                showToast(
                    'You have successfully deleted the Avatar.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: AVATAR_ACTION_TYPES.DELETE,
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
