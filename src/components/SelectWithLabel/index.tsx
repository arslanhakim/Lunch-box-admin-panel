import { FC } from 'react'

type inputWithLabelProps = {
    label: string
    name: string
    onChange: any
    onBlur: any
    value: any
    errors: any
    touched: any
    width: string
    list?: any
    Listtype?: any
}

export const SelectStateWithLabel: FC<inputWithLabelProps> = (props) => (
    <div className="space-y-1 w-full">
        <div className="flex flex-col space-y- w-full">
            <label
                htmlFor={props.name}
                className="block text-sm font-medium mb-1">
                {props.label}
            </label>
            <div
                className={`  ${
                    props?.touched && props?.errors
                        ? 'border-red-error'
                        : 'border-gray-inputBorder active:border-purple-standard'
                } `}>
                <select
                    id={props.name}
                    name={props?.name}
                    onChange={props?.onChange}
                    onBlur={props?.onBlur}
                    value={props?.value}
                    className={` form-select w-full`}>
                    <option value="">Select Option</option>

                    {props?.list?.length > 0 ? (
                        props?.Listtype === 'category' ? (
                            props?.list.map((item: any, index: any) => (
                                <option key={index} value={item?.category_name}>
                                    {item?.category_name}
                                </option>
                            ))
                        ) : props?.Listtype === 'technicians' ? (
                            props?.list.map((item: any, index: any) => (
                                <option key={index} value={item?.user_id}>
                                    {item.fname + ' ' + item.lname}
                                </option>
                            ))
                        ) : props.Listtype === 'month' ? (
                            props?.list.map((item: any, index: any) => (
                                <option key={index} value={item?.id}>
                                    {item.month}
                                </option>
                            ))
                        ) : (
                            props?.list.map((item: any, index: any) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))
                        )
                    ) : (
                        <option>No data found.</option>
                    )}
                </select>
            </div>
        </div>
        {props?.touched && props?.errors && (
            <div className="Poppins-Regular text-red-error text-xs text-left ">
                * {props?.errors}
            </div>
        )}
    </div>
)
