import { useState, useEffect, useLayoutEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

import { Loader } from '../loader'
import { ResetAuthState } from '../../redux/actions/auth.action'
import { useDispatch } from 'react-redux'

import { ASSETS } from '../../assets/path'
import swal from 'sweetalert'
import Notification from './notification'
import { AiOutlineClose } from 'react-icons/ai'
import { TimeOutLogic } from '../modal/TimeOutLogic'

export const Layout = ({ children }: any) => {
    const [sideBar, setSideBar] = useState<boolean>(true)
    const [notification, setNotification] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const [size, setSize] = useState<any>()
    useEffect(() => {
        size <= 900 ? setSideBar(false) : setSideBar(true)
    }, [size])

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth])
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const onLogout = async () => {
        swal({
            title: `Logout?`,
            text: `You want to Logout?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(ResetAuthState(navigate))
                return
            }
        })
    }

    const [navLinks, setNavLinks] = useState([
        {
            name: 'Dashboard',
            navTo: '/dashboard',
        },
        {
            name: 'Categories',
            navTo: '/categories',
        },

        {
            name: 'Recipes Book',
            navTo: '/recipe',
        },
        {
            name: 'Allergies',
            navTo: '/allergies',
        },
        {
            name: 'Users',
            navTo: '/clients',
        },
        {
            name: 'Articles',
            navTo: '/articles',
        },
        {
            name: 'Coupons',
            navTo: '/coupon',
        },
        {
            name: 'Avatars',
            navTo: '/avatar',
        },
    ])

    const activeClass = `bg-gray-normal h-10 xl:h-12  flex items-center justify-between bg-white text-gray-normal px-5 duration-1000 border-r-4 border-blue-extralight`
    const inActiveClass = `duration-1000 h-10 xl:h-12  flex items-center justify-between px-5 hover:bg-blue-extralight`
    return (
        <>
            <div className="flex md:w-full min-h-96 z-500 Montserrat-Regular bg-gray-extra min-h-screen">
                <Loader />
                {sideBar && (
                    <div className="flex flex-col md:relative fixed max-h-min w-80 text-white z-50">
                        <div className="flex-1 fixed   text-xs md:text-sm w-64 lg:text-base  bg-primaryColor min-h-full rounded-tr-lg  gap-4 ">
                            <div
                                onClick={() => setSideBar(false)}
                                className="  cursor-pointer w-full">
                                <span className="rounded-full shadow-lg  p-1 absolute right-4 top-4 hover:bg-white hover:text-red-medium duration-200 hover:scale-110 ">
                                    <AiOutlineClose size={20} />
                                </span>
                            </div>
                            <div className="my-6 flex flex-col justify-center items-center w-full">
                                <div className="flex justify-center items-center w-full  ">
                                    <div className="flex items-center justify-between h-16   sm:px-6 lg:px-8">
                                        <img
                                            src={ASSETS.LOGIN.LOGO}
                                            alt=""
                                            className="h-full"
                                        />
                                    </div>
                                </div>
                                <div className="Montserrat-Regular text-sm sm:text-base md:text-lg text-primary text-center ">
                                    {/* {data.FirstName}&nbsp;{data.LastName} */}
                                </div>
                            </div>

                            <div className=" ">
                                {navLinks?.map((item: any, id: any) => (
                                    <NavLink
                                        key={id}
                                        to={item?.navTo}
                                        className={({ isActive }) =>
                                            isActive
                                                ? activeClass
                                                : inActiveClass
                                        }>
                                        {item?.name}
                                    </NavLink>
                                ))}

                                <div
                                    onClick={onLogout}
                                    className={`cursor-pointer ${inActiveClass}`}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col w-full  ">
                    <Navbar
                        setSideBar={setSideBar}
                        sideBar={sideBar}
                        notification={notification}
                        setNotification={setNotification}
                    />
                    <div className="w-full mb-10 z-1">{children}</div>
                </div>
            </div>
            {notification && (
                <Notification
                    notification={notification}
                    setNotification={setNotification}
                />
            )}
            <TimeOutLogic />
        </>
    )
}
