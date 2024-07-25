import { FaPlus } from 'react-icons/fa'

export const PlusButton = ({ setModal, modal, setedit }: any) => {
    return (
        <div
            onClick={() => {
                setModal(!modal), setedit(false)
            }}
            className="text-xl md:text-2xl font-semibold mb-1 antialiased mt-6 bg-blue-extralight p-2 cursor-pointer rounded-full flex items-center border-2 border-blue-adminPanel ">
            <FaPlus fill="white" />
        </div>
    )
}

export const Button = ({
    icon,
    bgColor,
    color,
    bgHoverColor,
    size,
    text,
    borderRadius,
    width,
}: any) => {
    return (
        <button
            type="button"
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={` text-${size} px-2 p-2 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}>
            {icon} {text}
        </button>
    )
}
