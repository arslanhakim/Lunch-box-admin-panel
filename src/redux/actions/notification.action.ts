import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { NOTIFICATION_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetNotification = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.NOTIFICATION.GET, '')

    if (result?.status) {
        return dispatch({
            type: NOTIFICATION_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onUpdateNotification = (payload: any) => {
    return async (dispatch: any) => {
        try {
            //updating reducer 1st, so that user can see immediate response
            dispatch({
                type: NOTIFICATION_ACTION_TYPES.DELETE,
                payload: payload,
            })

            //sending request to api for updation
            const result = await API_HANDLER(
                'PATCH',
                END_POINTS.NOTIFICATION.UPDATE,
                payload
            )
            if (!result?.status) {
                showToast('Something went wrong', TOAST_TYPE.error)
            }
        } catch (err) {
            showToast('Could not meet success', TOAST_TYPE.error)
        }
    }
}

export const onClearAllNotifications = () => {
    return async (dispatch: any) => {
        //clearing reducer 1st, so that user can see immediate response
        try {
            dispatch({
                type: NOTIFICATION_ACTION_TYPES.CLEAR,
                payload: '',
            })
            //sending request to api to clear everything
            const result = await API_HANDLER(
                'GET',
                END_POINTS.NOTIFICATION.CLEAR_ALL,
                ''
            )

            if (!result?.status) {
                showToast('Invalid id entered', TOAST_TYPE.error)
            }
        } catch (err) {
            return showToast('Something went wrong', TOAST_TYPE.error)
        }
    }
}
