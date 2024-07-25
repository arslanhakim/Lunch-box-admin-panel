import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { InputWithLabel } from '../../components/InputWithLabel'
import { ASSETS } from '../../assets/path'
import { useDispatch } from 'react-redux'
import { onLogin } from '../../redux/actions/auth.action'
import { Loader } from '../../components/loader'
import { useEffect } from 'react'
import { setAppLoadingState } from '../../redux/actions/loading.action'

export const Auth = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch<any>()
    const location = useLocation()
    const state = location.state as CustomizedState
    useEffect(() => {
        dispatch(setAppLoadingState(false))
    }, [])

    interface CustomizedState {
        type: string
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid Email')
                .required('Email Address Required'),
            password: Yup.string()
                .min(6, 'Minimum 6 characters required.')
                .max(12, 'Maximum 12 characters.')
                .required('Password Required'),
        }),
        onSubmit: async (values: any) => {
            dispatch(onLogin(values, navigate))
        },
    })

    return (
        <div className="   Montserrat-Regular min-h-screen md:flex flex-row items-center justify-center bg-primaryColor relative w-full">
            <Loader />
            <div className="  max-w-1/2   min-h-screen h-full flex flex-col flex-1 top-0  ">
                <div className="flex-1  ">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 mt-4 ">
                        <img
                            src={ASSETS.LOGIN.LOGO}
                            alt=""
                            className="h-full"
                        />
                    </div>
                </div>
                <div className=" flex-1 md:px-0 px-10">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="   space-y-10 w-full  px-10 py-10 md:w-2/3 mx-auto">
                        <div className="text-2xl font-bold">Sign In</div>
                        <div className="space-y-2">
                            <InputWithLabel
                                type="text"
                                name="email"
                                label="Email"
                                placeholder="Enter Email"
                                onChange={formik?.handleChange}
                                onBlur={formik?.handleBlur}
                                value={formik?.values?.email}
                                errors={formik?.errors?.email}
                                touched={formik?.touched?.email}
                                showLabel={true}
                                width="w-full"
                            />
                            <InputWithLabel
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Enter password"
                                onChange={formik?.handleChange}
                                onBlur={formik?.handleBlur}
                                value={formik?.values?.password}
                                errors={formik?.errors?.password}
                                touched={formik?.touched?.password}
                                showLabel={true}
                                width="w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            className="button-black rounded-lg">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div
                className="hidden md:block   top-0 bottom-0 right-0  md:flex-1 w-1/2"
                aria-hidden="true">
                <img
                    src={ASSETS.FOOD.FOOD9}
                    alt=""
                    className="object-cover  w-full h-full max-h-screen min-h-screen"
                />
                <img
                    src={ASSETS.LOGIN.AUTH_DECOR}
                    alt=""
                    width="218"
                    height="224"
                    className="absolute top-1/4 animate-pulse transform -translate-x-1/2 ml-8 hidden lg:block"
                />
            </div>
        </div>
    )
}
