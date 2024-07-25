import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from 'formik'
import * as Yup from 'yup'
import {
    onAddDefaultFood,
    onUpdateDefaultFood,
} from '../../../../redux/actions/defaultFood.action'
import { useDispatch, useSelector } from 'react-redux'
import CloseModal from '../../../../components/Button/closeModal'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { TOAST_TYPE } from '../../../../utils/constants'
import { showToast } from '../../../../utils/functions'

export const AddFood = ({
    editSubCat,
    data,
    addModal,
    setAddModal,
    category,
    edit,
}: any) => {
    const dispatch = useDispatch<any>()
    const allCats = useSelector((state: any) => state?.CatReducer?.categories)
    const { default_food } = useSelector(
        (state: any) => state.DefaultFoodReducer
    )

    const classes = `px-4 py-[1.5px]  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`
    const inputError = 'outline-2 outline-red-light placeholder:text-red-medium'

    const onCheckIngredientAllowed = () => {
        const List = allCats?.filter(
            (item: any) => item?.category_id == category?.id
        )
        const Ingredient_allowed =
            List.length > 0 ? List[0]?.ingredients_allowed : undefined
        return Ingredient_allowed
    }

    return (
        <div className="fixed top-1/3 left-1/3 z-99 bg-primaryColor  rounded-lg border-white border-2">
            <Formik
                initialValues={{
                    name: editSubCat?.name || '',
                    category: data?.name || category?.name,
                    category_id: category?.id,
                    ingredients: editSubCat?.ingredients
                        ? JSON.parse(editSubCat?.ingredients)
                        : [{ name: '', quantity: 0 }],
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Name is required'),
                    ingredients: Yup.array().of(
                        Yup.object().shape({
                            name: onCheckIngredientAllowed()
                                ? Yup.string().required('Ingredient required')
                                : Yup.string(),
                            quantity: onCheckIngredientAllowed()
                                ? Yup.number()
                                      .required('Quantity required')
                                      .typeError('Enter a number')
                                      .min(1, 'Too short')
                                : Yup.number(),
                        })
                    ),
                })}
                onSubmit={async (values: any) => {
                    if (edit) {
                        const _data = {
                            ...values,
                            ingredients: onCheckIngredientAllowed()
                                ? values?.ingredients[0]?.name?.length > 0
                                    ? values?.ingredients
                                    : []
                                : [],
                            fooditem_id: editSubCat.fooditem_id,
                        }

                        dispatch(onUpdateDefaultFood(_data))
                        setAddModal(!addModal)
                    } else {
                        const exist = default_food?.find(
                            (e: any) =>
                                e?.name.toLowerCase() ==
                                values?.name.toLowerCase()
                        )

                        if (exist) {
                            return showToast(
                                'Food Item Already Exist',
                                TOAST_TYPE.error
                            )
                        }

                        const _data = {
                            ...values,
                            ingredients:
                                values?.ingredients[0]?.name?.length > 0
                                    ? values?.ingredients
                                    : [],
                        }

                        dispatch(onAddDefaultFood(_data))
                        setAddModal(!addModal)
                    }
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                }) => (
                    <div className="fixed top-1/3 left-1/3 z-99 bg-primaryColor  rounded-lg border-white border-2 p-6 transition-opacity-300">
                        <CloseModal setModal={setAddModal} />
                        <Form
                            className="w-full space-y-2  mx-auto flex flex-col gap-1 mt-8"
                            noValidate
                            autoComplete="off">
                            <input
                                className={`${classes} ${
                                    errors.name && touched.name
                                        ? inputError
                                        : ''
                                }`}
                                type="text"
                                autoFocus
                                value={values.name}
                                name="name"
                                placeholder={`${
                                    errors.name && touched.name
                                        ? errors.name
                                        : 'Enter name'
                                }`}
                                width="w-full"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            {onCheckIngredientAllowed() ? (
                                <FieldArray
                                    name="ingredients"
                                    render={(arrayHelpers) => {
                                        const ingredients = values.ingredients
                                        return (
                                            <div className="flex flex-col gap-2">
                                                {ingredients.map(
                                                    (
                                                        input: any,
                                                        index: any
                                                    ) => {
                                                        const name = `ingredients[${index}].name`
                                                        const touchedName =
                                                            getIn(touched, name)
                                                        const errorName = getIn(
                                                            errors,
                                                            name
                                                        )

                                                        const quantity = `ingredients[${index}].quantity`
                                                        const touchedQuantity =
                                                            getIn(
                                                                touched,
                                                                quantity
                                                            )
                                                        const errorQuantity =
                                                            getIn(
                                                                errors,
                                                                quantity
                                                            )

                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-1">
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
                                                                        ]
                                                                            .quantity
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
                                                                values
                                                                    .ingredients
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
                            ) : (
                                ''
                            )}
                            <button
                                type="submit"
                                className="bg-gray-normal text-white px-4 py-2 rounded-xl w-full cursor-pointer">
                                Submit
                            </button>
                        </Form>
                    </div>
                )}
            />
        </div>
    )
}
