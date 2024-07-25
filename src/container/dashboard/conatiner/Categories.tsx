import { useState, useEffect } from 'react'
import { Layout } from '../../../components/layout/layout'
import Modal from '../../../components/modal/modal'
import { showToast } from '../../../utils/functions'
import { uploadFileToCloudinaryViaAPI } from '../../../utils/urls/cloudinary'
import { TOAST_TYPE } from '../../../utils/constants'
import { ASSETS } from '../../../assets/path'
import swal from 'sweetalert'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Header } from '../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { SubCategories } from '../../../components/modal/subCategories'
import {
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
} from '../../../redux/actions/categories.action'
import { setAppLoadingState } from '../../../redux/actions/loading.action'
import { AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { onGetSpecificFood } from '../../../redux/actions/defaultFood.action'

export const Categories = () => {
    const allCats = useSelector((state: any) => state?.CatReducer?.categories)

    const [edit, setEdit] = useState<any>()
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const [subCatsModal, setSubCatsModal] = useState<boolean>(false)
    const [parentData, setParentData] = useState<any>([])
    const [sub_categories, setsub_categories] = useState([])
    const [categories, setCategories] = useState<any>([])

    const dispatch = useDispatch<any>()
    const [ImageUpload, setImageUpload] = useState<any>()
    let subCatId = 0

    const UploadImage = (e: any) => {
        e.preventDefault()
        var file = e.target.files[0]
        setImageUpload({
            url: URL.createObjectURL(file),
            file: file,
        })
    }

    const addCat = () => {
        setEdit('')
        setSubCatsModal(false)
        setModal(!modal)
    }

    const editGlobalCat = (item: any) => {
        setModal(true)
        setSubCatsModal(false)
        setEdit(item)
    }

    useEffect(() => {
        setCategories([...allCats])
    }, [allCats])

    const onAddItem = async (e: any) => {
        if (ImageUpload || edit?.file) {
            setModal(false)
            const data = {
                file: ImageUpload?.file,
                path: 'category',
            }
            let _result
            if (ImageUpload) {
                dispatch(setAppLoadingState(true))
                _result = await uploadFileToCloudinaryViaAPI(data)
            }
            if (_result?.status || edit?.file) {
                if (edit) {
                    const data = {
                        name: e?.name,
                        file: _result?.data?.url || edit?.file,
                        file_path: _result?.data?.public_id || edit?.file_path,
                        category_id: edit?.category_id,
                        ingredients_allowed: e?.ingredients_allowed,
                        sub_categories: edit?.sub_categories,
                        message: e?.message,
                    }
                    dispatch(onUpdateCategory(data))
                    setEdit('')
                    setImageUpload('')
                } else {
                    const data = {
                        name: e?.name,
                        file: _result?.data?.url,
                        file_path: _result?.data?.public_id,
                        ingredients_allowed: e?.ingredients_allowed,
                        sub_categories: null,
                        message: e?.message,
                    }
                    dispatch(onAddCategory(data))
                    setImageUpload('')
                }
            } else {
                showToast(
                    _result.data || 'Something went wrong',
                    TOAST_TYPE.error
                )
            }
        } else {
            showToast('Please Select Image', TOAST_TYPE.error)
        }
    }

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete this Category?`,
            text: `Are you sure want to delete ${item?.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteCategory(item?.category_id))
            }
        })
    }

    const subCats = async (item: any) => {
        const data = {
            name: item.name,
            id: item.category_id,
        }
        dispatch(onGetSpecificFood(data, navigate))
        return
        // setsub_categories(data)
        setParentData(item)
        await setModal(false)
        setSubCatsModal(!subCatsModal)
    }

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <Header
                title="Categories"
                list={allCats}
                onApplyFunction={addCat}
                updatedList={setCategories}
                searchBar={true}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 grid-flow-row gap-3 lg:gap-6  mt-6 duration-700">
                {categories?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="bg-white py-4 flex relative capitalize shadow-xl  gap-3  rounded-xl justify-between items-center px-2 hover:scale-105 duration-300"
                        style={{ boxShadow: '0 1px 5px 2px rgba(0,0,0,0.2)' }}>
                        <div
                            onClick={() => subCats(item)}
                            className="absolute flex justify-end mb-5 bg-[#0d693e] text-white p-[6px] rounded-full right-20 top-2 hover:text-[#0d693e] hover:bg-white hover:border-[#0d693e] hover:border-[1px]  duration-100">
                            <AiFillEye size={17} className="cursor-pointer " />
                        </div>
                        <div
                            onClick={() => editGlobalCat(item)}
                            className="absolute flex justify-end mb-5 bg-[#0d693e] text-white p-2 rounded-full right-11 top-2 hover:text-[#0d693e] hover:bg-white hover:border-[#0d693e] hover:border-[1px]  duration-100">
                            <FaPen size={12} className="cursor-pointer " />
                        </div>
                        <div
                            onClick={() => onDeleteItem(item)}
                            className="absolute  flex justify-end mb-5 bg-[#0d693e] text-white   p-2 rounded-full right-2 top-2 hover:bg-red-medium hover:text-white  duration-100">
                            <FaTrash
                                size={13}
                                className="cursor-pointer hover:text-white"
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-center w-full  ">
                            <div className="rounded-full border-2 hover:drop-shadow-xl border-primaryColor overflow-hidden w-12 h-12 flex items-center justify-center   ">
                                <img
                                    src={item?.file || ASSETS.CATEGORIES.DAIRY}
                                    className="  object-cover h-full w-full "
                                    alt=""
                                />
                            </div>

                            <div className="text-lg antialiased font-bold   text-gray-normal mr-2  ">
                                {item?.name}
                            </div>
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
                    edit={edit}
                    onDeleteItem={onDeleteItem}
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
        </div>
    )
    return <Layout children={content} />
}
