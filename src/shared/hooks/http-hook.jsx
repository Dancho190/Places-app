import {useCallback, useRef, useState, useEffect } from 'react'
// UseEffect и UseCallback используется для выполнения асинхронных Api запросов.
export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback( 
        async (
            url, 
            method = 'GET', 
            body = null, 
            headers = {}) => {
        setIsLoading(true)
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

     try { 

        const responce = await fetch(url, {
            method,
            body,
            headers,
            signal: httpAbortCtrl.signal
        })
        
        const responceData = await responce.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
            reqCtrl => reqCtrl !== httpAbortCtrl
        )

        if (!responce.ok) {
            throw new Error(responceData.message)
        }

        setIsLoading(false)
        return responceData
    } catch (err) {
        if(!err.message === 'The user aborted a request.'){
        setError(err.message)
        setIsLoading(false)
        throw err
        }
    }
    }, 
[]
)

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return {isLoading, error,sendRequest, clearError }
}