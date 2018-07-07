import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import { Link } from "react-router-dom"
import moment from "moment"
import { Icon } from "react-materialize"
import Countdown from 'react-countdown-now';
import jwt from "jsonwebtoken"
import { Instagram } from 'react-content-loader'

class Marketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            response:false
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getNewProduct`).then((res) => {
       
            if (res.data.success) {
              
                this.setState({ products: res.data.success, response: true })
            } else console.log(res.data)
        })
    }
    substr(text, length) {
        if(!text) return text
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
        var array = [1,2,3,4,5,6,7,8]
        var usertoken = window.localStorage.getItem("jwToken");
        let memb;
        if (usertoken) memb = jwt.verify(usertoken, "h1a2b3e4e5b6");
        return (
            <div className="" >
                <center>
                    {/* <h5 style={{ fontFamily: "avenirBold", padding: "20px 0px" }}>TAMTAMTOOLS MARKETPLACE</h5> */}
                    {/* <p> Choose from our most popular artist</p> */}
                </center>
                <div className="row">
                    
                    <div className="col s12">
                        <h5>Recommended for you</h5>

                    </div>
                    {this.state.response === false ?
                                array.map((loader) => (
                                    <div className="col s12 m3 x2-padding">
                                        <Instagram />
                                    </div>
                                ))
                                : null}
                    {this.state.products.length > 0 ? this.state.products.map((product) => (
                        <div className="col s12 m3 x2-padding">
                            <Link to={`marketplace/${product._id}`} className="grey-text text-darken-3">
                                <div className="card hoverable x-nopad z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>
                                    <div className="row">
                                        <div className="col m12 s5" style={{padding:"0px"}}>

                                            <div className="mcard" style={{
                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_400,h_300,c_fill,g_auto/${product.imgID}') no-repeat `, backgroundRepeat: "no-repeat",
                                                backgroundSize: "contain", backgroundPosition: "center",
                                            }}>
                                                <div className="date-box white-text center-align hide-on-med-and-down  right" style={{ width: "25%", margin: "0px 10px" }}>
                                                    <div className="black" style={{ fontSize: "0.7em", padding: "10px 0px" }}>
                                                        <div>Starting at</div>
                                                        <div>N{product.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                          

                                        </div>
                                        <div className="col m12 s7" style={{ padding: "0px" }}>

                                          
                                            <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                                <div className="col s12">

                                                    <div style={{ textTransform: "capitalize", fontSize: "1.1em", padding: "5px 0px" }}><b>{this.substr(product.title, 30)}</b></div>
                                                </div>
                                                <div className="col s12">
                                                    <div className="g hide-on-med-and-down" style={{ fontSize: "0.9em" }}> {this.substr(product.description, 40)} </div>
                                                </div>
                                                <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                    <Icon tiny>visibility</Icon>

                                                </div>
                                                <div className="col s2 grey-text">
                                                    <small>{product.views}</small>
                                                </div>
                                                <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                    <Icon tiny>alarm</Icon>
                                                </div>
                                                <div className="col s6 grey-text left-align">
                                                    <small> <Countdown date={moment(product.date).dates() + product.duration}
                                                        renderer={this.renderer} /></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : null}

                </div>
                <style>
                    {`  
                    .mcard{
                        height:180px
                    }
                     .x-center-align{
                                    text-align:center;
                                }
                    @media (max-width: 620px) {
                                .x-center-align{
                                    text-align:left;
                                    // font-size:0.8em
                                }
                        .mcard{
                                height:100px
                            }
                    }`}
                </style>
            </div>
        );
    }
}

export default Marketplace