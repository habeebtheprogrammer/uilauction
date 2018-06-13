import React, { Component } from 'react';
import Slider from "react-slick"
import data from "../../data.js"
import apiUrl from "../../config"
import axios from "axios"
import { Link } from "react-router-dom"
import Bestprofiles from "../search/bestprofiles"
class Profileslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            empty: ""
        }
    }

    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            // dots: true,
            arrows: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            slidesToShow: 1,
            prevArrow: prev,
            nextArrow: next,
            className: "img-slider"
        };
        return (
            <div className="slider">
                <div className="row" style={{ marginTop: "10px" }}>

                    <Slider {...settings}>
                        
                        {/* <Bestprofiles /> */}
                      {/* <Bestprofiles /> */}


                    </Slider>

                </div>
                <style>{`
                //    .slider .card{
                    //    height:125px;
                //        background-size:100%
                //    }
                //    .slider .card-content{
                //        display:none
                //    }
                //    .slider{
                //        height: inherit !important

                //    }
                //    .img-slider,.col.m12{
                //        padding:0px;
                //        margin:0px
                //    }
                //    .slider .row{
                //        margin:10px
                //    }
                //    .slider .row button{
                //        width:90%;
                //        margin:auto;
                //        display:none
                //    }
                //    .swap{
                //        padding:20px
                //    }
                //    .slider .row:hover button{
                //        display:block;
                //     //    transition:0.2s ease-in;
                //     //    box-shadow:0 1px 5px 0 ;
                          
                //    }

                //    .slider .row:hover .swap{
                //        display:hidden;
                //        padding:0px;
                //    }
                   .card.hoverable.custom-card-hover:hover a.btn.link-hover{
                        background:rgb(229, 57, 53) !important;
                        transition:0.2s ease-in !important;
                        color:#fff !important;
                        border:0px !important
                     }
                .slider .collection .collection-item.avatar{
                   min-height:50px !important;
                    overflow:hidden !important
                }
                   .slick-next:before,.slick-prev:before{
                       color:#222;
                   }
                   .slider .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .slider .card .card-image img{
                    //    width:50%;
                    max-height:200px
                   }
                     .radio .media-round{
                        position:relative;
                        display:inline-block;
                        padding:3px 5px 0px;
                        // margin:25px 0px;
                        // border:2px solid #eee;
                        border-radius:100%;
                        transition:0.2s ease-in;
                        background:#fff;
                    }
                    .radio a i{
                        color:rgb(244, 67, 54)
                    }
                    .radio a:hover .media-round{
                        background:rgb(244, 67, 54);
                        // border:2px solid #fff;
                        transition:0.2s ease-in
                    }
                     .radio a:hover i{
                         color:#fff; 
                     }
                `}
                </style>
            </div>
        );
    }
}

export default Profileslider;