import { useState, useEffect } from 'react'
import { Layout } from '../../../../components/layout/layout'
import swal from 'sweetalert'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Header } from '../../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { SubCategories } from '../../../../components/modal/subCategories'
import { AddFood } from './addFood'
import { onDeleteFood } from '../../../../redux/actions/defaultFood.action'

export const DefaultFood = () => {
    const [addModal, setAddModal] = useState(false)
    const [editSubCat, setEditSubCat] = useState<any>([])
    const { default_food, selected_category } = useSelector(
        (state: any) => state.DefaultFoodReducer
    )

    const [edit, setEdit] = useState<any>()
    const [modal, setModal] = useState(false)
    const [subCatsModal, setSubCatsModal] = useState<boolean>(false)
    const [parentData, setParentData] = useState<any>([])
    const [sub_categories, setsub_categories] = useState([])

    const dispatch = useDispatch<any>()

    let subCatId = 0

    const editDefaultFood = (item: any) => {
        setParentData(item?.category)

        setModal(true)
        setSubCatsModal(false)
        setEdit(item)
    }

    useEffect(() => {
        setsub_categories([...default_food])
    }, [default_food])

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete Food Item`,
            text: `Are you sure want to delete ${item.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteFood(item?.fooditem_id))
            }
        })
    }

    const addFood = () => {
        setAddModal(!addModal)
    }

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <Header
                title={selected_category?.name}
                defaultFood={true}
                list={default_food?.filter(
                    (item: any) => item?.category_id == selected_category?.id
                )}
                onApplyFunction={addFood}
                updatedList={setsub_categories}
                searchBar={true}
            />

            <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-5  w-auto gap-3 lg:gap-6 mt-6 duration-700">
                {sub_categories
                    ?.filter(
                        (item: any) =>
                            item?.category_id == selected_category?.id
                    )
                    ?.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white group text-center capitalize py-1 h-14 text-sm relative flex flex-col shadow-xl group gap-3 rounded-xl items-center px-4 hover:scale-105 duration-300"
                            style={{
                                boxShadow: '0 1px 5px 2px rgba(0,0,0,0.2)',
                            }}>
                            <div className="hidden flex-col gap-2 absolute -right-1 -top-1 group-hover:flex">
                                <div
                                    onClick={() => onDeleteItem(item)}
                                    className=" bg-red-medium text-white hover:bg-white hover:text-red-medium hover:border-red-medium hover:border-[1px] p-2 rounded-full ">
                                    <FaTrash
                                        size={8}
                                        className="cursor-pointer"
                                    />
                                </div>

                                <div
                                    onClick={() => editDefaultFood(item)}
                                    className="bg-[#0d693e] text-white p-2 rounded-full   hover:text-[#0d693e] hover:bg-white hover:border-[#0d693e] hover:border-[1px] ">
                                    <FaPen
                                        size={8}
                                        className="cursor-pointer "
                                    />
                                </div>
                            </div>

                            <div
                                className={`absolute hidden w-auto  group-hover:flex z-9999999999999  bg-white shadow-xl text-gray-normal rounded-xl p-6 -top-20 text-sm whitespace-nowrap  ${
                                    index == 0 ? '-top-20 left-9' : '-left-5'
                                } `}>
                                <ul>
                                    {JSON.parse(
                                        item?.ingredients
                                    )[0]?.name?.trim() ? (
                                        JSON.parse(item?.ingredients)?.map(
                                            (ing: any, id: any) => (
                                                <li
                                                    key={id}
                                                    className="flex justify-between items-center">
                                                    {ing.name}
                                                    {ing?.quantity?.length >
                                                        0 || ing?.quantity > 0
                                                        ? ' : ' + ing?.quantity
                                                        : ''}
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <div>No Ingredients</div>
                                    )}
                                </ul>
                            </div>
                            <div className="flex justify-center items-center   cursor-pointer bottom-0 h-full w-full">
                                <div className="text-sm antialiased font-bold cursor-pointer text-gray-normal    ">
                                    {item?.name}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {modal && (
                <AddFood
                    data={parentData}
                    addModal={modal}
                    setAddModal={setModal}
                    editSubCat={edit}
                    category={selected_category}
                    edit={true}
                />
            )}
            {subCatsModal && (
                <SubCategories
                    modal={subCatsModal}
                    setModal={setSubCatsModal}
                    data={parentData}
                    subCat={sub_categories}
                    subCatId={subCatId}
                />
            )}
            {addModal && (
                <AddFood
                    data={parentData}
                    editSubCat={editSubCat}
                    addModal={addModal}
                    setAddModal={setAddModal}
                    category={selected_category}
                    edit={false}
                />
            )}
        </div>
    )
    return <Layout children={content} />
}
