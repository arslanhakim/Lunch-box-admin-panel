import { useState, useEffect } from 'react'

import { showToast } from '../../utils/functions'
import { TOAST_TYPE } from '../../utils/constants'
import { uploadFileToCloudinaryViaAPI } from '../../utils/urls/cloudinary'
import CloseModal from '../Button/closeModal'
import { useDispatch } from 'react-redux'
import { onAddCoupon, onUpdateCoupon } from '../../redux/actions/coupon.action'
import { setAppLoadingState } from '../../redux/actions/loading.action'

export const AddCoupon = ({ modal, setModal, edit, editItem }: any) => {
    const inputcss = 'outline-none  bg-lightGray rounded-lg'
    const [selectedOption, setSelectedOption] = useState(editItem?.status || '')
    const [ImageUpload, setImageUpload] = useState<any>()
    const dispatch = useDispatch<any>()

    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }
    const SubmitForm = async (e: any) => {
        e.preventDefault()
        if (edit === true) {
            if (
                typeof ImageUpload?.file !== 'string' &&
                ImageUpload !== undefined
            ) {
                const data = {
                    file: ImageUpload?.file,
                    path: 'profileIMG',
                }
                dispatch(setAppLoadingState(true))
                const _result = await uploadFileToCloudinaryViaAPI(data)
                if (_result?.status) {
                    const _data = {
                        coupon_id: editItem?.coupon_id,
                        name: e.target?.name?.value,
                        percent: e?.target?.percent?.value,
                        status: e.target.status.value,
                        code: e?.target?.code?.value,
                        file: _result?.data?.url,
                        file_path: _result?.data?.public_id,
                    }
                    dispatch(onUpdateCoupon(_data))
                    setModal(!modal)
                    return
                }
            } else {
                const _data = {
                    coupon_id: editItem?.coupon_id,
                    name: e?.target.name.value,
                    percent: e?.target?.percent?.value,
                    status: e.target.status.value,
                    code: e?.target?.code?.value,
                }

                dispatch(onUpdateCoupon(_data))
                setModal(!modal)
                return
            }
        } else {
            if (ImageUpload) {
                const data = {
                    file: ImageUpload?.file,
                    path: 'profileIMG',
                }
                dispatch(setAppLoadingState(true))
                const _result = await uploadFileToCloudinaryViaAPI(data)
                if (_result.status) {
                    const _data = {
                        name: e.target.name.value,
                        percent: e.target.percent.value,
                        status: e.target.status.value,
                        code: e.target.code.value,
                        file: _result?.data?.url,
                        file_path: _result?.data?.public_id,
                    }
                    dispatch(onAddCoupon(_data))
                    setModal(!modal)
                    return
                }
            } else {
                showToast('Invalid data entered', TOAST_TYPE.error)
            }
        }
    }

    useEffect(() => {
        setSelectedOption(editItem?.status)
    }, [editItem?.status])

    function handleOptionChange(event: any) {
        setSelectedOption(event.target.value)
    }

    return (
        <div className="fixed top-[20%] left-1/3 z-99 bg-primaryColor capitalize rounded-lg border-white border-2 p-6 transition-opacity-300">
            <CloseModal setModal={setModal} />
            <form onSubmit={SubmitForm} className="flex flex-col gap-2 mt-10">
                <input
                    name="name"
                    type="text"
                    autoFocus
                    placeholder="Coupon Name"
                    required
                    defaultValue={edit ? editItem?.name : ''}
                    className={`${inputcss} `}
                />
                <input
                    name="code"
                    type="text"
                    placeholder=" Coupon Code"
                    defaultValue={edit ? editItem?.code : ''}
                    required
                    className={`${inputcss} `}
                />
                <input
                    type="number"
                    name="percent"
                    placeholder="percentage"
                    defaultValue={edit ? editItem?.percent : ''}
                    required
                    className={`${inputcss}`}
                />

                <div>
                    <p>Status</p>
                    <input
                        type="radio"
                        id="active"
                        defaultChecked={
                            selectedOption?.toLowerCase() === 'active'
                        }
                        onChange={handleOptionChange}
                        name="status"
                        value="Active"
                    />
                     {' '}
                    <label htmlFor="active" className="mr-2 ">
                        Active
                    </label>
                    <input
                        type="radio"
                        id="Expire"
                        name="status"
                        defaultChecked={
                            selectedOption?.toLowerCase() === 'inactive'
                        }
                        value="Inactive"
                    />
                      <label htmlFor="Expire">Inactive</label>
                </div>
                {!edit && (
                    <input
                        onChange={UploadImage}
                        type="file"
                        accept="image/jpeg, image/png"
                    />
                )}
                <button className="bg-gray-normal text-white rounded-lg p-2 ">
                    {edit ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    )
}
