import React, { Component } from 'react';
import Slider from "react-slick"
import data from "../../data.js"
import apiUrl from "../../config"
import axios from "axios"
class Categoryslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            empty: ""
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestProduct`).then((res) => {
            if (res.data.success) {
                this.setState({ products: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
    }

    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            // dots: true,
            arrows: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            slidesToShow: 4,
            prevArrow: prev,
            nextArrow: next,
            className: "img-slider"
        };
        return (
            <div className="slider">
                <div className="" style={{padding:"0px 80px"}}>

                    <Slider {...settings}>
                        {data.industry.map((industry) => (
                            <div className="row" >
                                <div className="col s12" style={{ padding: " 10px" }}>
                                    <div className=" z-depth-0 hoverable custom-card-hover" style={{ margin: "0px" }}>
                                        <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0.1)),#000 url('../../images/" +industry.img  + "') no-repeat center", backgroundSize: "cover" }}>
                                            {/* <center>
                                                    <img className="activator" src={`./images/${item}`} style={{ width: "100px" }} />
                                                </center> */}
                                            <span className="card-title"></span>
                                        </div>
                                        <div className="card-content center-align">
                                            {/* <span className="card-title grey-text text-darken-4 activator">
                                                <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span> */}
                                            <a href={`/artists/${industry.title}`} >{industry.title}</a>

                                        </div>
                                    

                                    </div>
                                </div>
                            </div>
                        ))}

                    </Slider>

                </div>
                <style>{`
                //    .slider .card{
                //        height:125px;
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
                    max-height:300px
                   }
                `}
                </style>
            </div>
        );
    }
}

export default Categoryslider;