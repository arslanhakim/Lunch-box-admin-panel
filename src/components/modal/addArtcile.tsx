import { InputWithLabel } from '../InputWithLabel'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { uploadFileToCloudinaryViaAPI } from '../../utils/urls/cloudinary'
import { useState, useRef } from 'react'
import JoditEditor, { Jodit } from 'jodit-react'
import { useDispatch } from 'react-redux'
import {
    onAddArticle,
    onUpdateArticle,
} from '../../redux/actions/articles.action'
import { setAppLoadingState } from '../../redux/actions/loading.action'
import CloseModal from '../Button/closeModal'

export const AddArtcile = ({ modal, setModal, editArticle }: any) => {
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

    const editor = useRef<any>(null)
    const [content, setContent] = useState(editArticle?.description || '')

    const config: any = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: 'Start typing...',
        scrollY: true,
        scrollbars: true,
        allowResizeY: false,
        styleValues: {
            'color-text': 'red',
            colorBorder: 'black',
            'color-panel': 'blue',
            innerHeight: 100,
            scrollY: true,
        },
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: editArticle?.name || '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        }),
        onSubmit: async (values: any) => {
            if (editArticle) {
                const data = {
                    file: ImageUpload?.file,
                    path: 'profileIMG',
                }
                const _result = await uploadFileToCloudinaryViaAPI(data)
                if (_result.status) {
                    const _data = {
                        ...values,
                        description: editor?.current?.value,
                        file: _result?.data?.url,
                        file_path: _result?.data?.public_id,
                        article_id: editArticle?.article_id,
                    }

                    setModal(!modal)
                    dispatch(onUpdateArticle(_data))
                }
            } else {
                const data = {
                    file: ImageUpload?.file,
                    path: 'profileIMG',
                }
                dispatch(setAppLoadingState(true))
                const _result = await uploadFileToCloudinaryViaAPI(data)
                if (_result.status) {
                    const _data = {
                        ...values,
                        description: editor?.current?.value,
                        file: _result?.data?.url,
                        file_path: _result?.data?.public_id,
                    }
                    dispatch(onAddArticle(_data))
                    setModal(!modal)
                } else {
                    dispatch(setAppLoadingState(false))
                }
            }
        },
    })

    return (
        <div className="fixed  mr-[20%] top-[10%] w-[75%]  z-99 bg-primaryColor  rounded-lg border-white border-2 p-6 transition-opacity-300 overflow-scroll max-h-[70%]">
            <CloseModal setModal={setModal} />

            <form
                onSubmit={formik.handleSubmit}
                className="w-full space-y-2  mx-auto flex flex-col gap-2 mt-10 relative h-full">
                <div className="space-y-3 ">
                    <InputWithLabel
                        type="text"
                        name="name"
                        label="First Name"
                        placeholder="Enter Title"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values?.name}
                        errors={formik?.errors?.name}
                        touched={formik?.touched?.name}
                        showLabel={false}
                        width="w-full"
                    />
                    <div className="flex items-center  gap-4">
                        <label
                            htmlFor="avatar"
                            className={`px-4 cursor-pointer py-1   bg-white items-center  lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`}>
                            Upload Thumbnails
                        </label>

                        {ImageUpload ? (
                            <div className="rounded-full inline-block border-2 border-white w-12 h-12 items-center overflow-hidden justify-center self-center  ">
                                <img
                                    src={ImageUpload?.url}
                                    className={'bg-cover w-full h-full'}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <span className="text-red-medium font-bold text-lg">
                                ?
                            </span>
                        )}
                    </div>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/jpeg, image/png"
                        placeholder="Avatar"
                        onChange={UploadImage}
                        className="hidden"
                    />

                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {
                            // setContent(newContent)
                        }}
                    />
                </div>

                <button type="submit" className="button-black">
                    Submit
                </button>
            </form>
        </div>
    )
}
