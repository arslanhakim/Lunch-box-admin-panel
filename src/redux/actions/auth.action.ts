import { setLocalStorage } from './../../utils/functions/index'
import { setAppLoadingState } from './loading.action'
import { showToast, API_HANDLER } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { AUTH_ACTION_TYPES } from '../types'
import { END_POINTS } from '../../utils/endpoints'
import { onGetCategories } from './categories.action'
import { onGetAllergies } from './allergies.action'
import { onGetArticles } from './articles.action'
import { onGetCustomers } from './customers.action'
import { onGetCoupons } from './coupon.action'
import { onGetAvatar } from './avatar.actions'
import { onGetRecipeBook } from './recipe.action'
import { onGetDefaultFood } from './defaultFood.action'

export const resetAuthState = () => {
    return (dispatch: any) => {
        return dispatch({
            type: AUTH_ACTION_TYPES.RESET_AUTH_STATE,
        })
    }
}

export const onLogin = (payload: any, navigate: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setAppLoadingState(true))
            const result = await API_HANDLER(
                'POST',
                END_POINTS.AUTH.LOGIN,
                payload
            )

            if (!result?.status || !result?.data) {
                showToast('Invalid email/password', TOAST_TYPE.error)
                dispatch(setAppLoadingState(false))
                return dispatch({
                    type: AUTH_ACTION_TYPES.AUTH_FAILED,
                    payload: result.data,
                })
            }
            setLocalStorage('token', result?.data?.token)

            if (result.data.role === 'SUPER_ADMIN') {
                showToast('Login success', TOAST_TYPE.success)
                await dispatch({
                    type: AUTH_ACTION_TYPES.LOGIN,
                    payload: result.data,
                })

                dispatch(onGetCategories())
                dispatch(onGetAllergies())
                dispatch(onGetArticles())
                dispatch(onGetCustomers())
                dispatch(onGetCoupons())
                dispatch(onGetRecipeBook())
                dispatch(onGetAvatar())
                dispatch(onGetDefaultFood())
                await dispatch(setAppLoadingState(false))
                return navigate('/dashboard')
            } else {
                dispatch(setAppLoadingState(false))
                showToast('Invalid Credentials', TOAST_TYPE.error)
            }
        } catch (err) {
            dispatch(setAppLoadingState(false))
            return dispatch({
                type: AUTH_ACTION_TYPES.AUTH_FAILED,
            })
        }
    }
}
export const ResetAuthState = (navigate: any) => {
    return (dispatch: any) => {
        dispatch(setAppLoadingState(true))
        return setTimeout(() => {
            navigate('/')
            dispatch({
                type: AUTH_ACTION_TYPES.RESET_AUTH_STATE,
            })
            localStorage.clear()
            dispatch(setAppLoadingState(false))
        }, 1000)
    }
}
