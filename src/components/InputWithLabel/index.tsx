import { FC, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type inputWithLabelProps = {
    showLabel: boolean
    type: string
    label: string
    placeholder: string
    name: string
    onChange: any
    onBlur: any
    value?: any
    errors: any
    touched: any
    defaultValue?: any
    width: string
}

export const InputWithLabel: FC<inputWithLabelProps> = (props) => {
    const [showPassword, setshowPassword] = useState<boolean>(false)
    return (
        <div className="space-y-1 w-full">
            <div className="flex flex-col space-y-2 w-full">
                {props?.showLabel && (
                    <label
                        htmlFor={props?.name}
                        className="block text-sm lg:text-base font-medium">
                        {props?.label}
                    </label>
                )}
                {props.type === 'password' ? (
                    <div
                        className={`flex items-center bg-white border rounded-md
                        ${
                            props?.touched && props?.errors
                                ? 'border-red'
                                : 'border-gray-normal active:border-gray-light'
                        } 
                        `}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id={props?.name}
                            autoFocus
                            name={props?.name}
                            onChange={props?.onChange}
                            onBlur={props?.onBlur}
                            defaultValue={props?.defaultValue}
                            placeholder={props?.placeholder}
                            value={props?.value}
                            className={`px-4 py-1  bg-white items-center w-full lg:py-2 transition outline-none border-none hover:outline-none duration-1000 rounded-md`}
                        />
                        <div className="w-10 flex items-center justify-center">
                            {showPassword ? (
                                <FaEye
                                    onClick={() =>
                                        setshowPassword(!showPassword)
                                    }
                                />
                            ) : (
                                <FaEyeSlash
                                    onClick={() =>
                                        setshowPassword(!showPassword)
                                    }
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <input
                        type={props?.type}
                        id={props?.name}
                        autoFocus
                        name={props?.name}
                        onChange={props?.onChange}
                        onBlur={props?.onBlur}
                        defaultValue={props?.defaultValue}
                        placeholder={props?.placeholder}
                        value={props?.value}
                        className={`px-4 py-1 lg:py-2 w-full transition outline-0.5 outline-gray-normal duration-1000 rounded-md ${
                            props?.touched && props?.errors
                                ? 'border-red'
                                : 'border-gray-normal active:border-gray-light'
                        } `}
                    />
                )}
            </div>

            <div className="text-red-light text-xs text-left h-4">
                {props?.touched && props?.errors ? `* ${props.errors}` : ''}
            </div>
        </div>
    )
}
