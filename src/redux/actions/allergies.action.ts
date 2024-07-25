
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { ALLERGIES_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetAllergies = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.ALERGY.GET, '')
    if (result?.status || result?.data) {
        return dispatch({
            type: ALLERGIES_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddAllergies = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.ALERGY.ADD,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
            } else {
                showToast(
                    'You have successfully created the Allergy',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: ALLERGIES_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
        }
    }
}
export const onDeleteAllergies = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.ALERGY.REMOVE,
                {
                    alergy_id: payload,
                }
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
                // return
                return dispatch({
                    type: ALLERGIES_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            } else {
                showToast(
                    'You have successfully deleted the Allergy.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: ALLERGIES_ACTION_TYPES.DELETE,
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
