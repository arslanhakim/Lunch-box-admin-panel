import { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { Header } from '../../../../components/Header'
import { Layout } from '../../../../components/layout/layout'
import { AddCoupon } from '../../../../components/modal/AddCoupon'
import { onDeleteCoupon } from '../../../../redux/actions/coupon.action'
import { Pagination } from '../../../../components/Pagination'

export const Coupon = ({ list }) => {
    const coupons = useSelector((state: any) => state?.CouponsReducer?.coupons)
    const dispatch = useDispatch<any>()
    const [modal, setModal] = useState(false)
    const [editCoupon, setEditCoupon] = useState<any>(false)
    const [editItem, seteditItem] = useState<any>()
    const [couponsList, setcouponsList] = useState(coupons ? [...coupons] : [])
    const [currentItemList, setCurrentItemList] = useState<any>([])
    useEffect(() => {
        setcouponsList(coupons ? [...coupons] : [])
    }, [coupons])

    const checkBox = (
        <div className="flex items-center">
            <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
            </label>
        </div>
    )

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete this Coupon?`,
            text: `Are you sure want to delete ${item.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteCoupon(item?.coupon_id))
            }
        })
    }

    const onEditItem = async (item: any, id: any) => {
        await setEditCoupon(true)
        await seteditItem({ ...item, id })
        setModal(!modal)
    }

    const onAddCoupon = async () => {
        await setEditCoupon(false)
        setModal(!modal)
    }
    const tableHeading = ['Name', 'Code', 'amount', 'Status', 'Action']
    const content = (
        <div className="  pl-4 md:pl-8 mr-6">
            <Header
                title="Coupons / Discounts"
                list={coupons}
                onApplyFunction={onAddCoupon}
                updatedList={setcouponsList}
                searchBar={true}
            />

            <div className="overflow-x-auto relative shadow-lg sm:rounded-lg mt-6">
                <table className="w-full text-sm text-left capitalize ">
                    <thead className="text-normal uppercase bg-primaryColor shadow-lg p-4">
                        <tr>
                            {tableHeading.map((item: any, id: any) => (
                                <th key={id} scope="col" className="py-3 px-6">
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItemList?.map((item: any, id: any) => (
                            <tr
                                key={id}
                                className="cursor-pointer shadow-lg  hover:bg-lightBg ">
                                <th
                                    scope="row"
                                    className="py-4 px-6 font-medium  whitespace-nowrap  ">
                                    {item?.name}
                                </th>
                                <td className="py-4 px-6">{item?.code}</td>
                                <td className="py-4 px-6">
                                    {item?.percent + '%'}
                                </td>
                                <td className="py-4 px-6 flex  items-center gap-1">
                                    <div
                                        className={`p-1 h-1 w-1 rounded-full ${
                                            item?.status?.toLowerCase() ==
                                            'active'
                                                ? 'bg-lightTheme-primary'
                                                : 'bg-[#f08c00]'
                                        } `}></div>{' '}
                                    {item?.status}
                                </td>

                                <td className="py-4 px-6">
                                    <div className="flex gap-2 w-full h-full">
                                        <span
                                            onClick={() => onEditItem(item, id)}
                                            className="font-medium text-lightTheme-primary cursor-pointer  hover:bg-gray-media p-2 rounded-full">
                                            <FaPen />
                                        </span>

                                        <span
                                            onClick={() => onDeleteItem(item)}
                                            className="font-medium text-red-light  cursor-pointer hover:bg-gray-media p-2 rounded-full">
                                            <FaTrash />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                list={couponsList}
                setCurrentItemList={setCurrentItemList}
                currentItemList={currentItemList}
            />
            {modal && (
                <AddCoupon
                    modal={modal}
                    setModal={setModal}
                    data={editCoupon}
                    edit={editCoupon}
                    editItem={editItem}
                    couponsList={couponsList}
                    setcouponsList={setcouponsList}
                />
            )}
        </div>
    )
    return <Layout children={content} />
}
