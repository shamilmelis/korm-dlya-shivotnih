import React from 'react'
import '../SearchPage/styles/main.css'
import '../SearchPage/styles/media.css'
import Header from "../../Components/Header/Header";
import ImageUndefined from '../../Components/NoImage/noimages.png';
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useParams} from "react-router";
import {styled, keyframes} from "styled-components";
import axios from "axios";
import LoadingWrapper from "../../Components/LoadingWrapper";
import Footer from "../../Components/Footer";
const SearchPage = () => {
    const {search} = useParams()
    const [item, setItem] = useState([])
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        axios.get(`https://66bb06516a4ab5edd636e68d.mockapi.io/tovars`)
            .then(res => {
                setItem(res.data)
                setFiltered(item)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        const exploredItems = item.filter(el => el.title.toLowerCase().includes(search.toLowerCase()));
        setFiltered(exploredItems);
    }, [item, search]);

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
            <Header></Header>
            <main>
                <div className="search_section">
                    <div className="search_container">
                        <div className="search_box">
                            <div className={'navigate_routes_block'}>
                                <Link to={'/'} className={'back_to_previous_page_btn'}>Главная</Link>
                                <span>></span>
                                <span className={'current_page_btn'}>Поиск</span>
                            </div>
                            <div className={'result_search_block'}>
                                <span>найдено:</span>
                                <span className={'explored_count'}>{filtered.length > 0 ? filtered.length : 0}</span>
                            </div>
                            <div className="search_row">
                                {
                                        filtered.map(el => {
                                            return (
                                                <AnimatedCol className="search_col">
                                                    <Link to={`/product/ID/${el.id}`} className={'product_link'}></Link>
                                                    <div className="search_block">
                                                        <img src={el.image.length === 0 ? ImageUndefined : el.image.map(el => el)} alt="" className={'product_image'}/>
                                                        <div className={'search_block_info'}>
                                                            <span className={'item_title'}>{el.title.length > 50 ? el.title.slice(0,50) + '...' : el.title}</span>
                                                            <p className={'item_descr'}>{el.descr}</p>
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
            </main>
            <Footer></Footer>
        </div>
    )
}

export default SearchPage