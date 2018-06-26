import React, { Component } from 'react';
import Slider from "react-slick"
import apiUrl from "../../config"
import axios from "axios"
import { Icon } from "react-materialize"
import { Link } from "react-router-dom"
import moment from "moment"
import Countdown from 'react-countdown-now';
class Marketplaceslider extends Component {
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

    substr(text, length) {
        if (!text) return text

        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            // Render a completed state
            return <span className="red-text"><b>Bid Closed!</b></span>;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            // dots: true,
            arrows: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: prev,
            nextArrow: next,
            className: "img-slider"
        };
        
        return (
            <div className="slider" style={{ height: "inherit" }}>
                <div className="row">
                    <Slider {...settings}>
                        {this.state.products.length > 0 ? this.state.products.map((product) => (
                            <div className="col s12">
                                <Link to={`/marketplace/${product._id}`} className="grey-text text-darken-3">
                                    <div className="card hoverable  z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                        <div className="" style={{
                                            background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('${product.imgUrl}') no-repeat `, backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain", backgroundPosition: "center", height: "150px"
                                        }}>
                                            <div className="date-box white-text center-align   right" style={{ width: "25%", margin: "0px 10px" }}>
                                                {/* <div className="green darken-1" style={{ fontSize: "1.3em", padding: "10px 0px" }}> {moment(product.date).format("DD")}</div> */}
                                                <div className="black" style={{ fontSize: "0.7em", padding: "10px 0px" }}>
                                                    <div>Starting at</div>
                                                    <div>N{product.price}</div>
                                                </div>
                                            </div>
                                            {/* <div className="date-box white-text  darken-1 right" style={{ border: "2px solid white",borderTop:"none", padding: "20px 5px", fontSize: "0.9em", margin: "0px 10px" }}>
                                            <b >${product.price}</b>
                                        </div> */}
                                        </div>

                                        <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                            <div className="col s12">

                                                <div style={{ textTransform: "capitalize", fontSize: "1.1em" }}><b>{this.substr(product.title, 25)}</b></div>
                                            </div>
                                            <div className="col s12">
                                                <div className="grey-text"> <small>{this.substr(product.description, 40)}</small> </div>
                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>visibility</Icon>

                                            </div>
                                            <div className="col s2 grey-text">
                                                <small>{product.views}</small>
                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>group</Icon>
                                            </div>
                                            <div className="col s6 grey-text left-align">
                                                <small>
                                                    <Countdown date={moment(product.date).dates()+ product.duration}
                                                        renderer={this.renderer} /></small>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )) : null}
                    </Slider>
                </div>
                <div className="clearfix"></div>
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

export default Marketplaceslider;