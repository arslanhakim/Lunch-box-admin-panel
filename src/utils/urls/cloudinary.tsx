import axios from 'axios'
import { BASE_URL } from '.'
import { END_POINTS } from '../endpoints'
import { getLocalStorage } from '../functions'

export const uploadFileToCloudinaryViaAPI = async (payload: any) => {
    const formData = new FormData()
    formData.append('file', payload.file)
    formData.append('path', payload.path)
    var config = {
        method: 'POST',
        url: BASE_URL + END_POINTS.UPLOAD.UPLOAD,
        data: formData,
        headers: {
            'Access-Control-Allow-Origin': '*',
            authorization: `token ${getLocalStorage('token')}`,
        },
    }
    try {
        const result = await axios(config)
        return {
            data: result.data.file,
            status: true,
        }
    } catch (error: any) {
        return {
            data: error?.response?.data?.message,
            status: false,
        }
    }
}
