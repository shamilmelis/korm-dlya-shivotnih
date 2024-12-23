import React, {useEffect} from 'react'
import '../HomePage/styles/main.css'
import '../HomePage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState} from "react";
import axios from "axios";
import {styled, keyframes} from "styled-components";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import {useSelector, useDispatch} from "react-redux";
import {setBucketData, setData} from "../../Redux/slices/dataSlice";
import LoadingWrapper from "../../Components/LoadingWrapper";
import Footer from "../../Components/Footer";
import {Link} from "react-router-dom";
import Notification from "../../Components/Notification";

const HomePage = () => {
    const [tagsArr, setTagsArr] = useState({
        tags: [],
        priceControl: {
            min:  1,
            max:  999999,
        }
    })
    const [products, setProducts] = useState()
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(999999)
    const [productToBucket, setProductToBucket] = useState([])
    const [initialItems, setInitialItems] = useState([])
    const [localItems, setLocalItems] = useState()
    const dispatch = useDispatch();
    const items = useSelector((state) => state.data.items)
    const bucketItems = useSelector((state) => state.data.bucketItems)
    const [notifications, setNotifications] = useState([])

    const [listMode, setListMode] = useState(false)
    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars`)
            .then(res => {
                console.log('API =>' , res)
                dispatch(setData(res.data))
                setInitialItems(res.data)
                setProducts(res.data)
            })
    }, [])
    useEffect(() => {
        setLocalItems(items)
    }, [items,bucketItems, dispatch, localItems, initialItems, productToBucket])

    const putToBucket = (image,title,price,descr,id,currency) => {
        let ID = Date.now()
        let notific = {ID, message: 'новое уведомление'}
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
        setTimeout(() => {
            setNotifications((prev) => prev.filter(el => el.ID !== ID))
        }, 5000)
        setNotifications((prev) => [...prev, notific])
    }

    const getTag = (tag, tagId) => {
        let index = tagsArr.tags.indexOf(tagId)
        if (!tagsArr.tags.includes(tagId)) {
            tagsArr.tags.push(tagId);
            tag.nextElementSibling.checked = true;
        } else if (tagsArr.tags.includes(tagId)) {
            tagsArr.tags.splice(index, 1);
            tag.nextElementSibling.checked = false;
        }
    }
    useEffect(() => {

    }, [items, tagsArr.tags, tagsArr, minPrice, maxPrice])
    useEffect(() => {

    }, [notifications])
    const filterFunction = () => {
        // if (tagsArr.tags.length === 0) {
        //     dispatch(setData(initialItems))
        //     if (minPrice || maxPrice) {
        //         if (tagsArr.tags.length === 0) {
        //             const newItems = [...localItems].filter(el => el.price >= tagsArr.priceControl.min && el.price <= tagsArr.priceControl.max)
        //             dispatch(setData(newItems))
        //         } else {
        //             const newItems = [...localItems].filter(el => tagsArr.tags.includes(el.category))
        //             dispatch(setData(newItems))
        //         }
        //     } else {
        //         dispatch(setData(localItems))
        //     }
        // } else {
        //     const newItems = [...localItems].filter(el => tagsArr.tags.includes(el.category) && el.price >= tagsArr.priceControl.min && el.price <= tagsArr.priceControl.max)
        //     dispatch(setData(newItems))
        // }
        // console.log(tagsArr)
        // console.log(items)

        if (!tagsArr.tags.length) {
            const newItems = initialItems.filter(item => item.price >= tagsArr.priceControl.min && item.price <= tagsArr.priceControl.max)
            dispatch(setData(newItems))
            if (tagsArr.tags.length > 0) {
                const newItems = initialItems.filter(item => tagsArr.tags.includes(item.category))
                dispatch(setData(newItems))
                if (minPrice && maxPrice) {
                    const newItems = initialItems.filter(item => tagsArr.tags.includes(item.category) && item.price >= tagsArr.priceControl.min && item.price <= tagsArr.priceControl.max)
                    dispatch(setData(newItems))
                }
            }
        } else if (tagsArr.tags.length > 0) {
            const newItems = initialItems.filter(item => tagsArr.tags.includes(item.category))
            dispatch(setData(newItems))
            if (minPrice && maxPrice) {
                const newItems = initialItems.filter(item => tagsArr.tags.includes(item.category) && item.price >= tagsArr.priceControl.min && item.price <= tagsArr.priceControl.max)
                dispatch(setData(newItems))
            }
        }
    }

    const clearAllFilter = () => {
        setTagsArr((prevState) => ({
            ...prevState,
            tags: []
        }))
        dispatch(setData(initialItems))
        setMinPrice(1)
        setMaxPrice(99999)
        const allTags = document.querySelectorAll('.tag_checkbox')
        allTags.forEach(tag => tag.checked = false)
    }

    const minF = (e) => {
        setMinPrice(e)
        setTagsArr((prevState) => ({
            ...prevState, // сохраняем остальные свойства
            priceControl: {
                ...prevState.priceControl, // сохраняем остальные свойства controlPrice
                min: e, // обновляем только min
            },
        }));
    }
    const maxF = (e) => {
        setMaxPrice(e)
        setTagsArr((prevState) => ({
            ...prevState, // сохраняем остальные свойства
            priceControl: {
                ...prevState.priceControl, // сохраняем остальные свойства controlPrice
                max: e, // обновляем только min
            },
        }));
    }

    const appearEffect = keyframes`
        0% {opacity: 0;}
        100% {opacity: 1;}
    `
    const AnimatedCol = styled.div`
        animation: ${appearEffect} 0.5s forwards;
    `

    return (
        <div className={'website_wrapper'}>
            <LoadingWrapper></LoadingWrapper>
            <div className={'notifications_wrapper'}>
                {
                    notifications.length === 0 ? '' :
                        notifications.map((el) => {
                            return (
                                <Notification key={el.ID}>
                                    {el.message}
                                </Notification>
                            )
                        })
                }
            </div>
            <Header pro={productToBucket} setPro={setProductToBucket}></Header>
            <main>
                <section className={'banner_section'}>
                    <div className={'banner_container'}>
                        <div className={'banner_box'}>
                            <img
                                src="https://happydoghappycat-th.com/uploads/content/HD%20Product%20line%20-%20NaturCroq%20N.jpg"
                                alt="" className={'banner_img'}/>
                        </div>
                    </div>
                </section>
                <section className={'filter_and_products_section'}>
                    <div className={'filter_and_products_container'}>
                        <div className="filter_and_products_box">
                            <div className={'filter_col'}>
                                <div className="filter_box">
                                    <div className={'filter_box_inner'}>
                                        <h3>Фильтровать по категориям</h3>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 1)
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для собак</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 2)
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для кошек</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 3)
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для крыс</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 4)
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для лошадей</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 5)
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для грызунов</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                    </div>
                                    <div className="price_filter_box_inner">
                                        <h3>Фильтровать по цене</h3>
                                        <div className={'price_filter_block'}>
                                            <input type="number" className={'from_filter_input'} value={minPrice} defaultValue={minPrice} onChange={(e) => minF(e.target.value)}/>
                                            <span>-</span>
                                            <input type="number" className={'to_filter_input'} value={maxPrice} defaultValue={maxPrice} onChange={(e) => maxF(e.target.value)}/>
                                        </div>
                                        <div className={'price_filter_actions'}>
                                            <button onClick={() => filterFunction()} className={'search_byFilter_button'}>Найти</button>
                                            <button onClick={() => clearAllFilter()} className={'clear_byFilter_button'}>Сбросить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'products_col'}>
                                <div className={'products_shape_block'}>
                                    <button className={'list_shape_btn'} onClick={() => setListMode(true)}>
                                        <i className={listMode === true ? 'fa-solid fa-list selected_shape Selected' : 'fa-solid fa-list selected_shape'}></i>
                                    </button>
                                    <button className={'col_shape_btn'} onClick={() => setListMode(false)}>
                                        <i className={listMode === false ? 'fa-solid fa-columns selected_shape Selected' : 'fa-solid fa-columns selected_shape'}></i>
                                    </button>
                                </div>
                                <div className={'products_box'}>
                                    {
                                        items.map(tovar => {
                                            return (
                                                <AnimatedCol className={listMode === false ? 'tovar_col' : 'tovar_col listMode'} key={tovar.id}>
                                                    <Link to={`/product/ID/${tovar.id}`} className={'product_link'}></Link>
                                                    <div className={listMode === false ? 'tovar_box' : 'tovar_box listMode'}>
                                                        <img
                                                            src={tovar.image.length === 0 ? ImageUndefined : tovar.image.map(el => el)}
                                                            alt=""
                                                            className={listMode === false ? 'tovar_img' : 'tovar_img listMode'}
                                                        />
                                                        <div className={'tovar_inform'}>
                                                            <span className={'tovar_title'}>{tovar.title.length > 50 ? tovar.title.slice(0, 50) + '...' : tovar.title}</span>
                                                            <p className={'tovar_descr'}>{tovar.descr}</p>
                                                            <div className={'tovar_price'}>
                                                                <span>{tovar.price}{tovar.price_currency}</span>
                                                                <button className={bucketItems.some(el => el.product_id === tovar.id) ? 'addToBucket_btn Added' : 'addToBucket_btn'} disabled={bucketItems.some(el => el.product_id === tovar.id)} onClick={() => putToBucket(tovar.image,tovar.title,tovar.price,tovar.descr,tovar.id,tovar.price_currency)}>
                                                                    {bucketItems.some(el => el.product_id === tovar.id) ? 'Добавлено' : 'В корзину'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AnimatedCol>
                                            )
                                        })
                                    }
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

export default HomePage