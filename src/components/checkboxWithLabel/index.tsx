import { FC } from 'react'

type CheckBoxProps = {
    name: string
    List: {}[]
    onChange: any
    onBlur: any
}
export const ChecboxList: FC<CheckBoxProps> = ({
    List,
    onChange,
    onBlur,
    name,
}) => {
    return (
        <>
            {List.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id={item}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={item}
                        className={`accent-purple-primary cursor-pointer Poppins-Regular transition duration-1000`}
                    />
                    <label
                        htmlFor={item}
                        className="text-xs  text-gray-light Poppins-Regular">
                        {item}
                    </label>
                </div>
            ))}
        </>
    )
}
