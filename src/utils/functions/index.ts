import { toast } from 'react-toastify'
import { TOAST_TYPE } from '../constants'

import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { BASE_URL } from '../urls'

const config = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
}

export const showToast = (message: any, type = TOAST_TYPE.info) => {
    switch (type) {
        case TOAST_TYPE.info:
            return toast.info(message, config as Object)

        case TOAST_TYPE.success:
            return toast.success(message, config as Object)

        case TOAST_TYPE.warning:
            return toast.warning(message, config as Object)

        case TOAST_TYPE.error:
            return toast.error(message, config as Object)

        default:
            return toast.info(message, config as Object)
    }
}

export const getLocalStorage = (key: any) => {
    return localStorage.getItem(key)
}

export const setLocalStorage = (key: any, value: any) => {
    localStorage.setItem(key, value)
}

export const removeLocalStorage = (key: any) => {
    return localStorage.removeItem(key)
}

export const errorMessage = (message: any) => {
    return {
        error: true,
        message: message,
    }
}

export const API_HANDLER = async (
    method: string,
    endpoint: string,
    data: any
) => {
    var config: any = {
        method: method,
        url: `${BASE_URL}${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
            authorization: `token ${getLocalStorage('token')}`,
        },
        data: data,
    }
    try {
        const result = await axios(config)
        return {
            data: result.data,
            status: true,
        }
    } catch (error: any) {
        return {
            data: error?.response?.data?.message,
            status: false,
        }
    }
}
