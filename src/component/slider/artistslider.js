import React, { Component } from 'react';
import Slider from "react-slick"
import data from "../../data.js"
import { Preloader } from "react-materialize"
import apiUrl from "../../config"
import axios from "axios"
class Artistslider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            empty: "",
            count: true
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestProduct`).then((res) => {
            if (res.data.success) {
                this.setState({ products: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
        setTimeout(() => this.setState({ count: false }), 3000)
    }

    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            // dots: true,
            arrows: true,
            infinite: true,
            speed: 3000,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            slidesToShow: 5,
            prevArrow: prev,
            nextArrow: next,
            className: "img-slider"
        };
        return (
            this.state.products ?
                this.state.count === false ?
                    <div className="slider">
                        <div className="">

                            <Slider {...settings}>
                                {this.state.products.map((item) => (
                                    <div className="row">
                                        <div className="col s12" style={{ padding: " 10px" }}>
                                            <div className="card z-depth-1 hoverable" style={{ margin: "0px" }}>
                                                <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: "url('" + item.imgUrl + "') no-repeat center", backgroundSize: "cover" }}>
                                                    {/* <center>
                                                    <img className="activator" src={`./images/${item}`} style={{ width: "100px" }} />
                                                </center> */}
                                                    <span className="card-title"></span>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title grey-text text-darken-4 activator">
                                                        <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span>
                                                    <ul className="collection" style={{ border: "0px" }}>
                                                        <li className="collection-item avatar" style={{ paddingLeft: "50px", paddingBottom: "0px", paddingTop: "0px" }}>
                                                            <img src={`${item.dpUrl || "../../images/user.png"}`} alt="" className="circle" style={{ left: "0px" }} />
                                                            <span className="title">{item.title}</span>
                                                            <p className="grey-text"><small >${item.price}<br />
                                                            </small>
                                                            </p>
                                                        </li>
                                                    </ul>

                                                    <div>

                                                        <a href={`/marketplace/${item._id}`} style={{ border: "1px solid lightgrey", width: '100%', fontSize: "0.8em", borderRadius: "20px" }} className="btn waves-effect waves-red transparent    z-depth-0 grey-text text-darken-2">View item</a>

                                                    </div>
                                                </div>
                                                <div className="card-reveal">
                                                    <span className="card-title grey-text text-darken-1"><i className="material-icons right">close</i></span>
                                                    <p className="grey-text text-darken-1" style={{ fontSize: "0.8em" }}>{item.description}</p>
                                                    <div className="">
                                                        <a href="#" className="grey-text text-darken-2 " style={{ position: "absolute", bottom: "0" }}>
                                                            <div className="">
                                                                <div className="col" style={{ padding: "3px 4px 0px" }}>
                                                                    <span>{item.views}</span>
                                                                </div>
                                                                <div className="col" style={{ padding: "0px" }}>
                                                                    <div>
                                                                        <i className="material-icons">visibility</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
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
                `}
                        </style>
                    </div> : <center> <Preloader flashing size="small" /></center> :
                <center> <Preloader flashing size="small" /></center>
        );
    }
}

export default Artistslider;