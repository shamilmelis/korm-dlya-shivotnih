import React from 'react'
import '../Notification/styles/main.css'
import '../Notification/styles/media.css'
const Notification = () => {
    return (
        <div className={'notification_box'}>
            <div className="notification_inner">
                <span className={'notif_bar'}></span>
                <div className={'notification_info'}>
                    <span className={'notif_title'}>Вы добавили товар в корзину!</span>
                </div>
                <span className={'notif_progress_bar'}></span>
            </div>
        </div>
    )
}

export default Notification