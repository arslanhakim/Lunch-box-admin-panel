import { useState } from 'react'
import * as Yup from 'yup'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { uploadFileToCloudinaryViaAPI } from '../../utils/urls/cloudinary'
import { TOAST_TYPE } from '../../utils/constants'
import { END_POINTS } from '../../utils/endpoints'
import { API_HANDLER, showToast } from '../../utils/functions'
import CloseModal from '../Button/closeModal'

export const AddProfile = ({
    addModal,
    setAddModal,
    profilesList,
    onGetProfileList,
    items,
}: any) => {
    const [ImageUpload, setImageUpload] = useState<any>('')
    const classes = `px-4 py-[1.5px]  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`
    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }
    const errorClasses =
        'outline-2 outline-red-light placeholder:text-red-medium'
    return (
        <div className="z-100000">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: '',
                    dob: '',

                    alergies: [''],
                }}
                validateOnChange={true}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('title is required'),
                    dob: Yup.date().required('Type is required'),

                    alergies: Yup.array().of(Yup.string()),
                })}
                onSubmit={async (values: any) => {
                    if (items) {
                        const data = {
                            file: ImageUpload?.file,
                            path: 'profileIMG',
                        }
                        const _result = await uploadFileToCloudinaryViaAPI(data)
                        if (_result.status) {
                            const _data = {
                                ...values,
                                file: _result?.data?.url,
                                file_path: _result?.data?.public_id,
                                recipe_book_id: items?.recipe_book_id,
                            }
                            const result = await API_HANDLER(
                                'POST',
                                END_POINTS.PROFILES.UPDATE,
                                _data
                            )

                            if (!result?.status || !result?.data) {
                                showToast(
                                    'Invalid data entered',
                                    TOAST_TYPE.error
                                )
                            } else {
                                setAddModal(!addModal)
                                onGetProfileList()
                                showToast(
                                    'Profile successfully updated',
                                    TOAST_TYPE.success
                                )
                            }
                        }
                    } else {
                        const data = {
                            file: ImageUpload?.file,
                            path: 'profileIMG',
                        }
                        const _result = await uploadFileToCloudinaryViaAPI(data)
                        if (_result.status) {
                            const _data = {
                                ...values,
                                file: _result?.data?.url,
                                file_path: _result?.data?.public_id,
                            }
                            const result = await API_HANDLER(
                                'POST',
                                END_POINTS.PROFILES.ADD,
                                _data
                            )
                            if (!result?.status || !result?.data) {
                                showToast(
                                    'Invalid data entered',
                                    TOAST_TYPE.error
                                )
                            } else {
                                setAddModal(!addModal)
                                onGetProfileList()
                                showToast(
                                    'Profile successfully added',
                                    TOAST_TYPE.success
                                )
                            }
                        }
                    }
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                }) => (
                    <div className="absolute top-[5%] left-1/3 z-99 bg-primaryColor  rounded-lg border-white border-2 p-6 transition-opacity-300">
                        <CloseModal setModal={setAddModal} />
                        <Form
                            className="w-full space-y-2  mx-auto flex flex-col gap-1"
                            autoComplete="off">
                            <input
                                className={`${classes} ${
                                    errors.name && touched.name
                                        ? errorClasses
                                        : ''
                                }`}
                                type="text"
                                value={values?.name}
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={`${
                                    errors.name && touched.name
                                        ? errors.name
                                        : 'Enter name'
                                }`}
                                width="w-full"
                            />

                            <input
                                type="date"
                                name="dob"
                                placeholder={`${
                                    errors.dob && touched.dob
                                        ? errors.dob
                                        : 'Enter DOB'
                                }`}
                                className={`${classes} ${
                                    errors.dob && touched.dob
                                        ? errorClasses
                                        : ''
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <FieldArray
                                name="alergies"
                                render={(arrayHelpers) => {
                                    const alergies = values.alergies
                                    return (
                                        <div className="flex flex-col gap-2">
                                            {alergies.map(
                                                (input: any, index: any) => {
                                                    const name = `alergies[${index}]`
                                                    const touchedName = getIn(
                                                        touched,
                                                        name
                                                    )
                                                    const errorName = getIn(
                                                        errors,
                                                        name
                                                    )

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex gap-1">
                                                            <Field
                                                                className={`${classes} ${
                                                                    errorName &&
                                                                    touchedName
                                                                        ? errorClasses
                                                                        : ''
                                                                }`}
                                                                type="text"
                                                                name={`alergies[${index}]`}
                                                                placeholder={
                                                                    errorName &&
                                                                    touchedName
                                                                        ? touchedName
                                                                        : 'Enter Allergies, if any (optional)'
                                                                }
                                                                width="w-full"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                                error={getIn(
                                                                    errors,
                                                                    alergies[
                                                                        index
                                                                    ]
                                                                )}
                                                            />

                                                            <br />

                                                            <br />

                                                            {index <
                                                            values.alergies
                                                                .length -
                                                                1 ? (
                                                                <div
                                                                    onClick={() => {
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }}
                                                                    className="flex  bg-white cursor-pointer p-2 rounded-full h-[100%] ">
                                                                    <FaMinus />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    onClick={() =>
                                                                        arrayHelpers.push(
                                                                            ''
                                                                        )
                                                                    }
                                                                    className="flex  bg-white cursor-pointer p-2 rounded-full h-[100%] ">
                                                                    <FaPlus />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    )
                                }}
                            />

                            <input
                                type="file"
                                id="file"
                                accept="image/jpeg, image/png"
                                required
                                placeholder="Avatar"
                                onChange={UploadImage}
                                className={`px-4 py-1  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`}
                            />
                            <button
                                type="submit"
                                className="button-black w-full rounded-lg py-1">
                                Submit
                            </button>
                        </Form>
                    </div>
                )}
            />
        </div>
    )
}
