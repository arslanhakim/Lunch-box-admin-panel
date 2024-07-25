import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { ARTICLES_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetArticles = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.ARTICLES.GET, '')

    if (result?.status || result?.data) {
        return dispatch({
            type: ARTICLES_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddArticle = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.ARTICLES.ADD,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                dispatch(onGetArticles())
                showToast(
                    'You have successfully created the Article',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: ARTICLES_ACTION_TYPES.ADD,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Article not added', TOAST_TYPE.error)
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
export const onUpdateArticle = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'POST',
                END_POINTS.ARTICLES.UPDATE,
                payload
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the Article',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                dispatch(onGetArticles())
                return dispatch({
                    type: ARTICLES_ACTION_TYPES.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Article not added', TOAST_TYPE.error)
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
export const onDeleteArticle = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.ARTICLES.REMOVE,
                {
                    article_id: payload,
                }
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the Article.',
                    TOAST_TYPE.success
                )
                return dispatch({
                    type: ARTICLES_ACTION_TYPES.DELETE,
                    payload: payload,
                })
            }
        } catch (err) {
            showToast('Something Went Wrong', TOAST_TYPE.error)
            dispatch(setAppLoadingState(false))
            return
            // return dispatch({
            //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
            // })
        }
    }
}
