import { useState } from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from 'formik'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { uploadFileToCloudinaryViaAPI } from '../../../../utils/urls/cloudinary'
import {
    onAddRecipe,
    onUpdateRecipe,
} from '../../../../redux/actions/recipe.action'
import CloseModal from '../../../../components/Button/closeModal'
import { useDispatch } from 'react-redux'
import { setAppLoadingState } from '../../../../redux/actions/loading.action'
import { showToast } from '../../../../utils/functions'
import { TOAST_TYPE } from '../../../../utils/constants'

export const AddRecipe = ({ addModal, setAddModal, items }: any) => {
    const [ImageUpload, setImageUpload] = useState<any>('')
    const classes = `px-4 py-[1.5px]  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`
    const inputError = 'outline-2 outline-red-light placeholder:text-red-medium'
    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }
    const dispatch = useDispatch<any>()

    return (
        <div className="z-100000">
            <Formik
                initialValues={{
                    title: items?.title || '',
                    description: items?.description || '',
                    cook: items?.cook || '',
                    prep: items?.prep || '',
                    type: items?.type || '',
                    method: items?.method || '',
                    prep_unit: items?.prep_unit || '',
                    cook_unit: items?.cook_unit || '',
                    serve: items?.serve || '',
                    ingredients: items?.ingredients
                        ? JSON.parse(items?.ingredients)
                        : [{ name: '', quantity: '' }],
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('title is required'),
                    type: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Type is required'),
                    method: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Method is required'),
                    cook: Yup.string().required('Cook time is required'),
                    prep_unit: Yup.string().required('Prep unit is required'),
                    cook_unit: Yup.string().required('Cook unit is required'),
                    prep: Yup.string().required('Prep time is required'),
                    serve: Yup.string().required('Describe Serve is required'),
                    ingredients: Yup.array().of(
                        Yup.object().shape({
                            name: Yup.string().required('Name required'),
                            quantity: Yup.number()
                                .required('quantity required')
                                .min(1, 'Too short')
                                .typeError('Enter a number'),
                        })
                    ),
                    description: Yup.string()
                        .min(2, 'Too Short!')
                        .max(350, 'Too Long!')
                        .required('Description is required'),
                })}
                onSubmit={async (values: any) => {
                    if (ImageUpload) {
                        const data = {
                            file: ImageUpload?.file,
                            path: 'recipebookIMG',
                        }
                        dispatch(setAppLoadingState(true))
                        const _result = await uploadFileToCloudinaryViaAPI(data)
                        if (_result.status) {
                            if (items) {
                                const _data = {
                                    ...values,
                                    file: _result?.data?.url,
                                    file_path: _result?.data?.public_id,
                                    recipe_book_id: items.recipe_book_id,
                                }

                                dispatch(onUpdateRecipe(_data))
                                setAddModal(!addModal)
                            } else {
                                const _data = {
                                    ...values,
                                    file: _result?.data?.url,
                                    file_path: _result?.data?.public_id,
                                }

                                dispatch(onAddRecipe(_data))
                                setAddModal(!addModal)
                            }
                        }
                    } else {
                        showToast('Image is not selected', TOAST_TYPE.error)
                    }
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                }) => (
                    <div className="fixed top-[5%] mb-10 left-1/3 z-40 bg-primaryColor overflow-y-auto  max-h-[90%] rounded-lg border-white border-2 p-6 transition-opacity-300">
                        <CloseModal setModal={setAddModal} />

                        <Form
                            className="w-full space-y-2 mx-auto flex flex-col gap-1 mt-8"
                            noValidate
                            autoComplete="off">
                            <input
                                className={`${classes} ${
                                    errors.title && touched.title
                                        ? inputError
                                        : ''
                                }`}
                                autoFocus
                                type="text"
                                value={values.title}
                                name="title"
                                placeholder={`${
                                    errors.title && touched.title
                                        ? errors.title
                                        : 'Enter title'
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <input
                                type="text"
                                name="description"
                                value={values.description}
                                placeholder={`${
                                    errors.description && touched.description
                                        ? errors.description
                                        : 'Enter description'
                                }`}
                                className={`${classes} ${
                                    errors.description && touched.description
                                        ? inputError
                                        : ''
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <div className="flex gap-1">
                                <input
                                    value={values.cook}
                                    type="number"
                                    className={`${classes} ${
                                        errors.cook && touched.cook
                                            ? inputError
                                            : ''
                                    }`}
                                    name="cook"
                                    placeholder={`${
                                        errors.cook && touched.cook
                                            ? errors.cook
                                            : 'Enter cooking time'
                                    }`}
                                    width="w-full"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <input
                                    value={values.cook_unit}
                                    type="number"
                                    className={`${classes} ${
                                        errors.cook_unit && touched.cook_unit
                                            ? inputError
                                            : ''
                                    }`}
                                    name="cook_unit"
                                    placeholder={`${
                                        errors.cook_unit && touched.cook_unit
                                            ? errors.cook_unit
                                            : 'Enter cooking unit'
                                    }`}
                                    width="w-full"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="flex gap-1">
                                <input
                                    type="number"
                                    value={values.prep}
                                    className={`${classes} ${
                                        errors.prep && touched.prep
                                            ? inputError
                                            : ''
                                    }`}
                                    name="prep"
                                    placeholder={`${
                                        errors.prep && touched.prep
                                            ? errors.prep
                                            : 'Enter prep time'
                                    }`}
                                    width="w-full"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <input
                                    value={values.prep_unit}
                                    type="number"
                                    className={`${classes} ${
                                        errors.prep_unit && touched.prep_unit
                                            ? inputError
                                            : ''
                                    }`}
                                    name="prep_unit"
                                    placeholder={`${
                                        errors.prep_unit && touched.prep_unit
                                            ? errors.prep_unit
                                            : 'Enter cooking unit'
                                    }`}
                                    width="w-full"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <input
                                type="text"
                                value={values.type}
                                name="type"
                                className={`${classes} ${
                                    errors.type && touched.type
                                        ? inputError
                                        : ''
                                }`}
                                placeholder={`${
                                    errors.type && touched.type
                                        ? errors.type
                                        : 'Enter type'
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <input
                                type="text"
                                value={values.method}
                                name="method"
                                className={`${classes} ${
                                    errors.method && touched.method
                                        ? inputError
                                        : ''
                                }`}
                                placeholder={`${
                                    errors.method && touched.method
                                        ? errors.method
                                        : 'Describe method'
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <input
                                type="number"
                                value={values?.serve}
                                name="serve"
                                className={`${classes} ${
                                    errors?.serve && touched?.serve
                                        ? inputError
                                        : ''
                                }`}
                                placeholder={`${
                                    errors?.serve && touched?.serve
                                        ? errors?.serve
                                        : 'Describe Serve'
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <FieldArray
                                name="ingredients"
                                render={(arrayHelpers) => {
                                    const ingredients = values.ingredients
                                    return (
                                        <div className="flex flex-col gap-2">
                                            {ingredients.map(
                                                (input: any, index: any) => {
                                                    const name = `ingredients[${index}].name`
                                                    const touchedName = getIn(
                                                        touched,
                                                        name
                                                    )
                                                    const errorName = getIn(
                                                        errors,
                                                        name
                                                    )

                                                    const quantity = `ingredients[${index}].quantity`
                                                    const touchedQuantity =
                                                        getIn(touched, quantity)
                                                    const errorQuantity = getIn(
                                                        errors,
                                                        quantity
                                                    )

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex gap-1">
                                                            <Field
                                                                className={`${classes} ${
                                                                    errorName &&
                                                                    touchedName
                                                                        ? inputError
                                                                        : ''
                                                                }`}
                                                                type="text"
                                                                name={`ingredients[${index}].name`}
                                                                placeholder={
                                                                    errorName &&
                                                                    touchedName
                                                                        ? errorName
                                                                        : 'Enter Ingredient'
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
                                                                    ingredients[
                                                                        index
                                                                    ].name
                                                                )}
                                                            />
                                                            <Field
                                                                type="number"
                                                                className={`${classes} ${
                                                                    errorQuantity &&
                                                                    touchedQuantity
                                                                        ? inputError
                                                                        : ''
                                                                }`}
                                                                name={`ingredients[${index}].quantity`}
                                                                error={getIn(
                                                                    errors,
                                                                    ingredients[
                                                                        index
                                                                    ].quantity
                                                                )}
                                                                placeholder={
                                                                    errorQuantity &&
                                                                    touchedQuantity
                                                                        ? errorQuantity
                                                                        : 'Enter quantity'
                                                                }
                                                                width="w-1/2"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                onBlur={
                                                                    handleBlur
                                                                }
                                                            />

                                                            <br />
                                                            <ErrorMessage
                                                                name={`ingredients.${index}.email`}
                                                            />
                                                            <br />
                                                            {index <
                                                            values.ingredients
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
                                                                            {
                                                                                name: '',
                                                                                quantity:
                                                                                    '',
                                                                            }
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
                                className="bg-gray-normal text-white w-full rounded-lg py-1">
                                Submit
                            </button>
                        </Form>
                    </div>
                )}
            />
        </div>
    )
}
