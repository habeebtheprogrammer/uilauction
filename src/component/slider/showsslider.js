import React, { Component } from 'react';
import Slider from "react-slick"
import dat from "../../data.js"
class Showsslider extends Component {
    render() {
        var prev = <button className="btn red"> <i className="material-icons">chevron_left</i></button>
        var next = <button className="btn red"> <i className="material-icons">chevron_right</i></button>
        var settings = {
            // dots: true,
            arrows: true,
            infinite: true,
            speed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            slidesToShow: 8,
            prevArrow: prev,
            nextArrow: next,
            className: "img-slider"
        };
        return (
            <div className="slider">
                <div className="">

                    <Slider {...settings}>
                     {data.industry.map((industry)=>(
                            <div>
                                <div className="row center-align">
                                    <div className="col m12">
                                        <div className="card" style={{ background: "url('./images/"+industry.img+"') no-repeat", backgroundPosition: "cover", backgroundSize: "100%" }}>
                                            <div className="card-image">
                                                <span className="card-title">Card Title</span>
                                            </div>
                                            <div className="card-content">
                                                <p>I am a very simple card. I am good at containing small bits of information.
                                                    I am convenient because I require little markup to use effectively.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{textTransform:"capitalize"}}> <b>{industry.title}</b> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                     ))}
                      
                    </Slider>

                </div>
                <style>{`
                   .slider .card{
                       height:125px;
                       background-size:100%
                   }
                   .slider .card-content{
                       display:none
                   }
                   .slider{
                       height: inherit !important

                   }
                   .img-slider,.col.m12{
                       padding:0px;
                       margin:0px
                   }
                   .slider .row{
                       margin:10px
                   }
                   .slider .row button{
                       width:90%;
                       margin:auto;
                       display:none
                   }
                   .swap{
                       padding:20px
                   }
                   .slider .row:hover button{
                       display:block;
                    //    transition:0.2s ease-in;
                    //    box-shadow:0 1px 5px 0 ;
                          
                   }

                   .slider .row:hover .swap{
                       display:hidden;
                       padding:0px;
                   }
                   .slick-next:before,.slick-prev:before{
                       color:#222;
                   }
                   
                `}
                </style>
            </div>
        );
    }
}

export default Showsslider;