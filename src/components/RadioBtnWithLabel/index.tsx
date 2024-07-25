import { FC } from 'react'

type CheckBoxProps = {
    name: string
    label: string
    List: {}[]
    onChange: any
    onBlur: any
}
export const RadioBtnList: FC<CheckBoxProps> = ({
    List,
    onChange,
    onBlur,
    name,
    label,
}) => {
    return (
        <div className="flex flex-col space-y-2 ">
            <label
                htmlFor={name}
                className="text-xs md:text-sm  text-gray-normal Poppins-Medium">
                {label}
            </label>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-4">
                {List.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={item}
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={item}
                            className={`accent-purple-primary cursor-pointer Poppins-Regular transition duration-1000`}
                        />
                        <label
                            htmlFor={item}
                            className="text-xs md:text-sm   text-gray-light Poppins-Regular">
                            {item}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
