import { FaTimes } from 'react-icons/fa'

export const TagInputWithLabel = (props) => {
    return (
        <div className="space-y-1 w-full">
            <div className="flex space-x-1"></div>
            <div className="flex flex-col space-y-1 w-full">
                <label
                    htmlFor={props?.name}
                    className="text-xs sm:text-sm text-gray-normal Poppins-Medium">
                    {props?.label}
                </label>

                <input
                    type={props?.type}
                    id={props?.name}
                    name={props?.name}
                    onChange={props?.onChange}
                    placeholder={props?.placeholder}
                    className={`h-7 sm:h-8 md:h-10 text-gray w-full outline-none px-3 text-xs sm:text-sm 2xl:text-base border Poppins-Regular transition duration-1000 border-gray-inputBorder active:border-purple-standard `}
                />
            </div>
            <div className="flex space-x-1">
                {props.list.map((item, index) => (
                    <div
                        className="text-xs px-1 flex items-center space-x-1 border border-gray-500 rounded-sm cursor-pointer"
                        key={index}
                        onClick={() => props.onRemoveItem(index)}>
                        <span>{item}</span>{' '}
                        <FaTimes className="hover:text-red-600" />
                    </div>
                ))}
            </div>
            {props?.touched && props?.errors && (
                <div className="Poppins-Regular text-red-error text-xs text-left ">
                    * {props?.errors}
                </div>
            )}
        </div>
    )
}
