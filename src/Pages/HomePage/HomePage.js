import React, {useEffect} from 'react'
import '../HomePage/styles/main.css'
import '../HomePage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState} from "react";
import axios from "axios";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import {useSelector, useDispatch} from "react-redux";
import {setBucketData, setData, setFilteredData} from "../../Redux/slices/dataSlice";
import LoadingWrapper from "../../Components/LoadingWrapper";

const HomePage = () => {
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(999999)
    const [products, setProducts] = useState({
        product: [],
        filtered_product: []
    })
    const [tagsArr, setTagsArr] = useState({
        tags: [],
        priceControl: {
            min:  0,
            max:  9999,
        }
    })
    const [productToBucket, setProductToBucket] = useState([])
    const [getBucket, isGetBucket] = useState([])
    const [initialItems, setInitialItems] = useState([])
    const [localItems, setLocalItems] = useState()
    const dispatch = useDispatch();
    const items = useSelector((state) => state.data.items)
    const bucketItems = useSelector((state) => state.data.bucketItems)
    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars`)
            .then(res => {
                console.log('API =>' , res)
                setProducts(prevProducts => ({
                    ...prevProducts,
                    product: res.data,
                    filtered_product: res.data
                }))
                dispatch(setData(res.data))
                setInitialItems(res.data)
            })
    }, [])
    useEffect(() => {
        setLocalItems(items)
    }, [products, bucketItems, dispatch, localItems])

    const putToBucket = (image,title,price,descr,id, currency) => {
        productToBucket.push({
            product_image: image,
            product_title: title,
            product_descr: descr,
            product_price: price,
            product_initial_price: price,
            product_id: id,
            product_price_currency: currency,
            count: 1,
        })
        const newBucket = [...productToBucket]
        dispatch(setBucketData(newBucket))
        setProducts((prevState) => ({
            ...prevState,
            product: products.product
        }))
    }
    useEffect(() => {

    }, [productToBucket])

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
    const filterFunction = () => {
        if (tagsArr.tags.length === 0) {
            dispatch(setData(initialItems))
            if (minPrice || maxPrice) {
                if (tagsArr.tags.length === 0) {
                    const newItems = [...localItems].filter(el => el.price >= tagsArr.priceControl.min && el.price <= tagsArr.priceControl.max)
                    dispatch(setData(newItems))
                } else {
                    const newItems = [...localItems].filter(el => tagsArr.tags.includes(el.category))
                    dispatch(setData(newItems))
                }
            } else {
                dispatch(setData(localItems))
            }
        } else {
            const newItems = [...localItems].filter(el => tagsArr.tags.includes(el.category) && el.price >= tagsArr.priceControl.min && el.price <= tagsArr.priceControl.max)
            dispatch(setData(newItems))
            console.log(newItems)
            console.log(items)
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
    return (
        <div>
            <LoadingWrapper></LoadingWrapper>
            <Header prodo={productToBucket}
                    getBucket={isGetBucket}
                    gotBucket={getBucket}
            ></Header>
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
                                    </div>
                                    <button onClick={() => filterFunction()}>Найти</button>
                                    <button onClick={() => clearAllFilter()}>Сбросить</button>
                                </div>
                            </div>
                            <div className={'products_col'}>
                                <div className={'products_box'}>
                                    {
                                        items.map(tovar => {
                                            return (
                                                <div className={'tovar_col'} key={tovar.id}>
                                                    <div className="tovar_box">
                                                        <img
                                                            src={tovar.image.length === 0 ? ImageUndefined : tovar.image.map(el => el)}
                                                            alt=""
                                                            className={'tovar_img'}
                                                        />
                                                        <div className={'tovar_inform'}>
                                                            <span>{tovar.title.length > 50 ? tovar.title.slice(0, 50) + '...' : tovar.title}</span>
                                                            <p>{tovar.descr}</p>
                                                            <div className={'tovar_price'}>
                                                                <span>{tovar.price}{tovar.price_currency}</span>
                                                                <button className={'addToBucket_btn'} disabled={bucketItems.some(el => el.product_id === tovar.id)} onClick={(e) => putToBucket(tovar.image,tovar.title,tovar.price,tovar.descr,tovar.id, tovar.price_currency)}>
                                                                    {bucketItems.some(el => el.product_id === tovar.id) ? 'Добавлено' : 'В корзину'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default HomePage