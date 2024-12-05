import React from 'react'
import '../ProductPage/styles/main.css'
import '../ProductPage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState, useEffect} from "react";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import axios from "axios";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import LoadingWrapper from "../../Components/LoadingWrapper";
import Footer from "../../Components/Footer";
import {setBucketData, setData} from "../../Redux/slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";

const ProductPage = () => {
    const [item, setItem] = useState({})
    const dispatch = useDispatch();
    const items = useSelector((state) => state.data.items)
    const bucketItems = useSelector((state) => state.data.bucketItems)
    let {id} = useParams()
    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars/${id}`)
            .then(res => {
                setItem(res.data)
            })
    }, [id])
    const putToBucket = (image,title,price,descr,id,currency) => {
        const newBucket = [...bucketItems]
        let newItem = {
            product_image: image,
            product_title: title,
            product_descr: descr,
            product_price: price,
            product_initial_price: price,
            product_id: id,
            product_price_currency: currency,
            count: 1,
        }
        const currentBucket = [...newBucket, newItem]
        dispatch(setBucketData(currentBucket))
        dispatch(setData(items))
        console.log(items)
    }

    return (
        <div className={'website_wrapper'}>
            <LoadingWrapper></LoadingWrapper>
            <Header></Header>
            <main>
                <section className={'about_product_section'}>
                    <div className="about_product_container">
                        <div className="about_product_row">
                            <div className={'navigate_routes_block'}>
                                <Link to={'/'} className={'back_to_previous_page_btn'}>Главная</Link>
                                <span>></span>
                                <span className={'current_page_btn'}>Корм</span>
                                <span>></span>
                                <span className={'current_page_btn'}>{item.title ? item.title.slice(0, 30) + '...' : item.title}</span>
                            </div>
                            <div className={'item_title_block'}>
                                <h3 className={'product_title'}>{item.title}</h3>
                            </div>
                            <div className={'about_product_inner'}>
                                <div className={'big_image_col'}>
                                    <div className="big_image_block">
                                        <img src={item.image ? item.image.length === 0 ? ImageUndefined : item.image.map(el => el) : ImageUndefined} alt="" className={'big_image'}/>
                                    </div>
                                </div>
                                <div className={'product_info_col'}>
                                    <div className="product_info_block">
                                        <div className={'item_title_block_mobile'}>
                                            <h3 className={'product_title_mobile'}>{item.title}</h3>
                                        </div>
                                        <div className={'to_bucket_block'}>
                                            <span className={'item_price'}>{item.price}{item.price_currency}</span>
                                            <button className={bucketItems.some(el => el.product_id === item.id) ? 'to_bucket_btn Added' : 'to_bucket_btn'} disabled={bucketItems.some(el => el.product_id === item.id)} onClick={() => putToBucket(item.image,item.title,item.price,item.descr,item.id,item.price_currency)}>
                                                {bucketItems.some(el => el.product_id === item.id) ? 'Добавлено' : 'В корзину'}
                                            </button>
                                        </div>
                                        <div className={'item_features_block'}>
                                            <h3 className={'item_features_title'}>На 100 граммов</h3>
                                            <div className={'item_features_inner'}>
                                                <div className={'item_features_col'}>
                                                    <span className={'kal_value'}>55</span>
                                                    <span className={'kal_span'}>ккал</span>
                                                </div>
                                                <div className={'item_features_col'}>
                                                    <span className={'protein_value'}>3 г</span>
                                                    <span className={'protein_span'}>белка</span>
                                                </div>
                                                <div className={'item_features_col'}>
                                                    <span className={'fat_value'}>2,5 г</span>
                                                    <span className={'fat_span'}>жиры</span>
                                                </div>
                                                <div className={'item_features_col'}>
                                                    <span className={'carbohydrate_value'}>4,7 г</span>
                                                    <span className={'carbohydrate_span'}>углеводы</span>
                                                </div>
                                            </div>
                                            <div className={'item_info_block'}>
                                               <div className={'item_info_title_block'}>
                                                   <h3 className={'item_info_title'}>О товаре</h3>
                                               </div>
                                                <div className={'item_info_inner'}>
                                                    <span className={'item_descr_span'}>Описание</span>
                                                    <p className={'item_descr_value'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur corporis debitis dicta eius hic molestias odio quasi quisquam, reiciendis. Adipisci consectetur delectus dicta dolorum eaque facere ipsa iste non numquam odit quas recusandae sed sint ullam vel veritatis, vero?</p>
                                                </div>
                                                <div className={'item_info_inner'}>
                                                    <span className={'item_lineup_span'}>Состав</span>
                                                    <p className={'item_lineup_value'}>Молоко</p>
                                                </div>
                                                <div className={'item_info_inner'}>
                                                    <span className={'item_storage_span'}>Срок годности, условия хранения</span>
                                                    <p className={'item_storage_value'}>18д. от +2С до +6С</p>
                                                </div>
                                                <div className={'item_info_inner'}>
                                                    <span className={'item_production_span'}>Произодитель, страна</span>
                                                    <p className={'item_production_value'}>Alfred Ritter Gmbh & Co.KG, Германия</p>
                                                </div>
                                                <div className={'item_info_inner'}>
                                                    <span className={'item_brand_span'}>Бренд</span>
                                                    <p className={'item_brand_value'}>Ritter Sport</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default ProductPage