import React from 'react'
import '../ProductPage/styles/main.css'
import '../ProductPage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState, useEffect} from "react";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import axios from "axios";
import {useParams} from "react-router";
const ProductPage = () => {
    const [item, setItem] = useState({})
    let {id} = useParams()
    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars/${id}`)
            .then(res => {
                setItem(res.data)
            })
    }, [item, id])
    return (
        <div>
            <Header></Header>
            <main>
                <section className={'about_product_section'}>
                    <div className="about_product_container">
                        <div className="about_product_row">
                            <div></div>
                            <div className={'about_product_inner'}>
                                <div className={'big_image_col'}>
                                    <div className="big_image_block">
                                        <img src={item.image ? item.image : ImageUndefined} alt="" className={'big_image'}/>
                                    </div>
                                </div>
                                <div className={'product_info_col'}>
                                    <div className="product_info_block">
                                        <h3 className={'product_title'}>{item.title}</h3>
                                        <div className={'descr_block'}>
                                            <span>Описание:</span>
                                            <p className={'descr_p'}>{item.descr}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ProductPage