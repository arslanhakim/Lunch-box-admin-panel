import { AiOutlineClose } from 'react-icons/ai'

const CloseModal = ({ setModal }: any) => {
    return (
        <div
            onClick={() => setModal(false)}
            className="  cursor-pointer w-full">
            <span className="rounded-full bg-gray-normal p-1 absolute z-50 right-4 top-4 hover:bg-red-medium duration-200 hover:scale-110 ">
                <AiOutlineClose className="   " fill="white" />
            </span>
        </div>
    )
}

export default CloseModal
