import React from 'react'
import '../Header/style/main.css'
import '../Header/style/media.css'
import {useState, useEffect} from "react";
import ImageUndefined from '../NoImage/noimages.png'
import {Link} from "react-router-dom";


const Header = ({prodo, mainState, mainSetState}) => {
    const [isBurger, setIsBurger] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [isBucket, setIsBucket] = useState([])

    useEffect(() => {
        setIsBucket(prodo)
    }, [isBucket, prodo])
    const deleteProduct = (i) => {
       const newBucket = isBucket.splice(i, 1)
        setIsBucket(newBucket)
        mainSetState((prevState) => ({
            ...prevState,
            childState: mainState.childState
        }))
    }
    const plusItem = (product, id) => {
        // const prevItem = isBucket.map(item => item.product_id === id ? {...item, count: item.count += 1} : item)
        setIsBucket((prevState) =>
            prevState.map((item) =>
                item.product_id === id ? {...item, count: item.count += 1, product_price: item.product_price += item.product_initial_price} : item
            )
        )
    }
    const minusItem = (product, id) => {
        // const prevItem = isBucket.map(item => item.product_id === id ? {...item, count: item.count -= 1} : item)
        setIsBucket(prevItem =>
            prevItem.map(item =>
                item.count === 1 ? item.product_id === id ? {...item, count: item.count = 1} : item : item.product_id === id ? {...item, count: item.count -= 1, product_price: item.product_price -= item.product_initial_price} : item
            )
        )
    }

    useEffect(() => {
        if (isPopup === false) {
            document.body.style.overflow = ''
        } else {
            document.body.style.overflow = 'hidden'
        }
    }, [isPopup])


    return (
        <div>
            <header>
                <div className={'header_container'}>
                    <div className={isBurger === false ? 'header_box' : 'header_box Active'}>
                        <div className={'header_logo'}>
                            <h1 className={'header_title'}>AnimalFOOD</h1>
                            <div className={'bucket_counter'}>
                                <button className={'bucket_btn'} onClick={() => setIsPopup(true)}><i className="fa-solid fa-cart-shopping"></i></button>
                                <span className={isBucket.length === 0 ? 'bucket_counter_span' : 'bucket_counter_span Active'}></span>
                            </div>
                            <button className={'header_burger'} onClick={() => setIsBurger(!isBurger)}>=</button>
                        </div>
                        <div className={'header_searcher'}>
                            <input type="text" placeholder={'Найти товар'} className={'search_input'}/>
                            <button className={'search_button'}>найти</button>
                        </div>
                    </div>
                </div>

                <div className={isPopup === false ? 'bucket_popup' : 'bucket_popup Active'}>
                    <div className={'bucket_popup_box'}>
                        <div className={'close_popup'}>
                            <span>Корзина</span>
                            <button className={'close_popup_btn'} onClick={() => setIsPopup(false)}>x</button>
                        </div>
                        <div className="inform_product">
                            {
                              isBucket.length === 0 ?
                                  'добавьте какой-нибудь товар':
                                  isBucket.map((el, i) => {
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
                                                  <span className={'product_card_price'}>{el.product_price}</span>
                                                  <button className={'delete_card_button'} onClick={() => deleteProduct(i)}>убрать</button>
                                              </div>
                                          </div>
                                      )
                                  })
                            }

                        </div>
                        <div className={'confirm_product'}>
                            <Link to={'/confirm-order'} bucket={isBucket} className={'confirm_order_btn'}>Оформить</Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header