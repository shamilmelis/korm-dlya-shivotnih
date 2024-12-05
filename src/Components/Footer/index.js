import React from 'react'
import '../Footer/styles/main.css'
import '../Footer/styles/media.css'
const Footer = () => {
    return (
        <footer>
            <section className={'footer_section'}>
                <div className="footer_container">
                    <div className="footer_block">
                        <div className={'footer_block_inner'}>
                            <div className={'footer_block_copyrights'}>
                                <span>©2024  all rights reserved - «AnimalMEAL»</span>
                            </div>
                            <div className={'footer_block_author'}>
                                <span>made by: Shamil Melisov</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer