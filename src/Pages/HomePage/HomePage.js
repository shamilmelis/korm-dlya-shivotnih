import React, {useEffect} from 'react'
import '../HomePage/styles/main.css'
import '../HomePage/styles/media.css'
import Header from "../../Components/Header/Header";
import {useState} from "react";
import axios from "axios";
import {styled,keyframes,css} from "styled-components";
import ImageUndefined from '../../Components/NoImage/noimages.png';
const HomePage = () => {
    const [products, setProducts] = useState({
        product: [],
        filtered_product: []
    })
    const [tagsArr, setTagsArr] = useState([])
    const [productToBucket, setProductToBucket] = useState([])

    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars`)
            .then(res => {
                console.log('API =>' , res)
                setProducts(prevProducts => ({
                    ...prevProducts,
                    product: res.data,
                    filtered_product: res.data
                }))
            })
    }, [])
    useEffect(() => {

    }, [products])

    const putToBucket = (image,title,price,descr,id) => {
        productToBucket.push({
            product_image: image,
            product_title: title,
            product_descr: descr,
            product_price: price,
            product_initial_price: price,
            product_id: id,
            count: 1,
        })
        setProducts((prevState) => ({
            ...prevState,
            product: products.product
        }))
        console.log(productToBucket)
    }
    useEffect(() => {

    }, [productToBucket])
    const getTag = (tag, tagId) => {
        let index = tagsArr.indexOf(tagId)
        if (!tagsArr.includes(tagId)) {
            tagsArr.push(tagId);
            tag.nextElementSibling.checked = true;
            console.log(tagsArr)
        } else if (tagsArr.includes(tagId)) {
            tagsArr.splice(index, 1);
            tag.nextElementSibling.checked = false;
            console.log(tagsArr)
        }
    }
    const filterArray = () => {
        setProducts((prevState) => ({
            ...prevState,
            filtered_product: prevState.product.filter(el => tagsArr.includes(el.category))
        }))
        console.log(products.product)
        console.log(products.filtered_product)
        console.log(tagsArr)
    }
    const appear = keyframes`
     0% {opacity: 0}
      100% {opacity: 1}
    `
    const SmoothAppear = styled.div`
        animation: ${appear} 1s forwards;
    `;

    return (
        <div>
            <Header prodo={productToBucket} mainState={products} childState={products.product} mainSetState={setProducts}></Header>
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
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 0)
                                                        filterArray()
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для собак</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 1)
                                                        filterArray()
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для кошек</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 2)
                                                        filterArray()
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для крыс</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 3)
                                                        filterArray()
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для лошадей</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                        <div className={'filter_tag'}>
                                            <button className={'tag_button'}
                                                    onClick={(e) => {
                                                        getTag(e.target.nextElementSibling, 4)
                                                        filterArray()
                                                    }}></button>
                                            <span className={'tag_name'}>Корм для грызунов</span>
                                            <input type="checkbox" className={'tag_checkbox'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'products_col'}>
                                <div className={'products_box'}>
                                    {
                                        tagsArr.length === 0 ?
                                            products.product.map(tovar => {
                                                return (
                                                    <SmoothAppear className={'tovar_col'} key={tovar.id}>
                                                        <div className="tovar_box">
                                                            <img
                                                                src={tovar.image.length === 0 ? ImageUndefined : tovar.image.map(el => el)}
                                                                alt=""
                                                                className={'tovar_img'}
                                                            />
                                                            <div className={'tovar_inform'}>
                                                                <span>{tovar.title}</span>
                                                                <p>{tovar.descr}</p>
                                                                <div className={'tovar_price'}>
                                                                    <span>{tovar.price}$</span>
                                                                    <button className={'addToBucket_btn'} disabled={productToBucket.some(el => el.product_id === tovar.id)} onClick={(e) => putToBucket(tovar.image,tovar.title,tovar.price,tovar.descr,tovar.id)}>
                                                                        {productToBucket.some(el => el.product_id === tovar.id) ? 'Добавлено' : 'В корзину'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SmoothAppear>
                                                )
                                            }) :
                                            products.filtered_product.map(tovar => {
                                                return (
                                                    <SmoothAppear className={'tovar_col'} key={tovar.id}>
                                                        <div className="tovar_box">
                                                            <img
                                                                src={tovar.image.length === 0 ? ImageUndefined : tovar.image.map(el => el)}
                                                                alt=""
                                                                className={'tovar_img'}
                                                            />
                                                            <div className={'tovar_inform'}>
                                                                <span>{tovar.title}</span>
                                                                <p>{tovar.descr}</p>
                                                                <div className={'tovar_price'}>
                                                                    <span>{tovar.price}$</span>
                                                                    <button className={'addToBucket_btn'} disabled={productToBucket.some(el => el.product_id === tovar.id)} onClick={(e) => putToBucket(tovar.image,tovar.title,tovar.price,tovar.descr,tovar.id)}>
                                                                        {productToBucket.some(el => el.product_id === tovar.id) ? 'Добавлено' : 'В корзину'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SmoothAppear>
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