import { useState, useEffect } from 'react'
import { Header } from '../../../components/Header'
import { Layout } from '../../../components/layout/layout'
import { AddProfile } from '../../../components/modal/AddProfile'
import { API_HANDLER, showToast } from '../../../utils/functions'
import { TOAST_TYPE } from '../../../utils/constants'
import { END_POINTS } from '../../../utils/endpoints'
import swal from 'sweetalert'
import { PROFILES, dateDiff } from '../constant'

const Profiles = () => {
    const [addModal, setAddModal] = useState(false)
    const [profilesList, setProfilesList] = useState<any>([])
    const [editProfile, setEditProfile] = useState('')

    const trClass = 'p-2 mx-auto text-start '
    const tdClass = 'p-2 mx-auto '

    useEffect(() => {
        onGetProfileList()
    }, [])
    const onGetProfileList = async () => {
        const result = await API_HANDLER('GET', END_POINTS.PROFILES.GET, '')

        if (result?.status || result?.data) {
            setProfilesList(result?.data?.result)
        }
    }
    const addNewProfile = () => {
        setAddModal(!addModal)
    }
    const onEdit = (item: any) => {
        setEditProfile(item)
        setAddModal(true)
    }
    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete Profile?`,
            text: `Are you sure want to delete ${item.name + ' ' + item.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            // buttons: true as any,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                const result = await API_HANDLER(
                    'DELETE',
                    END_POINTS.PROFILES.REMOVE,
                    { profile_id: item?.profile_id }
                )
                if (!result?.status || !result?.data) {
                    showToast('Invalid id entered', TOAST_TYPE.error)
                } else {
                    swal('You have successfully deleted the Profile.', {
                        icon: 'success',
                    })

                    const result = profilesList?.filter(
                        (_item: any) => _item?.profile_id !== item?.profile_id
                    )
                    setProfilesList(result)
                }
            }
        })
    }
    let count = 0

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <Header
                title="Profiles "
                list={profilesList}
                onApplyFunction={addNewProfile}
            />

            <table
                className="  border border-primaryColor border-collapse p-2 mt-10 w-full"
                border={2}>
                <thead>
                    <tr className="bg-primaryColor">
                        <th className={`${trClass}`}>id</th>
                        <th className={`${trClass}`}>Profile</th>
                        <th className={`${trClass}`}>Name</th>
                        <th className={`${trClass}`}>Age</th>
                        <th className={`${trClass}`}>Allergies</th>
                        <th className={`${trClass}`}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {PROFILES?.map((item, id) => {
                        count++
                        return (
                            <tr
                                key={id}
                                className="hover:bg-lightBg cursor-pointer">
                                <td className={`${tdClass}  content-center `}>
                                    {count}
                                </td>
                                <td className={`${tdClass}`}>
                                    <div className="rounded-full w-12 h-12 flex items-center justify-center   ">
                                        <img src={item.img} alt="" />
                                    </div>
                                </td>
                                <td className={`${tdClass}`}>
                                    {item.fname + ' ' + item.lname}
                                </td>
                                <td className={`${tdClass}`}>
                                    {dateDiff(item.dob).toFixed(1)}
                                </td>
                                <td className={`${tdClass}`}>{item.alergic}</td>
                                <td className={`${tdClass}`}>
                                    {/* <span
                                    // onClick={() => onEdit(item)}
                                    className="font-medium text-blue-extralight dark:text-blue-500 hover:underline cursor-pointer">
                                    Edit
                                </span> */}
                                    <span
                                        // onClick={() => onDeleteItem(item)}
                                        className="font-medium text-red-light  dark:text-blue-500 hover:underline cursor-pointer">
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {addModal && (
                <AddProfile
                    addModal={addModal}
                    setAddModal={setAddModal}
                    onGetProfileList={onGetProfileList}
                    profilesList={profilesList}
                />
            )}
        </div>
    )
    return <Layout children={content} />
}

export default Profiles
