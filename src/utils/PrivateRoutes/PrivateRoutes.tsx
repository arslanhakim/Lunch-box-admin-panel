import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLocalStorage } from '../functions'

export const PrivateRoutes = ({ component: RouteComponent }: any) => {
    const data = useSelector((state: any) => state?.AuthReducer?.user)
    const navigate = useNavigate()
    const token = getLocalStorage('token')
    useEffect(() => {
        token && data?.role !== 'SUPER_ADMIN' && navigate('/')
        !token && navigate('/')
    }, [token && data?.role, navigate])

    return <>{token && data?.role === 'SUPER_ADMIN' && <RouteComponent />}</>
}
