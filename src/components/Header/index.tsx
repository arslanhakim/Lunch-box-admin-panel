import { FaArrowLeft, FaPlus, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Header = ({
    title,
    list,
    onApplyFunction,
    defaultFood,
    updatedList,
    searchBar,
    user,
}: any) => {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState<any>('')

    const onSearch = (e: any) => {
        e.preventDefault()
        const name = e.target.value.toLowerCase().trim()
        setSearchInput(name)
        if (user) {
            if (searchInput?.length > 0) {
                const filterList = list.filter((item: any) => {
                    return (
                        item?.fname?.toLowerCase().trim().match(name) ||
                        item?.lname?.toLowerCase().trim().match(name) ||
                        item?.email?.toLowerCase().trim().startsWith(name)
                    )
                })
                updatedList(filterList)
            }
        } else if (name?.length > 0) {
            const filterList = list.filter((item: any) =>
                item?.name?.toLowerCase().startsWith(name)
            )

            updatedList(filterList)
        } else {
            updatedList(list)
        }
    }
    return (
        <div className="flex justify-between items-center mt-14 md:mt-6">
            <div className="flex space-x-2 items-center">
                {defaultFood && (
                    <FaArrowLeft
                        onClick={() => navigate('/categories')}
                        className="cursor-pointer"
                    />
                )}
                <div className="text-xl md:text-1xl font-semibold mb-1 antialiased ">
                    {title}
                </div>
                <div className="flex bg-primaryColor text-xs rounded-full h-7 w-7 p-2 items-center justify-center text-white">
                    {list?.length < 1
                        ? 0
                        : list?.length < 10
                        ? '0' + list?.length
                        : list?.length}
                </div>
            </div>

            <div className="flex sm:gap-2 gap-1  sm:justify-center justify-end items-end align-middle sm:items-center h-full  sm:flex-row flex-col-reverse">
                {searchBar && (
                    <div className="w-full flex justify-center">
                        <label htmlFor="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative mt-1 z-0">
                            <div className="flex absolute  inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <FaSearch />
                            </div>
                            <input
                                onChange={onSearch}
                                type="text"
                                id="table-search"
                                className="block p-2 pl-10 sm:w-80 w-40 text-sm rounded-lg border-primaryDark hover:shadow-md focus:ring-primaryColor focus:border-primaryColor placeholder:text-xs"
                                placeholder={`Search for ${title}`}
                            />
                        </div>
                    </div>
                )}
                <div
                    onClick={onApplyFunction}
                    className="bg-primaryColor capitalize sm:p-2 py-2 mt-1 flex group text-gray-normal h-full  gap-2 lg:px-10 sm:px-6 px-2 cursor-pointer rounded-lg justify-between items-center hover:scale-105 duration-300 ">
                    <FaPlus className="group-hover:rotate-90 duration-500" />
                    <div className="mt-1 text-sm antialiased font-semibold cursor-pointer   ">
                        Add
                    </div>
                </div>
            </div>
        </div>
    )
}
