import React from 'react'
import '../Header/style/main.css'
import '../Header/style/media.css'
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import ImageUndefined from '../NoImage/noimages.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBucketData} from "../../Redux/slices/dataSlice";
import {setData} from "../../Redux/slices/dataSlice";
import {useParams} from "react-router";

const Header = ({pro, setPro}) => {
    const [isBurger, setIsBurger] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const dispatch = useDispatch();
    const bucketItems = useSelector((state) => state.data.bucketItems)
    const items = useSelector((state) => state.data.items)
    let params = useParams()
    const [search, setSearch] = useState('')
    let location = useLocation()

    useEffect(() => {

    }, [bucketItems, bucketItems, dispatch, pro, setPro])
    const deleteProduct = (i) => {
        const buck = [...bucketItems]
        buck.splice(i, 1)
        dispatch(setBucketData(buck))
    }
    const plusItem = (product, id) => {
        // const prevItem = isBucket.map(item => item.product_id === id ? {...item, count: item.count += 1} : item)
        dispatch(setBucketData(
            bucketItems.map(item =>
                item.product_id === id
                    ? {
                        ...item,
                        count: item.count + 1,
                        product_price: item.product_price + item.product_initial_price
                    }
                    : item
            )
        ))
        console.log(location)
    }
    const minusItem = (product, id) => {
        // const prevItem = isBucket.map(item => item.product_id === id ? {...item, count: item.count -= 1} : item)
        dispatch(setBucketData(
            bucketItems.map(item =>
                item.product_id === id
                    ? {
                        ...item,
                        count: item.count === 1 ? 1 : item.count - 1,
                        product_price: item.product_price === item.product_initial_price ? item.product_price : item.product_price - item.product_initial_price
                    }
                    : item
            )
        ))
    }

    useEffect(() => {
        if (isPopup === false) {
            document.querySelector('body').style.overflow = ''
        } else {
            document.querySelector('body').style.overflow = 'hidden'
        }
    }, [isPopup])


    return (
        <div>
            <header>
                <div className={'header_container'}>
                    <div className={isBurger === false ? 'header_box' : 'header_box Active'}>
                        <div className={'header_logo'}>
                            <h1 className={'header_title'}>AnimalMEAL</h1>
                            {location.pathname === '/confirm-order' ? '' : <div className={'bucket_counter'}>
                                <button className={'bucket_btn'} onClick={() => setIsPopup(true)}><i className="fa-solid fa-cart-shopping"></i></button>
                                <span className={bucketItems.length === 0 ? 'bucket_counter_span' : 'bucket_counter_span Active'}></span>
                            </div>}
                            <button className={'header_burger'} onClick={() => setIsBurger(!isBurger)}>=</button>
                        </div>
                        <div className={'header_searcher'}>
                            <input type="text" placeholder={'Найти товар'} onChange={(e) => setSearch(e.target.value)} className={'search_input'}/>
                            {search ? <Link to={`/search/${search}`} className={'search_button'}>найти</Link> : <button className={'search_button'}>найти</button>}
                        </div>
                    </div>
                </div>

                <div className={isPopup === false ? 'bucket_popup' : 'bucket_popup Active'}>
                    <div className={'bucket_popup_box'}>
                        <div className={'close_popup'}>
                            <span>Корзина</span>
                            <button className={'close_popup_btn'} onClick={() => setIsPopup(false)}><i
                                className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="inform_product">
                            {
                                bucketItems.length === 0 ? 'Корзина пуста' :
                                    bucketItems.map((el, i) => {
                                        return (
                                            <div className={'product_card'} key={el.id}>
                                                <div className={'product_card_inner'}>
                                                    <img
                                                        src={el.product_image.length === 0 ? ImageUndefined : el.product_image.map(el => el)}
                                                        alt="" className={'product_card_img'}/>
                                                    <div className={'product_card_inner_info'}>
                                                        <span>{el.product_title.length > 40 ? el.product_title.slice(0, 40) + '...' : el.product_title}</span>
                                                        <span>артикул: 171120240502</span>
                                                    </div>
                                                </div>
                                                <div className={'product_card_count_inner'}>
                                                    <button className={'minus_toCount_btn'} onClick={() => minusItem(el, el.product_id)}>-</button>
                                                    <span className={'get_count_value'}>{el.count}</span>
                                                    <button className={'plus_toCount_btn'} onClick={() => plusItem(el, el.product_id)}>+</button>
                                                </div>
                                                <div className={'product_card_inner_price'}>
                                                    <span className={'product_card_price'}>{el.product_price}{el.product_price_currency}</span>
                                                    <button className={'delete_card_button'} onClick={() => deleteProduct(i)}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                            }

                        </div>
                        <div className={'confirm_product'}>
                            {bucketItems.length === 0 ? '' : <Link to={'/confirm-order'} className={'confirm_order_btn'}>Оформить</Link>}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header