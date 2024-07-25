import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GiClick } from 'react-icons/gi'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { ASSETS } from '../../assets/path'
import { onUpdateCategory } from '../../redux/actions/categories.action'
import { setAppLoadingState } from '../../redux/actions/loading.action'
import { TOAST_TYPE } from '../../utils/constants'
import { showToast } from '../../utils/functions'
import { uploadFileToCloudinaryViaAPI } from '../../utils/urls/cloudinary'
import CloseModal from '../Button/closeModal'
import { ErrorMessage, Field, FieldArray, Form, Formik, getIn } from 'formik'
import * as Yup from 'yup'
import {
    onAddDefaultFood,
    onDeleteFood,
    onGetDefaultFood,
} from '../../redux/actions/defaultFood.action'
import { AddFood } from '../../container/dashboard/conatiner/DefaultFood/addFood'

export const SubCategories = ({ setModal, data, subCat }: any) => {
    const [addModal, setAddModal] = useState(false)
    const [addSubCats, setAddSubCats] = useState<any>(subCat || [])
    const [editSubCat, setEditSubCat] = useState<any>([])
    const dispatch = useDispatch<any>()

    const { default_food } = useSelector(
        (state: any) => state.DefaultFoodReducer
    )

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete Food Item`,
            text: `Are you sure want to delete ${item.name}?`,
            icon: 'warning',
            buttons: true as any,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteFood(item?.defaultfood_id))
            }
        })
    }

    return (
        <div className="fixed  top-[20%] lg:left-5/6 left-1/3   transition-all lg:w-[25%] w-[40%] mr-[40%]  z-99 bg-primaryColor  rounded-xl border-white border-2 p-6 transition-opacity-300">
            <CloseModal setModal={setModal} />
            <div className="mt-4 ">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center items-center mb-4 ">
                        <img
                            src={data?.file || ASSETS?.FOOD?.FOOD1}
                            alt=""
                            className="h-10 object-cover rounded-full w-10 border-2 border-gray-media"
                        />
                        <h1 className="text-fontPoppinBold text-center font-extrabold text-xl">
                            {data?.name || ' Mains'}
                        </h1>
                    </div>
                    <div className="lg:text-sm text-xs">
                        {' '}
                        Message:{' '}
                        {data?.message?.trim()?.length > 0
                            ? data?.message
                            : 'Not Availabe'}
                    </div>
                    <div className="text-sm ">
                        ingredients:{' '}
                        {data?.ingredients_allowed ? 'Allowed' : 'Not Allowed'}
                    </div>
                </div>

                <ul className="font-semibold text-white mt-2 flex flex-col gap-y-2 w-full">
                    <button
                        onClick={() => setAddModal(!addModal)}
                        className="rounded-lg text-center group hover:shadow-xl bg-gray-normal text-white px-2 py-2 flex items-center justify-center gap-1 self hover:opacity-90 hover:scale-105 duration-300 nt">
                        <span className="group-hover:rotate-90 duration-500">
                            <FaPlus />
                        </span>
                        <span>Add Food</span>
                    </button>
                    <hr className="text-gray-normal" />
                    {default_food?.filter(
                        (item: any) => item.category == data?.name
                    )?.length > 0 ? (
                        default_food
                            ?.filter((item: any) => item.category == data?.name)
                            .map((item: any, id: any) => (
                                <li
                                    key={id}
                                    className="flex gap-2 justify-between group cursor-pointer relative ">
                                    <div className="flex gap-2 items-center">
                                        <span>{item?.name}</span>
                                    </div>
                                    <div
                                        onClick={() => onDeleteItem(item)}
                                        className="cursor-pointer flex justify-center items-center">
                                        <span className="rounded-full bg-red-medium p-1 hover:bg-red-light">
                                            <AiOutlineClose fill="white" />
                                        </span>
                                    </div>
                                    {data?.ingredients_allowed ? (
                                        <div
                                            className={`absolute hidden w-auto  group-hover:flex -top-10 -left-10 bg-white shadow-xl text-gray-normal rounded-xl p-6 ${
                                                item?.ingredients.length > 15 &&
                                                '-left-40'
                                            } text-sm whitespace-nowrap w-full`}>
                                            <ul>
                                                {JSON.parse(
                                                    item?.ingredients
                                                )?.map((ing: any, id: any) => (
                                                    <li
                                                        key={id}
                                                        className="flex justify-between items-center">
                                                        {ing.name}
                                                        {ing?.quantity.length >
                                                            0 &&
                                                            ' : ' +
                                                                ing.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            ))
                    ) : (
                        <li className="flex gap-2 justify-between ">
                            <div className="flex gap-2 items-center text-xs justify-center">
                                Click to start{' '}
                            </div>
                            <div
                                onClick={() => setAddModal(!addModal)}
                                className="cursor-pointer flex justify-center items-center hover:shadow-xl">
                                <span className="rounded-full bg-blue-extralight  p-2 hover:bg-blue-adminPanel">
                                    <GiClick fill="white" size={20} />
                                </span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {/* ///////////////////////////////////////////////////////////////////////////  */}
            {/* ////////////////// Add SUb Categories /////////////////////////////////////  */}
            {/* ///////////////////////////////////////////////////////////////////////////  */}

            {addModal && (
                <AddFood
                    editSubCat={editSubCat}
                    data={data}
                    addModal={addModal}
                    setAddModal={setAddModal}
                />
            )}
        </div>
    )
}
