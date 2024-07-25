import {
    removeLocalStorage,
    setLocalStorage,
} from './../../utils/functions/index'
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { PROFILES_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetProfiles = (payload: any) => async (dispatch: any) => {
    setAppLoadingState(true)

    const data = { user_id: payload }
    const result = await API_HANDLER('POST', END_POINTS.PROFILES.GET, data)

    if (result?.status || result?.data) {
        setAppLoadingState(false)
        return dispatch({
            type: PROFILES_ACTION_TYPES.GET,
            payload: result?.data?.profiles,
        })
    }
}
