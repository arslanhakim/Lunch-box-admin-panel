import Backdrop from '@mui/material/Backdrop'
import { shallowEqual, useSelector } from 'react-redux'
import { ASSETS } from '../../assets/path'

export const Loader = () => {
    const { app_loading } = useSelector(
        (state: any) => state.AppLoadingReducer,
        shallowEqual
    )
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={app_loading}>
            <div className="flex items-center justify-between h-24 sm:px-6 lg:px-8 animate-bounce">
                <img src={ASSETS.LOGIN.LOGO} alt="" className="h-full " />
            </div>
        </Backdrop>
    )
}
