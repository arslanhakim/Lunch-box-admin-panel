import { useState, useEffect } from 'react'
import { Layout } from '../../../components/layout/layout'
import Modal from '../../../components/modal/modal'
import swal from 'sweetalert'
import { FaTimes } from 'react-icons/fa'
import { Header } from '../../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {
    onAddAllergies,
    onDeleteAllergies,
} from '../../../redux/actions/allergies.action'

export const Allergies = () => {
    const dispatch = useDispatch<any>()
    const allAllergies = useSelector(
        (state: any) => state?.AllergiesReducer?.allergies
    )
    const [allergies, setAllergies] = useState<any>([])
    const [modal, setModal] = useState(false)

    const addAllergies = (e: any) => {
        setModal(!modal)
    }

    useEffect(() => {
        setAllergies([...allAllergies])
    }, [allAllergies])

    const onAddItem = async (e: any) => {
        const data = {
            name: e.name,
            global: 1,
        }
        dispatch(onAddAllergies(data))
        setModal(!modal)
    }
    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete the Allergy`,
            text: `Are you sure want to delete ${item.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],

            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                dispatch(onDeleteAllergies(item.alergy_id))
            }
        })
    }

    const content = (
        <div className="pl-4 md:pl-8 mr-6">
            <Header
                title="Allergies"
                list={allAllergies}
                onApplyFunction={addAllergies}
                updatedList={setAllergies}
                searchBar={true}
            />
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row gap-3 lg:gap-6  mt-6 ">
                {allergies?.map((item: any, index: any) => (
                    <div
                        key={index}
                        className="relative capitalize group bg-white py-4 flex cursor-pointer rounded-xl justify-center items-center px-2 duration-300 hover:scale-105 "
                        style={{ boxShadow: '0 1px 5px 2px rgba(0,0,0,0.2)' }}>
                        <div className="text-sm antialiased font-semibold cursor-pointer text-gray-normal">
                            {item?.name}
                        </div>
                        <div
                            className="absolute group-hover:flex hidden -right-1 -top-1 cursor-pointer text-sm h-6 items-center justify-center w-6 rounded-full bg-red-medium text-white"
                            onClick={() => onDeleteItem(item)}>
                            <FaTimes />
                        </div>
                    </div>
                ))}
            </div>
            {modal && (
                <Modal
                    modal={modal}
                    setModal={setModal}
                    onAddItem={onAddItem}
                    onDeleteItem={onDeleteItem}
                    name="a"
                    img="a"
                />
            )}
        </div>
    )
    return <Layout children={content} />
}
