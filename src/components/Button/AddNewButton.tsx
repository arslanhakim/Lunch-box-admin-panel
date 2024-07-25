import React from 'react'

export const AddNewButton = ({ modal, setModal, title }: any) => {
    return (
        <button
            onClick={() => setModal(!modal)}
            className="bg-darkPurpleBtn p-2 px-4 rounded-xl text-white italic  text-lg hover:bg-opacity-90">
            Add {title}
        </button>
    )
}
