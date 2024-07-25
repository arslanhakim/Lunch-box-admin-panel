import { FC } from 'react'

type inputWithLabelProps = {
    label: string
    placeholder?: string
    name: string
    onChange: any
    onBlur: any
    value: any
    errors: any
    touched: any
    width: string
}

export const TextAreaWithLabel: FC<inputWithLabelProps> = (props) => (
    <div className="space-y-1 w-full">
        <div className="flex flex-col space-y-1 w-full">
            <label
                htmlFor={props?.name}
                className="block text-sm font-medium mb-1">
                {props?.label}{' '}
                <span className="text-xs">(Max up to 100 characters)</span>
            </label>
            <textarea
                rows={5}
                id={props?.name}
                name={props?.name}
                onChange={props?.onChange}
                onBlur={props?.onBlur}
                placeholder={props?.placeholder}
                value={props?.value}
                className={`form-input w-full transition duration-1000 ${
                    props?.touched && props?.errors
                        ? 'border-red-error'
                        : 'border-gray-inputBorder active:border-purple-standard'
                } `}
            />
        </div>
        {props?.touched && props?.errors && (
            <div className="Poppins-Regular text-red-error text-xs text-left ">
                * {props?.errors}
            </div>
        )}
    </div>
)
