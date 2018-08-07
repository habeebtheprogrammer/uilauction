import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Row, Col, MediaBox, Preloader } from "react-materialize"
import axios from "axios"
import { Link } from "react-router-dom"
import apiUrl from "../../config"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import auth from "../../reducer/index"
import { setUserProfile } from "../../actions/index"
import jwt from "jsonwebtoken";
import MetaTags from "react-meta-tags"
import moment from "moment"
import FileUpload from "react-fileupload"
import Work from "./work"
import validator from "validator"
import Description from "./description"
import {
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from 'react-share';
import Details from "./details"
import Loading from "../loader"
import Calendarwidget from "./calendarwidget"
import Maketplaceslider from "../slider/marketplaceslider"
import Bestproduct from "../marketplace/bestproduct"
import Bannerslider from "../slider/bannerslider"
import Countdown from 'react-countdown-now';
const Completionist = () => <span className="red-text"><b>Bid Closed!</b></span>;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: '',
            details: {},
            disable: false,
            media: {},
            product: {},
            response: false,
            now: 10000

        }
        this.renderer = this.renderer.bind(this)
    }
    componentWillMount() {
        if (validator.isMongoId(this.props.match.params.id)) {
            axios.get(`${apiUrl}/api/product?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.user) {
                    this.setState({ artist: res.data.user, product: res.data.product, response: true });

                } else this.setState({ artist: false, response: true })
            })
        } else this.setState({ artist: false, response: true })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            // this.setState({ disable: true ,now:0})
            // Render a completed state
            return <div className="row " style={{ margin: "0px" }}>
                <div className="col s1">
                    <h5>
                        <img src={this.state.product.imgUrl} width="60px" className="circle" alt="Image" />
                    </h5>
                </div>
                <div className="col s7  " >

                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px", textTransform: "capitalize" }}>
                        {this.substr(this.state.product.title, 50)}</h5>
                    {this.substr(this.state.product.description, 100)}
                    {/* <p> Browse And Discover</p> */}
                </div>
                <div className="col s2 right-align  " >
                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                      <small style={{fontSize:"0.7em"}}>Starting at</small>  N{this.state.product.price}</h5>
                    <span className="red-text"><b>Bid Closed!</b></span>
                </div>
                <div className="col s1">
                    <div style={{ padding: "30px 0px 10px" }}>
                        {this.state.disable ? <a disabled className="btn green z-depth-0 tiny" href="#">Bid</a> :
                            <Link to={`#`} disabled className="btn green z-depth-0 tiny" >Bid</Link>
                        }
                    </div>
                </div>
            </div>
        } else {
            // Render a countdown
            return <div className="row " style={{ margin: "0px" }}>
                <div className="col s1">
                    <h5>
                        <img src={this.state.product.imgUrl} width="60px" className="circle" alt="Image" />
                    </h5>
                </div>
                <div className="col s7  " >

                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px", textTransform: "capitalize" }}>
                        {this.substr(this.state.product.title, 50)}</h5>
                    {this.substr(this.state.product.description, 100)}
                    {/* <p> Browse And Discover</p> */}
                </div>
                <div className="col s2 right-align" >
                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>
                        <small style={{ fontSize: "0.7em" }}>Starting at</small>  N{this.state.product.price}</h5>
                    <span>{hours}:{minutes}:{seconds}</span>
                </div>
                <div className="col s1">
                    <div style={{ padding: "30px 0px 10px" }}>
                        {this.state.disable ? <a disabled className="btn green z-depth-0 tiny" href="#">Bid</a> :
                            <Link to={`/buy/${this.state.product._id}`} className="btn green z-depth-0 tiny" >Bid</Link>
                        }
                    </div>
                </div>
            </div>
            
        }
    };
    render() {

        return (
            this.state.response ?
                <div className="dashboard">
                    <MetaTags>
                        <title>{this.state.product.title}</title>
                        <meta name="description" content={this.state.product.description} />
                        <meta property="og:title" content={this.state.product.title} />
                        <meta property="og:description" content={this.state.product.description} />
                        <meta property="og:image" content={this.state.product.imgUrl} />
                    </MetaTags>
                    <Navbar />
                    {this.state.artist ?
                        <div className="white hide-on-med-and-down" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "0px 0px" }}>
                            <div className="container " >

                             
                                <Countdown date={Date.now(this.state.product.date) +this.state.product.duration}
                                            renderer={this.renderer} />
                                  
                            </div>
                        </div> :
                        <div className="white hide-on-med-and-down" style={{ position: "fixed", zIndex: "992", width: "100%", padding: "0px 0px" }}>
                            <div className="container " >

                                <div className="row " style={{ margin: "0px", padding: "10px 0px" }}>
                                    <div className="col s1 right-align">
                                        <h5>

                                            <i className="material-icons" style={{ fontSize: "1.5em" }}>shopping_cart</i>

                                        </h5>
                                    </div>
                                    <div className="col s8  " >

                                        <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px", textTransform: "capitalize" }}>
                                            Marketplace</h5>
                                        {/* <p> Browse And Discover</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.artist ?
                        <div className="container">
                            <div className="row " style={{ marginTop: "100px" }}>
                                <div className="col m3 adjust-pad hide-on-med-and-down">
                                    {/* <Contact profile={this.state.artist} match={this.props.match} /> */}
                                    <Bestproduct />
                                    {/* <Calendarwidget userID={this.state.product.userID} /> */}

                                </div>
                                <div className="col m9 adjust-pad">
                                    <div className="white" style={{ padding: "10px 0px" }}>
                                        <Description product={this.state.product} />
                                        {/* <Details details={this.state.product} /> */}
                                        <div className="row hide-on-med-and-up" style={{ margin: "0px" }}>

                                            <div className="col s12 " >

                                                <div style={{ fontFamily: "avenirBold", }}>
                                                    {this.substr(this.state.product.title, 50)}</div>
                                                {/* <p> Browse And Discover</p> */}
                                            </div>
                                            <div className="col s12 hide-on-med-and-up " >
                                                <div style={{ fontFamily: "avenirBold" }}>
                                                    <small>Starting at</small> N{this.state.product.price}
                                                    {/* <span className="right">{this.state.product.stock} in stock</span> */}
                                                </div>
                                            </div>
                                            <div className="col s12">
                                                <p >
                                                    <Link to={`/buy/${this.state.product._id}`} className="btn green z-depth-0 tiny" >Bid</Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row" style={{ padding: "0px 20px 20px" }}>
                                            <style>{`
                                        .SocialMediaShareButton{
                                            cursor:pointer !important;
                                        }
                                        `}</style>
                                            <div className="col s12" style={{ padding: "0px 10px 10px" }}>
                                                Share on
                                    </div>
                                            <div className="col s3 m1">
                                                <FacebookShareButton url={window.location.href} quote={this.state.product.description} children={<FacebookIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s3 m1">
                                                <TwitterShareButton url={window.location.href} title={this.state.product.title} children={<TwitterIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s3 m1">
                                                <LinkedinShareButton url={window.location.href} title={this.state.product.title} description={this.state.product.description} children={<LinkedinIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s3 m1">
                                                <GooglePlusShareButton url={window.location.href} children={<GooglePlusIcon size={32} round={true} />} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 hide-on-med-and-down" style={{ padding: "20px 10px 0px" }}>

                                    <Maketplaceslider />

                                </div>
                            </div>
                        </div>
                        : <div className="col s12 center-align" style={{ padding: "200px 10px" }}> This item is not available</div>}
                    <Footer />

                    <style>{`
                    body{
                        background:#f7f7f7
                    }   
                     .dashboard .profile-banner{
                        background:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),#263238 url('${this.state.artist.bgUrl || "../../images/live-concerts-events-in-bujumbura.jpg"}') no-repeat;
                        background-position:cover;
                        background-size:100%;
                        min-height:200px;
                        padding:20px;
                        position:relative;
                    }
                    .dashboard .profile-box{
                        position:absolute;
                        bottom: 0px;
                        width:100%;
                    }
                 
                         .dashboard .adjust-pad{
                        padding-right:0px;
                    }
                    .tabs .tab a{
                        color:#222;
                    }
                    .tabs .indicator{
                        background:#222
                    }
                    .tabs .tab a:hover, .tabs .tab a.active {
                        background-color: transparent;
                        color: #222;
                    }                   
                      .dashboard .container{
                        width:95%;
                        margin:auto;
                    }
                         .dashboard .collapsible-header{
                       padding:0px;
                       border:0px;
                    //    font-size:0.9em;
                   }
                   .dashboard .collapsible-header:hover{
                       background:#eee;
                   }
                  .dashboard .collapsible{
                       box-shadow:none;
                       border:0px;
                   }
                   .inherit{
                       display:inherit !important
                   }
                     .dashboard .collapsible i{
                       font-size:1em;
                   }
                    .dashboard .x-card{
                        background:#fff;
                        padding:20px;
                        margin:10px 0px 0px;
                        color:#222;
                    }
                    .dashboard .x-card .title{
                        font-size:1.4em;
                    }
                    .dashboard .custom-title{
                        font-size:1.4em;
                        margin:0px;
                    }
                    .dashboard .video-tag{
                      
                        width:100%;

                    }
                    .padding-right{
                        padding-right: 0px !important
                    }
                    .no-padding{
                        padding:0px
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
                        .col-pad{
                        padding: 0px 20px !important
                    }
                    @media (max-width: 620px) {
                           .dashboard .adjust-pad{
                        padding-left:0px;
                    }
                        .no-padxs{
                            padding:10px !important
                        }
                       .col-pad{
                        padding: 0px 0px !important
                    }
                     .padding-right{
                        padding-right: inherit;
                    }
                }
                `}</style>
                </div > : <Loading />
        );
    }
}

export default Profile