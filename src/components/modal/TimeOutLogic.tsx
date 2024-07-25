import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ResetAuthState } from '../../redux/actions/auth.action'
import {
    addEventListeners,
    removeEventListeners,
} from '../../utils/EventListenerUtil'

export const TimeOutLogic = () => {
    const [isWarModalOpen, setWarModalOpen] = useState(false)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const time = 1000 * 60 * 60 * 0.5
    useEffect(() => {
        const createTimeOut = () =>
            setTimeout(() => {
                dispatch(ResetAuthState(navigate))
            }, time)

        const listener = () => {
            if (!isWarModalOpen) {
                clearTimeout(timeout)
                timeout = createTimeOut()
            }
        }

        let timeout = createTimeOut()
        addEventListeners(listener)

        //cleanup
        return () => {
            removeEventListeners(listener)
            clearTimeout(timeout)
        }
    }, [isWarModalOpen])

    return <div></div>
}
