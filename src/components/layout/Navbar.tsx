import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import { RiNotification3Line } from 'react-icons/ri'

import { DUMMY_AVATAR } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { onGetNotification } from '../../redux/actions/notification.action'

const NavButton = ({
    customFunc,
    icon,
    color,
    dotColor,
    notifications,
}: any) => (
    <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:shadow-xl">
        {notifications?.length > 0 && (
            <span
                style={{ background: dotColor }}
                className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
            />
        )}
        {icon}
    </button>
)

const Navbar = ({
    setSideBar,
    sideBar,
    notification,
    setNotification,
}: any) => {
    const [seconds, setSeconds] = useState(0)
    const dispatch = useDispatch<any>()
    const { notifications } = useSelector(
        (state: any) => state?.NotificationReducer
    )
    useEffect(() => {
        // set interval to call a notification every minute
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1)
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    useEffect(() => {
        // call notification function
        dispatch(onGetNotification())
    }, [seconds])

    return (
        <div className="flex justify-between p-2 py-0 sm:p-2 lg:my-4  bg-white sm:bg-transparent w-full fixed sm:relative z-40">
            <div>
                {sideBar || (
                    <NavButton
                        title="Menu"
                        customFunc={() => setSideBar(!sideBar)}
                        icon={<AiOutlineMenu />}
                    />
                )}
            </div>
            <div className="flex">
                <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg z-50">
                    {/* // notification icon  */}

                    <NavButton
                        title="Notification"
                        // dotColor="rgb(254, 201, 15)"
                        dotColor="#B8CD82"
                        customFunc={() => setNotification(!notification)}
                        notifications={notifications}
                        // color={currentColor}
                        icon={<RiNotification3Line />}
                    />

                    {/* Dummy Avatar  */}
                    <img
                        className="rounded-full w-8 h-8"
                        src={DUMMY_AVATAR}
                        alt="user-profile"
                    />
                    {/* Name of the user  */}
                    <p>
                        <span className="text-gray-400 text-14">Hi,</span>{' '}
                        <span className="text-gray-400 font-bold ml-1 text-14">
                            Admin
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
