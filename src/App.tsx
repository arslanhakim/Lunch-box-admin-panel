import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './container/dashboard/index.jsx'
import { Auth } from './container/auth/index.jsx'
import { Categories } from './container/dashboard/conatiner/Categories.js'
import { Allergies } from './container/dashboard/conatiner/Allergies.js'
import { Users } from './container/dashboard/conatiner/Users/Users.js'
import Profiles from './container/dashboard/conatiner/profiles.js'
import Articles from './container/dashboard/conatiner/articles/articles.js'
import { Coupon } from './container/dashboard/conatiner/coupon/Coupon.js'
import { ToastContainer } from 'react-toastify'
import { Recipe } from './container/dashboard/conatiner/recipe/recipe.js'
import { PrivateRoutes } from './utils/PrivateRoutes/PrivateRoutes'
import { Avatar } from './container/dashboard/conatiner/avatar'
import { DefaultFood } from './container/dashboard/conatiner/DefaultFood'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/food" element={<DefaultFood />} />
                    <Route path="/allergies" element={<Allergies />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/avatar" element={<Avatar />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/coupon" element={<Coupon />} />
                    <Route path="/clients" element={<Users />} />

                    {/* <Route
                        path="/dashboard"
                        element={<PrivateRoutes component={Dashboard} />}
                    />
                    <Route
                        path="/categories"
                        element={<PrivateRoutes component={Categories} />}
                    />
                    <Route
                        path="/food"
                        element={<PrivateRoutes component={DefaultFood} />}
                    />
                    <Route
                        path="/allergies"
                        element={<PrivateRoutes component={Allergies} />}
                    />
                    <Route
                        path="/clients"
                        element={<PrivateRoutes component={Users} />}
                    />
                    <Route
                        path="/profiles"
                        element={<PrivateRoutes component={Profiles} />}
                    />
                    <Route
                        path="/articles"
                        element={<PrivateRoutes component={Articles} />}
                    />
                    <Route
                        path="/coupon"
                        element={<PrivateRoutes component={Coupon} />}
                    />
                    <Route
                        path="/avatar"
                        element={<PrivateRoutes component={Avatar} />}
                    />
                    <Route
                        path="/recipe"
                        element={<PrivateRoutes component={Recipe} />}
                    /> */}
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    )
}

export default App
