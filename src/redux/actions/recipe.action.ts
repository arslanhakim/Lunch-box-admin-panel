import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { RECIPE_BOOK_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'

export const onGetRecipeBook = () => async (dispatch: any) => {
    const result = await API_HANDLER('GET', END_POINTS.RECIPEBOOK.GET, '')

    if (result?.status || result?.data) {
        return dispatch({
            type: RECIPE_BOOK_ACTION_TYPES.GET,
            payload: result?.data?.result,
        })
    }
}

export const onAddRecipe = (payload: any) => async (dispatch: any) => {
    try {
        dispatch(setAppLoadingState(true))
        const result = await API_HANDLER(
            'POST',
            END_POINTS.RECIPEBOOK.ADD,
            payload
        )

        if (!result?.status || !result?.data) {
            dispatch(setAppLoadingState(false))
            showToast('Something went wrong', TOAST_TYPE.error)
            return
        } else {
            // dispatch(onGetCategories())
            dispatch(setAppLoadingState(false))
            showToast(
                'You have successfully created the Recipe',
                TOAST_TYPE.success
            )
            return dispatch({
                type: RECIPE_BOOK_ACTION_TYPES.ADD,
                payload: result?.data,
            })
        }
    } catch (err) {
        dispatch(setAppLoadingState(false))
        showToast('Recipe not created', TOAST_TYPE.error)
        return
        // return dispatch({
        //     type: AUTH_ACTION_TYPES.AUTH_FAILED,
        // })
    }
}

export const onUpdateRecipe = (payload: any) => {
    return async (dispatch: any) => {
        try {
            // dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'PATCH',
                END_POINTS.RECIPEBOOK.UPDATE,
                payload
            )
            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Something went wrong', TOAST_TYPE.error)
                return
            } else {
                showToast(
                    'You have successfully updated the Recipe.',
                    TOAST_TYPE.success
                )
                dispatch(setAppLoadingState(false))

                return dispatch({
                    type: RECIPE_BOOK_ACTION_TYPES.UPDATE,
                    payload: result?.data,
                })
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            showToast('Could not meet success', TOAST_TYPE.error)
            return dispatch({
                type: RECIPE_BOOK_ACTION_TYPES.UPDATE,
            })
        }
    }
}

export const onDeleteRecipe = (payload: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))

            const result = await API_HANDLER(
                'DELETE',
                END_POINTS.RECIPEBOOK.REMOVE,
                { recipe_book_id: payload }
            )

            if (!result?.status || !result?.data) {
                dispatch(setAppLoadingState(false))
                showToast('Invalid id entered', TOAST_TYPE.error)
            } else {
                dispatch(setAppLoadingState(false))
                showToast(
                    'You have successfully deleted the Recipe.',
                    TOAST_TYPE.success
                )

                return dispatch({
                    type: RECIPE_BOOK_ACTION_TYPES.DELETE,
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
