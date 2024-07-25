import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import CloseModal from '../../../../components/Button/closeModal'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import {
    onAddCustomer,
    onUpdateCustomer,
} from '../../../../redux/actions/customers.action'
import { setAppLoadingState } from '../../../../redux/actions/loading.action'
import { TOAST_TYPE } from '../../../../utils/constants'
import { showToast } from '../../../../utils/functions'
import { uploadFileToCloudinaryViaAPI } from '../../../../utils/urls/cloudinary'

export const UserAddContent = ({ editUser, setAddModal, usersList }: any) => {
    const [ImageUpload, setImageUpload] = useState<any>('')
    const dispatch = useDispatch<any>()
    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fname: editUser?.fname || '',
            lname: editUser?.lname || '',
            email: editUser?.email || '',
            no_of_children: editUser?.no_of_children || 1,
            dob: editUser?.dob || '',
            grocery_days: "[`Monday`,'Friday']",
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid Email')
                .required('Email Address Required'),
            password: Yup.string()
                .min(6, 'Minimum 6 characters required.')
                .max(12, 'Maximum 12 characters.')
                .required('Password Required'),
        }),
        onSubmit: async (values: any) => {
            if (ImageUpload) {
                const data = {
                    file: ImageUpload?.file,
                    path: 'profileIMG',
                }
                dispatch(setAppLoadingState(true))
                const _result = await uploadFileToCloudinaryViaAPI(data)
                if (editUser) {
                    if (_result.status) {
                        const _data = {
                            ...values,
                            image: _result?.data?.url,
                            user_id: editUser.user_id,
                        }
                        dispatch(onUpdateCustomer(_data))
                        setAddModal(false)
                    }
                } else {
                    if (_result?.status) {
                        const _data = { ...values, image: _result?.data?.url }
                        usersList.push(_data)
                        dispatch(onAddCustomer(_data))
                        setAddModal(false)
                    }
                }
            } else {
                showToast('Image is not selected', TOAST_TYPE.error)
            }
        },
    })
    return (
        <div
            draggable={true}
            className="fixed  top-[15%] left-1/3 z-99  bg-primaryColor  rounded-lg border-white border-2 p-6 transition-opacity-300">
            <CloseModal setModal={setAddModal} />
            <form
                onSubmit={formik.handleSubmit}
                className="w-full space-y-2  mx-auto mt-8">
                <div className="space-y-0 ">
                    <InputWithLabel
                        type="text"
                        name="fname"
                        label="First Name"
                        placeholder="Enter first name"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.fname}
                        errors={formik?.errors?.fname}
                        touched={formik?.touched?.fname}
                        showLabel={false}
                        width="w-full"
                    />
                    <InputWithLabel
                        type="text"
                        name="lname"
                        label="Last Name"
                        placeholder="Enter last name"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.lname}
                        errors={formik?.errors?.lname}
                        touched={formik?.touched?.lname}
                        showLabel={false}
                        width="w-full"
                    />

                    <InputWithLabel
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Enter Email"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={editUser?.email || formik?.values?.email}
                        errors={formik?.errors?.email}
                        touched={formik?.touched?.email}
                        showLabel={false}
                        width="w-full"
                    />
                    <InputWithLabel
                        type="date"
                        name="dob"
                        label="Date of birth"
                        placeholder="Enter Date of birth"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.dob}
                        errors={formik?.errors?.dob}
                        touched={formik?.touched?.dob}
                        showLabel={false}
                        width="w-full"
                    />
                    <InputWithLabel
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter password"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.password}
                        errors={formik?.errors?.password}
                        touched={formik?.touched?.password}
                        showLabel={false}
                        width="w-full"
                    />
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        placeholder="Avatar"
                        onChange={UploadImage}
                        className={`px-4 py-1  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`}
                    />
                </div>

                <button type="submit" className="button-black">
                    Submit
                </button>
            </form>
        </div>
    )
}
