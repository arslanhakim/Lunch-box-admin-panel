import { useState, useEffect } from 'react'
import { GiKnifeFork } from 'react-icons/gi'
import { BiTimeFive } from 'react-icons/bi'
import { FaHeart, FaPen, FaTrash } from 'react-icons/fa'
import { ASSETS } from '../../../../assets/path'

export const Card = ({ items, key, onDeleteItem, setEditRecipe }: any) => {
    const [active, setActive] = useState('INGREDIENTS')
    const [seeMoreMethod, setSeeMoreMethod] = useState(false)
    const [seeMoreIng, setSeeMoreIng] = useState(false)
    const [ingredientsHandle, setIngredientsHandle] = useState<any>([])

    useEffect(() => {
        if (items?.ingredients != undefined) {
            setIngredientsHandle([
                ...(items?.ingredients?.length > 2
                    ? !seeMoreIng
                        ? JSON.parse(items?.ingredients)?.slice(0, 2)
                        : JSON.parse(items?.ingredients)
                    : JSON.parse(items?.ingredients)),
            ])
        }
    }, [seeMoreIng])

    return (
        <div
            key={key}
            className=" w-full rounded-xl overflow-hidden shadow-lg border-[1px] border-primaryColor">
            <div className="relative w-full">
                <img
                    className="w-full h-[15rem]  object-cover  "
                    src={items.file || ASSETS.FOOD.FOOD8}
                    alt=""
                />
                <div
                    onClick={() => setEditRecipe(items)}
                    className="absolute flex justify-end mb-5 text-[#0d693e] bg-white p-2 rounded-full right-11 top-2 hover:bg-[#0d693e] hover:text-white">
                    <FaPen size={15} className="cursor-pointer " />
                </div>
                <div
                    onClick={() => onDeleteItem(items)}
                    className="absolute  flex justify-end mb-5 text-[#0d693e] bg-white  p-[6px] rounded-full right-2 top-2 hover:bg-red-medium hover:text-white ">
                    <FaTrash
                        size={18}
                        className="cursor-pointer hover:text-white"
                    />
                </div>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{items.title}</div>
                <p className="text-gray-normal text-sm">{items.description}</p>
            </div>

            <div className=" flex px-2 pt-4 pb-2 text-xs xl:text-sm font-semibold justify-between mb-2 gap-2">
                <span className="flex flex-col  items-center gap-1 text-xs text-white bg-primaryColor rounded-xl px-3 py-2  w-full">
                    <BiTimeFive size={20} /> Prep: 5 min <br /> cook:
                    {items.cook} min
                </span>
                <span className=" flex flex-col gap-1 justify-center items-center text-white bg-primaryColor rounded-xl px-3 py-2 w-full ">
                    <FaHeart /> {items.type}
                    <div></div>
                </span>
                <span className=" flex flex-col  justify-center gap-1 items-center text-white bg-primaryColor rounded-xl px-3 py-2 w-full ">
                    <GiKnifeFork />
                    Serves:5-6
                </span>
            </div>
            <div className="flex px-6 py-4 justify-center gap-2 font-semibold text-gray-normal">
                <span
                    onClick={() => {
                        setActive('INGREDIENTS')
                    }}
                    className={`flex justify-center w-full cursor-pointer duration-200 ${
                        active == 'INGREDIENTS' ? 'border-b-2 ' : ''
                    }`}>
                    INGREDIENTS
                </span>
                <span
                    onClick={() => {
                        setActive('METHOD')
                    }}
                    className={`flex justify-center w-full cursor-pointer duration-100 ${
                        active == 'METHOD' ? 'border-b-2' : ''
                    }`}>
                    METHOD
                </span>
            </div>
            {active == 'METHOD' && (
                <div className="flex px-12 py-2 flex-col gap-2 text-sm">
                    {items?.method?.length > 100
                        ? seeMoreMethod
                            ? items?.method
                            : items?.method?.substring(0, 100)
                        : items?.method}

                    {items?.method?.length > 100 && (
                        <div
                            onClick={() => setSeeMoreMethod(!seeMoreMethod)}
                            className="text-xs text-blue-extralight cursor-pointer mb-2 font-bold">
                            {seeMoreMethod ? 'Show Less' : 'Show More'}
                        </div>
                    )}
                </div>
            )}

            {active == 'INGREDIENTS' && items?.ingredients && (
                <div className="flex flex-col gap-1 px-6 mb-2">
                    {ingredientsHandle?.map((item: any, index: any) => (
                        <div
                            key={index}
                            className="flex flex-col px-6 py-2 duration-300">
                            <div className="flex justify-between items-center text-sm   ">
                                <span>{item.name}</span>
                                <span>{item.quantity}</span>
                            </div>
                        </div>
                    ))}

                    {JSON.parse(items?.ingredients)?.length > 2 && (
                        <div
                            onClick={() => setSeeMoreIng(!seeMoreIng)}
                            className="text-xs text-blue-extralight cursor-pointer mb-2 font-bold px-6 ">
                            {seeMoreIng ? 'Show Less' : 'Show More'}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
