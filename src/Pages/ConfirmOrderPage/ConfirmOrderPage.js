import React from 'react'
import '../ConfirmOrderPage/styles/main.css'
import '../ConfirmOrderPage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState, useEffect} from "react";
import {setBucketData, setData, setFilteredData} from "../../Redux/slices/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import {useNavigate} from "react-router-dom";
import LoadingWrapper from "../../Components/LoadingWrapper";

const ConfirmOrderPage = () => {
    const bucketItems = useSelector((state) => state.data.bucketItems)
    const items = useSelector((state) => state.data.items)
    const filteredItems = useSelector((state) => state.data.filteredItems)
    const dispatch = useDispatch()
    const [deliveryType, setDeliveryType] = useState(1)
    const navigate = useNavigate();
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1
    useEffect(() => {

    }, [bucketItems, dispatch])

    useEffect(() => {
        if (bucketItems.length === 0) {
            navigate('/')
        }
    }, [bucketItems, dispatch, navigate])
    const deleteProduct = (item) => {
        console.log(item)
        console.log(bucketItems.filter(el => el.item))
        const newBucket = [...bucketItems]
        newBucket.splice(item, 1)
        dispatch(setBucketData(newBucket))
        dispatch(setFilteredData(filteredItems))
        if (newBucket.length === 0) {
            navigate(-1)
        }
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

    return (
        <div>
            <LoadingWrapper></LoadingWrapper>
            <Header></Header>
            <main>
                <section className={'confirm_order_section'}>
                    <div className="confirm_order_container">
                        <div className="confirm_order_box">
                            <div className={'navigate_routes_block'}>
                                <button onClick={() => navigate('/')} className={'back_to_previous_page_btn'}>Главная</button>
                                /
                                <button onClick={() => navigate('/confirm-order')} className={'back_to_previous_page_btn'}>Оформление заказа</button>
                            </div>
                            <div className="confirm_order_row">
                                <div className="confirm_order_user_fio_col">
                                    <div className="confirm_order_user_fio_box">
                                        <h3 className={'confirm_order_title'}>Оформление заказа</h3>
                                        <span className={'personal_info_span'}>Личные данные</span>
                                        <div className={'user_fio_inner'}>
                                            <div className={'user_fio_inner_box'}>
                                                <span className={'information_extra_span'}>Как к вам обращаться?</span>
                                                <input
                                                    type="text"
                                                    className={'user_info_input'}
                                                    placeholder={'ФИО'}
                                                />
                                            </div>
                                            <div className={'user_fio_inner_box'}>
                                                <span className={'information_extra_span'}>Для согласования деталей*</span>
                                                <input
                                                    type="text"
                                                    className={'user_info_input'}
                                                    placeholder={'+999 (999) 99-99-99'}
                                                />
                                            </div>
                                            <div className={'user_fio_inner_box'}>
                                                <span className={'information_extra_span'}>Чтобы выслать информацию по заказу</span>
                                                <input
                                                    type="text"
                                                    className={'user_info_input'}
                                                    placeholder={'example@mail.ru'}
                                                />
                                            </div>
                                            <div className={'user_fio_commit_box'}>
                                                <input type="checkbox"/>
                                                <span className={'commit_politics_span'}>Согласен на обработку персональных данных</span>
                                            </div>
                                        </div>
                                        <div className={'user_place_inner'}>
                                            <span className={'delivery_span'}>Доставка</span>
                                            <span className={'delivery_value'}>В г.Бишкек</span>
                                            <div className="user_place_inner_box">
                                                <div className="user_place_inner_list">
                                                    <button className={'select_typeOfDelivery_btn'} onClick={() => setDeliveryType(0)}></button>
                                                    <input type="radio" checked={deliveryType === 0 ? true : false}/>
                                                    <div className={'user_place_inner_list_box'}>
                                                        <span className={deliveryType === 0 ? 'typeOfDelivery_span' : 'typeOfDelivery_span Disabled'}>Самовывоз</span>
                                                        <span className={deliveryType === 0 ? 'priceOfDelivery_span' : 'priceOfDelivery_span Disabled'}>Бесплатно</span>
                                                        <span className={deliveryType === 0 ? 'timeOfDelivery_span' : 'timeOfDelivery_span Disabled'}>Сегодня после 16:00 по адресу г.Бишкек, Исанова 145</span>
                                                    </div>
                                                </div>
                                                <div className="user_place_inner_list">
                                                    <button className={'select_typeOfDelivery_btn'} onClick={() => setDeliveryType(1)}></button>
                                                    <input type="radio" checked={deliveryType === 1 ? true : false}/>
                                                    <div className={'user_place_inner_list_box'}>
                                                        <span className={deliveryType === 1 ? 'typeOfDelivery_span' : 'typeOfDelivery_span Disabled'}>Курьером</span>
                                                        <span className={deliveryType === 1 ? 'priceOfDelivery_span' : 'priceOfDelivery_span Disabled'}>300с</span>
                                                        <span className={deliveryType === 1 ? 'timeOfDelivery_span' : 'timeOfDelivery_span Disabled'}>Дата доставки: {day}.{month} - {day + 1}.{month}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user_adress_inner">
                                            <span className={'personal_adress_span'}>Адрес</span>
                                            <div className={'user_adress_inner_box'}>
                                                <span className={'user_adress_location_span'}>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                </span>
                                                <span className={'user_city_span'}>Бишкек</span>
                                                <button className={'change_city_btn'}>изменить город</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirm_order_user_bucket_col">
                                    <div className="confirm_order_user_bucket_box">
                                        <h3>Ваша корзина</h3>
                                        <div className={'confirm_order_user_bucket_inner'}>
                                            {
                                                bucketItems.map((item, index) => {
                                                    return (
                                                        <div className="this_order">
                                                            <img
                                                                src={item.product_image.length === 0 ? ImageUndefined : item.product_image.map(el => el)}
                                                                alt=""
                                                                className={'this_order_image'}
                                                            />
                                                            <div className={'this_order_info'}>
                                                                <span className={'this_order_title'}>{item.product_title.length > 55 ? item.product_title.slice(0, 55) + '...' : item.product_title}</span>
                                                                <span className={'this_order_price'}>{item.product_price}{item.product_price_currency}</span>
                                                                <div className={'this_order_actions'}>
                                                                    <div className={'this_order_count'}>
                                                                        <button className={'to_minus_count_btn'} onClick={() => minusItem(item, item.product_id)}>-</button>
                                                                        <span className={'count_value'}>{item.count}</span>
                                                                        <button className={'to_plus_count_btn'} onClick={() => plusItem(item, item.product_id)}>+</button>
                                                                    </div>
                                                                    <button className={'delete_this_order_btn'} onClick={() => deleteProduct(index)}>
                                                                        <i className="fa-solid fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className={'confirm_order_user_bucket_total'}>
                                        {deliveryType === 1 ? <div className={'typeOfDelivery_block'}>
                                            <span>Доставка</span>
                                            <span>300₽</span>
                                        </div> : ''}
                                        <div className={'discount_block'}>
                                            <span className={'discount_value_span'}>Скидка 0%</span>
                                            <span className={'discount_value'}>{bucketItems.reduce((sum, product) => {
                                                return deliveryType === 1 ?  sum + product.product_price + 300 : sum + product.product_price
                                            }, 0)}₽</span>
                                        </div>
                                        <div className={'to_pay_block'}>
                                            <span className={'to_pay_span'}>К оплате</span>
                                            <span className={'to_pay_value'}>{bucketItems.reduce((sum, product) => {
                                                return deliveryType === 1 ?  sum + product.product_price + 300 : sum + product.product_price
                                            }, 0)}₽</span>
                                        </div>
                                        <div className="total_pay_block">
                                            <span className={'total_pay_span'}>Итого:</span>
                                            <span className={'total_pay_value'}>{bucketItems.reduce((sum, product) => {
                                                return deliveryType === 1 ?  sum + product.product_price + 300 : sum + product.product_price
                                            }, 0)}₽</span>
                                        </div>
                                        <div className={'admit_order_block'}>
                                            <button className={'admit_order_btn'}>Оформить</button>
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

export default ConfirmOrderPage