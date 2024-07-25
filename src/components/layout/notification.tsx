import { MdOutlineCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
    onClearAllNotifications,
    onUpdateNotification,
} from '../../redux/actions/notification.action'

const Button = ({
    icon,
    bgColor,
    color,
    size,
    text,
    borderRadius,
    width,
    click,
    onClick,
}: any) => {
    return (
        <button
            type="button"
            onClick={() => onClick(click)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-[#ded7d7]`}>
            {icon} {text}
        </button>
    )
}

const Notification = ({ notification, setNotification }: any) => {
    const dispatch = useDispatch<any>()

    const { notifications } = useSelector(
        (state: any) => state?.NotificationReducer
    )
    const onDeleteItem = (item: any) => {
        const data = { _id: item?.id, seen: 1 }

        dispatch(onUpdateNotification(data))
    }
    const onClearAll = (item: any) => {
        dispatch(onClearAllNotifications())
    }

    return (
        <div className="nav-item absolute right-5 md:right-40 top-16 bg-white  shadow-2xl p-8 rounded-lg w-96">
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <p className="font-semibold text-lg dark:text-gray-200">
                        Notifications
                    </p>
                    <button
                        type="button"
                        className="text-gray-normal text-xs rounded p-1 px-2 bg-orange-theme ">
                        {' '}
                        {notifications?.length + ' New'}
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => setNotification(!notification)}
                    style={{
                        color: 'rgb(153, 171, 180)',
                    }}
                    className={` text-2xl p-3  hover:drop-shadow-xl hover:bg-[#ded7d7] rounded-full`}>
                    <MdOutlineCancel />
                </button>
            </div>
            <div className="mt-5 ">
                {notifications?.map((item: any, index: any) => (
                    <div
                        key={index}
                        className="flex items-center justify-between leading-8 gap-5 border-b-1 border-color p-3">
                        <div>
                            <p className="font-semibold dark:text-gray-light ">
                                {item.message}
                            </p>
                            <p className="text-sm  text-gray-normal">
                                {item.optional}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onDeleteItem(item)}
                            style={{
                                color: 'rgb(153, 171, 180)',
                            }}
                            className={` text-2xl p-3  hover:drop-shadow-xl hover:bg-[#ded7d7] rounded-full`}>
                            <MdOutlineCancel />
                        </button>
                    </div>
                ))}
                <div className="mt-5">
                    {notifications.length > 0 ? (
                        <Button
                            click={''}
                            onClick={onClearAll}
                            color="white"
                            bgColor={'#9e0d0d'}
                            text="Clear all notifications"
                            borderRadius="10px"
                            width="full"
                        />
                    ) : (
                        <div className="flex justify-center item-center w-full">
                            No Notification
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification
