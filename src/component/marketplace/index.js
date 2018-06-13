import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
import { Link } from "react-router-dom"
// import $ from "jquery"
import apiUrl from "../../config"
import Newproduct from "./newproduct"
import Searchbar from "./searchbar"
import Filter from "./filter"
import moment from "moment"
import axios from "axios"
import Bestproduct from "./bestproduct"
import jwt from "jsonwebtoken";
import Countdown from 'react-countdown-now';
import Loading from "../loader"
import { Card, CardTitle, Collapsible,Icon, CollapsibleItem, Button, Row, Input, Badge } from "react-materialize"
class Marketplace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            result: [],
            search: false,
            response: false,
        }
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/marketplace?token=${token}`).then((res) => {
            if (res.data.products) {
                this.setState({ products: res.data.products, response: true })
            } else console.log(res)
        })
    }
    searchCB(result) {
        this.setState({ result: result, search: true })
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
        var usertoken = window.localStorage.getItem("jwToken");
        let memb;
        if (usertoken) memb = jwt.verify(usertoken, "h1a2b3e4e5b6");
        var array = ["1(30).jpg", "1(38).jpg", "1(3).jpg", "coll4.jpg", "cc.jpg", "cd.jpg", "cf.jpg", "cg.jpg", "coll5.jpg", "1(31).jpg"]
        return (
            this.state.search || this.state.products ?
                <div className="marketplace">
                    <Navbar />
                    <div className="white hide-on-small-and-down" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "10px 0px" }}>
                        <div className="container " >

                            <div className="row " style={{ margin: "0px" }} >
                                <div className="col s6  " >
                                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}> MARKETPLACE</h5>
                                    {/* <p> Browse And Discover</p> */}
                                </div>
                                <div className="col s6 " >
                                    <div className="row" style={{ padding: "15px 0px 0px", marginBottom: "0px" }}>
{/* 
                                        <div className="col s12 right-align" >
                                            <Filter searchCB={this.searchCB.bind(this)} />
                                        </div> */}

                                        <div className="col s12">
                                            <Searchbar searchCB={this.searchCB.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hide-on-med-and-up white" style={{ position: "fixed", zIndex: "992", width: "100%" }}>
                        <Searchbar searchCB={this.searchCB.bind(this)} />
                    </div>
                    <div className="hide-on-med-and-up" style={{ padding: "25px 0px" }}>
                        {this.state.search ? this.state.result.length ? <div style={{ padding: "35px 10px 0px" }}>{this.state.result.length} results found</div> : <div style={{ padding: "35px 13px 0px" }}>No result found</div> : null}
                    </div>
                    <div className="margintop">
                        <div className="container" >

                            <div className="row"
                                style={{ marginTop: "20px" }}>

                                <div className="col m3 s12 adjust-pad" style={{ marginTop: "13px" }}>

                                    <Bestproduct />
                                    {/* <Newproduct /> */}


                                </div>
                                <div className="col s12 m9 pad" >

                                    <div className="row" style={{ marginTop: "10px" }}>

                                        {/* <div className="col s12"><h5 style={{ margin: "0px" }}>Artists Store */}
                                        {/* {this.state.search ? <small>{this.state.result.length} Result(s) </small> : <small> {this.state.products.length} Items(s)</small>} */}
                                        {/* </h5></div> */}
                                        {/* <div className="col s6" >
                                    <Filter searchCB={this.searchCB.bind(this)} />
                                </div> */}

                                        {this.state.search ?
                                            this.state.result.length ?
                                                this.state.result.map((product, key) => (
                                                    <div className="col m3 s12" style={{ padding: " 10px" }}>
                                                        <Link to={`/marketplace/${product._id}`} className="grey-text text-darken-3">
                                                            <div className="card hoverable  z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                                                <div className="" style={{
                                                                    background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('${product.imgUrl}') no-repeat `, backgroundRepeat: "no-repeat",
                                                                    backgroundSize: "contain", backgroundPosition: "center", height: "150px"
                                                                }}>
                                                                    <div className="date-box white-text center-align   right" style={{ width: "30%", margin: "0px 10px" }}>
                                                                        {/* <div className="green darken-1" style={{ fontSize: "1.3em", padding: "10px 0px" }}> {moment(product.date).format("DD")}</div> */}
                                                                        <div className="black" style={{ fontSize: "0.7em", padding: "10px 0px" }}>
                                                                            <div>Starting at</div>
                                                                            <div>N{product.price}</div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="row" style={{ padding: "10px", margin: "0px" }}>
                                                                    <div className="col s12">

                                                                        <div style={{ textTransform: "capitalize", fontSize: "1.1em" }}><b>{this.substr(product.title, 15)}</b></div>
                                                                    </div>
                                                                    <div className="col s12">
                                                                        <div className="grey-text"> <small>{this.substr(product.description, 30)}</small> </div>
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
                                                                        <small>   <Countdown date={moment(product.date).dates() + product.duration}
                                                                            renderer={this.renderer} /></small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )) : <div className="col s12 center-align hide-on-med-and-down" style={{ padding: "100px 0px" }}> No Result found</div>
                                            :
                                            this.state.products.map((product, key) => (
                                                <div className="col m3 s12" style={{ padding: " 10px" }}>
                                                    <Link to={`/marketplace/${product._id}`} className="grey-text text-darken-3">
                                                        <div className="card hoverable  z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                                            <div className="" style={{
                                                                background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('${product.imgUrl}') no-repeat `, backgroundRepeat: "no-repeat",
                                                                backgroundSize: "contain", backgroundPosition: "center", height: "150px"
                                                            }}>
                                                                <div className="date-box white-text center-align   right" style={{ width: "30%", margin: "0px 10px" }}>
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

                                                                    <div style={{ textTransform: "capitalize", fontSize: "1.1em" }}><b>{this.substr(product.title, 15)}</b></div>
                                                                </div>
                                                                <div className="col s12">
                                                                    <div className="grey-text"> <small>{this.substr(product.description, 30)}</small> </div>
                                                                </div>
                                                                <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                                    <Icon tiny>visibility</Icon>

                                                                </div>
                                                                <div className="col s2 grey-text">
                                                                    <small>{product.views}</small>
                                                                </div>
                                                                <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                                    <Icon tiny>alarm</Icon>
                                                                </div>
                                                                <div className="col s6 grey-text left-align">
                                                                    <small> <Countdown date={moment(product.date).dates() + product.duration}
                                                                        renderer={this.renderer} /></small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>

                                    {/* <div className="row">
                                    <div className="col s6 offset-s3 center-align">
                                        <button type="button" style={{ border: "1px solid lightgrey", fontSize: "0.8em" }} className="btn waves-effect waves-red transparent z-depth-0 grey-text text-darken-2">Load More</button>
                                    </div>

                                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hide-on-med-and-down" style={{ padding: "0px 40px" }}>
                        <Marketplaceslider />
                    </div>
                    <Footer />
                    <style>{`
                    body{
                        background:#f9f9f9;
                    }
                   .marketplace >.row{
                       padding:5px 0px;
                   }
                    .card-image{
                        background-size:contain !important;
                    }
                   .marketplace .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .marketplace .card .card-image img{
                    //    width:50%;
                    max-height:200px;
                    background-size:contain !important;
                   }
                   .marketplace .left-grid-col{
                       padding:0px 10px 0px 0px !important;
                   }
                    .marketplace .left-grid{
                    //    border-right:1px solid lightgrey;
                   }
                    .marketplace .grid{
                       width:20% !important;
                   }
                    .marketplace .grid-2{
                       width:40% !important;
                   }
                  .margintop{
                      margin-top:110px !important
                  }
                //    .marketplace .collapsible-header{
                //        padding:0px;
                //        border:0px;
                //        background:transparent;
                //        color:#fff;
                //     //    font-size:0.9em;
                //        border-bottom:1px solid #444;
                //    }
                //    .marketplace .collapsible-header:hover{
                //        background:#eee;
                //    }
                //   .marketplace .collapsible{
                //        box-shadow:none;
                //        border:0px;
                //    }
                //      .marketplace .collapsible i{
                //        font-size:1em;
                //    }
                //    .marketplace .collection-item{
                //         background:transparent;
                //         border:0px;
                //         font-size:0.9em;
                //         // border-bottom:1px solid lightgrey;
                //         text-transform:capitalize;

                //     }
                //     .marketplace .collection a{
                //     }
                //     .marketplace i.small{
                //         font-size:1em;
                //     }
                //    .marketplace a.collection-item.active{
                //         color:#fff;
                //         background:#222 !important;
                //     }
                //     .marketplace a.collection-item:hover{
                //         background:#fff;
                //         // color:#fff;
                //     }
                    .marketplace .pad{
                        padding:0px 30px;
                    }
                      .marketplace .container{
                        width:95%;
                        margin:auto;
                    }
                         .marketplace .adjust-pad{
                        padding-right:0px;
                    }
                     .marketplace input.input{
                        height:23px;
                        border:1px solid lightgrey;
                        border-radius:10px;
                        padding:0px 10px;
                        font-size:0.8em;
                     }
                          @media (max-width: 620px) {
                           .dashboard .adjust-pad{
                        padding-left:0px;
                    }
                     .padding-right{
                        padding-right: inherit;
                    }
                    .no-pad{
                        padding:0px !important
                    }
                      .row{
                        margin:0px !important
                    }
                      .dashboard .profile-box{
                        padding-top: 100px;
                        width:100%;
                        position:relative
                    }
                    .margintop{
                        margin:0px !important
                    }
                    .adjust-pad{
                        padding:0px !important
                    }
                    .mtitle{
                        font-size:0.9em;
                    }
                }
                     
                `}</style>
                </div> : <Loading />
        );
    }
}

export default Marketplace;