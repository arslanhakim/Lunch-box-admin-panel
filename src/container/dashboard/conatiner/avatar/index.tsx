import { useState } from 'react'
import { Layout } from '../../../../components/layout/layout'
import Modal from '../../../../components/modal/modal'
import { showToast } from '../../../../utils/functions'
import { uploadFileToCloudinaryViaAPI } from '../../../../utils/urls/cloudinary'
import { TOAST_TYPE } from '../../../../utils/constants'
import { ASSETS } from '../../../../assets/path'
import swal from 'sweetalert'
import { Header } from '../../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'

import { setAppLoadingState } from '../../../../redux/actions/loading.action'
import {
    onAddAvatar,
    onDeleteAvatar,
} from '../../../../redux/actions/avatar.actions'

export const Avatar = () => {
    const { avatar } = useSelector((state: any) => state?.AvatarReducer)
    const [modal, setModal] = useState(false)
    const [selectedID, setselectedID] = useState<any>()
    const dispatch = useDispatch<any>()
    const [ImageUpload, setImageUpload] = useState<any>()

    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }

    const addAvatar = () => {
        setModal(!modal)
    }

    const onAddItem = async (e: any) => {
        if (ImageUpload) {
            setModal(false)

            const data = {
                file: ImageUpload?.file,
                path: 'avatar',
            }
            dispatch(setAppLoadingState(true))
            const _result = await uploadFileToCloudinaryViaAPI(data)
            if (_result.status) {
                const data = {
                    file: _result?.data?.url,
                    file_path: _result?.data?.public_id,
                }

                dispatch(onAddAvatar(data))
                setImageUpload('')
            } else {
                showToast(
                    _result.data || 'Something went wrong',
                    TOAST_TYPE.error
                )
            }
        } else {
            showToast('Select the image', TOAST_TYPE.error)
        }
    }

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete this Avatar?`,
            text: `Are you sure want to delete this Avatar?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteAvatar(item?.avatar_id))
            }
        })
    }

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <Header title="Avatar" list={avatar} onApplyFunction={addAvatar} />
            <div className="flex flex-wrap gap-1 sm:gap-3 xl:gap-6 mt-6 duration-700">
                {avatar?.map((item: any, index: number) => (
                    <div key={index} className="rounded-full relative group">
                        <div
                            className="bg-white flex shadow-xl  col-span-1 rounded-full justify-between items-center hover:scale-105 duration-300 group w-12 h-12 lg:w-20 lg:h-20 border-2 hover:drop-shadow-xl border-primaryColor overflow-hidden"
                            style={{
                                boxShadow: '0 1px 5px 2px rgba(0,0,0,0.2)',
                            }}>
                            <div className="">
                                <img
                                    src={item?.file || ASSETS.CATEGORIES.DAIRY}
                                    className="  object-cover h-full w-full "
                                    alt=""
                                />
                            </div>
                        </div>

                        <div
                            className="-right-1 -top-1 hidden absolute cursor-pointer text-sm h-6 group-hover:flex items-center justify-center w-6 rounded-full bg-red-medium text-white"
                            onClick={() => onDeleteItem(item)}>
                            <FaTimes />
                        </div>
                    </div>
                ))}
            </div>
            {modal && (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    image={true}
                    deleteAble={true}
                    UploadImage={UploadImage}
                    ImageUpload={ImageUpload}
                    onAddItem={onAddItem}
                    onDeleteItem={onDeleteItem}
                    avatar={true}
                />
            )}
        </div>
    )
    return <Layout children={content} />
}
