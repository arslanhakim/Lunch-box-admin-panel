import { useState, useEffect } from 'react'

const Button = ({ onClick, text, condition }: any) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-r-md px-3 p-2 border-l-4 border-blue-extralight ${
                condition
                    ? 'bg-[#B8CD82] cursor-pointer hover:drop-shadow-xl border-blue-extralight '
                    : 'bg-gray-light cursor-default text-grayText  border-blue-base '
            } `}>
            {text}
        </button>
    )
}

export const Pagination = ({ list, setCurrentItemList, currentItemList }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = import.meta.env.VITE_ITEMS_PER_PAGE

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        setCurrentItemList(list.slice(indexOfFirstItem, indexOfLastItem))
    }, [currentPage, list])

    const getNextPage = () => {
        if (currentPage !== Math.ceil(list.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const getPrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const showPagination = list.length > 10

    return (
        <div>
            {showPagination && (
                <div className="flex gap-3 mt-6 justify-end">
                    <Button
                        onClick={getPrevPage}
                        text="PREV"
                        condition={currentPage > 1}
                    />
                    <Button
                        onClick={getNextPage}
                        condition={
                            currentPage < Math.ceil(list.length / itemsPerPage)
                        }
                        text="NEXT"
                    />
                </div>
            )}
        </div>
    )
}
