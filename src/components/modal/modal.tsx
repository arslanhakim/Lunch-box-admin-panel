import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { TOAST_TYPE } from '../../utils/constants'
import { showToast } from '../../utils/functions'
import CloseModal from '../Button/closeModal'

const Modal = ({
    setModal,
    onAddItem,
    image,
    UploadImage,
    ImageUpload,
    edit,
    avatar,
}: any) => {
    const [name, setName] = useState(edit?.name || '')
    const [message, setMessage] = useState(edit?.message || '')
    const [checked, setChecked] = useState(edit?.ingredients_allowed || false)
    const allCats = useSelector((state: any) => state?.CatReducer?.categories)

    const handleChange = (event: any) => {
        setChecked(event.target.checked)
    }
    const nameChangeHandler = (e: any) => {
        e.preventDefault()
        setName(e?.target?.value)
    }
    const messageChangeHandler = (e: any) => {
        e.preventDefault()
        setMessage(e?.target?.value)
    }

    // / submit handler
    const submithandlers = (e: any) => {
        e.preventDefault()
        const exist = !edit
            ? allCats?.find(
                  (item: any) =>
                      item?.name.trim()?.toLowerCase() ==
                      name?.trim()?.toLowerCase()
              )
            : false

        if (exist) {
            return showToast('Category Already Exists', TOAST_TYPE.error)
        }

        const data = {
            name: name.trim(),
            message: message.trim(),
            ingredients_allowed: checked,
        }
        onAddItem(data)
    }

    return (
        <div className="fixed top-1/3 left-[20%] lg:left-1/3 z-99 bg-primaryColor    rounded-xl border-white border-2 md:w-auto w-[70%] overflow-hidden">
            <CloseModal setModal={setModal} />
            <div className="flex  p-6 mt-8 w-full">
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={submithandlers}>
                    {!avatar && (
                        <div className="flex flex-col capitalize gap-4 w-full">
                            <input
                                type="text"
                                required
                                className="outline-none w-full rounded-lg"
                                placeholder="Enter Name "
                                autoFocus
                                value={name}
                                onChange={nameChangeHandler}
                            />
                            {(image || edit?.file) && (
                                <input
                                    type="text"
                                    className="outline-none w-full rounded-lg"
                                    placeholder="Enter Category Message"
                                    value={message}
                                    onChange={messageChangeHandler}
                                />
                            )}
                            {(image || edit?.file) && (
                                <div className="flex gap-2  items-center">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                    Allow Ingredients
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex sm:flex-row flex-col gap-2 items-center w-full">
                        {image || edit?.file ? (
                            <div className="rounded-full border-2 border-white w-12 h-12 flex items-center overflow-hidden justify-center self-center  ">
                                <img
                                    src={ImageUpload?.url || edit?.file}
                                    className={'bg-cover w-full h-full'}
                                    alt=""
                                />
                            </div>
                        ) : (
                            ''
                        )}
                        {image && (
                            <input
                                type="file"
                                id="img"
                                accept="image/jpeg, image/png"
                                onChange={UploadImage}
                                placeholder="Enter Category name"
                            />
                        )}
                    </div>
                    <div
                        className={`flex justify-between w-full flex-wrap 
                        ${
                            edit?.name
                                ? 'justify-between gap-2'
                                : 'justify-center'
                        }
                        `}>
                        <button
                            type="submit"
                            className="bg-gray-normal text-white px-4 py-2 rounded-xl w-full md:w-full cursor-pointer">
                            {edit ? 'Update' : 'ADD'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
