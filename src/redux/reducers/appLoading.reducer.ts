import { APP_LOADING_ACTIONS_TYPES } from "../actions/loading.action";

const INITIAL_STATE = {
  app_loading: false,
  routes: [],
};

export const AppLoadingReducer = (state = INITIAL_STATE, actions : any) => {
  switch (actions.type) {
    case APP_LOADING_ACTIONS_TYPES.APP_LOADING:
      return {
        ...state,
        app_loading: actions.payload,
      };


    default:
      return state;
  }
};


