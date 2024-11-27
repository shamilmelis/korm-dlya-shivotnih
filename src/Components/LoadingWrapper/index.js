import React from 'react'
import '../LoadingWrapper/style/main.css'
import '../LoadingWrapper/style/media.css'
import {useState} from "react";
const LoadingWrapper = () => {
    const [loading ,setLoading] = useState(true)

    setTimeout(() => {
        setLoading(false)
    }, 1000)
    return (
        <div className={loading === true ? 'loading_wrapper' : 'loading_wrapper Deactivate'}>
            <div className={'loading_wrapper_block'}>
                <span>LOADING...</span>
            </div>
        </div>
    )
}

export default LoadingWrapper