import { useEffect, useState } from 'react'
import { Layout } from '../../../../components/layout/layout'
import Children from '../../../../components/modal/Children'
import { DUMMY_AVATAR } from '../../../../utils/constants'
import { dateDiff } from '../../constant'
import swal from 'sweetalert'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Header } from '../../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { onDeleteCustomer } from '../../../../redux/actions/customers.action'
import { UserAddContent } from './userAddContent'
import { Pagination } from '../../../../components/Pagination'

export const Users = ({ list }) => {
    const allUsers = useSelector(
        (state: any) => state?.CustomersReducer?.customers
    )

    const [addModal, setAddModal] = useState(false)
    const [profile, setProfile] = useState(false)
    const [usersList, setusersList] = useState<any>([...allUsers])
    const [editUser, setEditUser] = useState<any>('')
    const [userId, setUserId] = useState<any>()
    const [currentItemList, setCurrentItemList] = useState<any>([])

    const tlClass = ' p-3 mx-auto h-full '
    const tdClass = '  p-2 mx-auto '
    const trClass = ''
    const dispatch = useDispatch<any>()

    const onAddUser = () => {
        setEditUser('')
        setProfile(false)
        setAddModal(!addModal)
    }
    const onEditUser = (item: any) => {
        setEditUser(item)
        setProfile(false)
        setAddModal(true)
    }

    const onDeleteItem = (item: any) => {
        setProfile(false)
        setAddModal(false)
        swal({
            title: `Delete this User?`,
            text: `Are you sure want to delete ${
                item.fname + ' ' + item.lname
            }?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                dispatch(onDeleteCustomer(item?.user_id))
            }
            return
        })
    }

    useEffect(() => {
        setusersList([...allUsers])
    }, [allUsers])

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <div>
                <Header
                    title="Users Management"
                    list={allUsers}
                    onApplyFunction={onAddUser}
                    updatedList={setusersList}
                    searchBar={true}
                    user={true}
                />
            </div>

            <table className=" p-2 mt-6 w-full rounded-lg">
                <thead className="text-normal uppercase bg-lightTheme-primary shadow-lg">
                    <tr className="font-semibold tracking-wide text-center">
                        <th className={`${tlClass}`}>Profile</th>
                        <th className={`${tlClass}`}>Full Name</th>
                        <th className={`${tlClass}`}>email</th>
                        <th className={`${tlClass}`}>Age</th>
                        <th className={`${tlClass}`}>Action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {currentItemList?.map((item: any, id: any) => {
                        return (
                            <tr
                                key={id}
                                className={`${trClass} hover:bg-lightBg cursor-pointer text-sm text-center shadow-lg`}>
                                <td
                                    className={`${tdClass} justify-center flex `}>
                                    <div className="rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item?.image || DUMMY_AVATAR}
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td className={` ${tdClass}`}>
                                    {item?.fname + ' ' + item?.lname}
                                </td>
                                <td className={`  ${tdClass}`}>
                                    {' '}
                                    {item.email}
                                </td>
                                <td className={` ${tdClass}`}>
                                    {' '}
                                    {isNaN(dateDiff(item?.dob))
                                        ? '...'
                                        : dateDiff(item?.dob)?.toFixed(0)}
                                </td>
                                <td
                                    className={`${tdClass} flex gap-2 w-full h-full justify-center`}>
                                    <div className="flex p-2">
                                        <span
                                            onClick={() => onEditUser(item)}
                                            className="font-medium text-lightTheme-primary  cursor-pointer hover:bg-gray-media p-2 rounded-full">
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
                        )
                    })}
                </tbody>
            </table>
            {addModal && (
                <UserAddContent
                    editUser={editUser}
                    setAddModal={setAddModal}
                    usersList={usersList}
                />
            )}
            {profile && <Children userId={userId} setProfile={setProfile} />}
            <Pagination
                list={usersList}
                setCurrentItemList={setCurrentItemList}
                currentItemList={currentItemList}
            />
        </div>
    )

    return <Layout children={content} />
}
