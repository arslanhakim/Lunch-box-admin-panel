export const APP_LOADING_ACTIONS_TYPES = {
    APP_LOADING: '[APP] APP_LOADING',
    APP_ROUTES: '[APP] APP_ROUTES',
}

export const setAppLoadingState = (payload: any) => {
    return (dispatch: any) =>
        dispatch({
            type: APP_LOADING_ACTIONS_TYPES.APP_LOADING,
            payload,
        })
}
