import { combineReducers } from 'redux'
import { AuthReducer } from './reducers/Auth.Reducer'
import { AppLoadingReducer } from './reducers/appLoading.reducer'
import { CatReducer } from './reducers/categories.reducer'
import { AllergiesReducer } from './reducers/allergies.reducer'
import { ArticlesReducer } from './reducers/articles.reducer'
import { CustomersReducer } from './reducers/customers.reducer'
import { CouponsReducer } from './reducers/coupon.reducer'
import { RecipeBookReducer } from './reducers/recipebook.reducer'
import { ProfilesReducer } from './reducers/profiles.reducer'
import { AvatarReducer } from './reducers/avatar.reducer'
import { DefaultFoodReducer } from './reducers/defaultFood.reducer'
import { NotificationReducer } from './reducers/notification.reducer'

const reducers = combineReducers({
    AppLoadingReducer,
    AuthReducer,
    CatReducer,
    AllergiesReducer,
    ArticlesReducer,
    CustomersReducer,
    CouponsReducer,
    RecipeBookReducer,
    ProfilesReducer,
    AvatarReducer,
    DefaultFoodReducer,
    NotificationReducer,
})

export const rootReducer = (state: any, action: any) => {
    //Reset Global state

    return reducers(state, action)
}

export type RootState = ReturnType<typeof reducers>
