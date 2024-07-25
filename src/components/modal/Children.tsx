import { useEffect, useState } from 'react'
import { ASSETS } from '../../assets/path'
import { API_HANDLER } from '../../utils/functions'
import { END_POINTS } from '../../utils/endpoints'

import CloseModal from '../Button/closeModal'

const Children = ({ userId, setProfile }: any) => {
    const [profileList, setProfileList] = useState<any>([])

    useEffect(() => {
        onGetProfileList()
    }, [userId])

    const onGetProfileList = async () => {
        const data = { user_id: userId }
        const result = await API_HANDLER('POST', END_POINTS.PROFILES.GET, data)

        if (result?.status || result?.data) {
            setProfileList(result?.data?.profiles)
        }
    }

    return (
        <div className="fixed  top-[30%] right-[20%] z-99 bg-white rounded-lg border-primaryColor border-2  transition-opacity-300 flex flex-col ">
            <CloseModal setModal={setProfile} />
            <div
                className={`p-4 gap-1 ${
                    profileList?.length < 6 ? 'flex' : 'grid grid-cols-5'
                } `}>
                {profileList?.length > 0 ? (
                    profileList?.map((item: any, id: any) => (
                        <div
                            key={id}
                            className="flex flex-col justify-center items-center">
                            <div className="rounded-full border-2 border-primaryColor w-16 h-16 flex items-center justify-center overflow-hidden  ">
                                <img
                                    src={
                                        item?.file || ASSETS?.CATEGORIES?.FRUITS
                                    }
                                    alt=""
                                    className="object-contain"
                                />
                            </div>
                            <div className="text-xs ">{item?.name}</div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center">
                        No Children Added yet ☹
                    </div>
                )}
            </div>
        </div>
    )
}

export default Children
