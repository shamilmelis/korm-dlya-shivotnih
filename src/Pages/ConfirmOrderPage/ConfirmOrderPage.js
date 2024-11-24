import React from 'react'
import '../ConfirmOrderPage/styles/main.css'
import '../ConfirmOrderPage/styles/media.css'
import Header from "../../Components/Header/Header";
const ConfirmOrderPage = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <section className={'confirm_order_section'}>
                    <div className="confirm_order_container">
                        Номер заказа: #44
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ConfirmOrderPage