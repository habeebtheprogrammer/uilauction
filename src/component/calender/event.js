import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Row, Col, MediaBox, Preloader } from "react-materialize"
import axios from "axios"
import apiUrl from "../../config"
import { connect } from "react-redux"
import Bestprofiles from "../artist/bestprofiles"
import { bindActionCreators } from "redux"
import auth from "../../reducer/index"
import { setUserProfile } from "../../actions/index"
import data from "../../data"
import FileUpload from "react-fileupload"
import Contact from "../profile/contact"
import Work from "../profile/work"
import Loading from "../loader"
import moment from "moment"
import MetaTags from "react-meta-tags"
import validator from "validator"
import Description from "../profile/description"
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
import Modal from "../profile/modal"
import Details from "../profile/details"
import Banner from "../profile/banner"
import Items from "../profile/items"
import Bannerslider from "../slider/bannerslider"
import Profileslider from "../slider/profileslider"
import Audio from "react-audioplayer"
import Calendarwidget from "./calendarwidget"
class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: "",
            artist: "",
            details: {},
            media: { product: [] },
            productToggle: false,
            productModal: false,
            firstLoad: true,
            response: false

        }
        this.productModal = this.productModal.bind(this)
        this.openProductModal = this.openProductModal.bind(this)

    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/eventsById?id=${this.props.match.params.id}`).then((res) => {
            if (res.data.event) {
                console.log(res.data.event)
                this.setState({ event: res.data.event })
                axios.get(`${apiUrl}/api/artist?id=${res.data.event.userID}`).then((res) => {
                    // this.props.setUserProfile(res.data.data)
                    console.log(res.data)

                    if (res.data.user) {
                        this.setState({ artist: res.data.user, media: res.data.media, response: true });
                    } else this.setState({ artist: false, response: true })
                })
            } else this.setState({ response: true })
        })
    }
    productModal(bool) {
        this.setState({ productModal: bool, firstLoad: false })
    }
    openProductModal(e) {
        e.preventDefault();
        this.setState({ productModal: true, firstLoad: false, productToggle: true })
    }
    render() {
        var playlist = [];
        playlist = this.state.media.audios ? this.state.media.audios.map((audio) => (
            {
                name: audio.name, // song name 
                src: audio.src, // song source address 
                img: "../../../images/Writers_Models_Style_7.jpg", // (optional) song image source address 
            })) : [{
                name: "sample", // song name ,
                src: "ksa.mp4", // song source address 
                img: "../../../images/Writers_Models_Style_7.jpg"
            }]
        let token = localStorage.getItem("jwToken");
      
        return (
            this.state.response ?
                <div className="dashboard">
                    <MetaTags>
                        <title>{this.state.event.title}</title>
                        <meta name="description" content={this.state.event.description} />
                        <meta property="og:title" content={this.state.event.title} />
                        <meta property="og:description" content={this.state.event.description} />
                        <meta property="og:image" content={this.state.event.imgUrl} />
                    </MetaTags>
                    {this.state.firstLoad !== true && this.state.productToggle ? <Modal artist={this.state.artist} closeProductModal={this.productModal} productModal={this.state.productModal} /> : null}

                    <Navbar />
                    {this.state.artist && this.state.event ?
                    <div>
                            {window.innerWidth < 620 ?
                                <div className="profile-banner">
                                    <div className="row profile-box" >
                                        <div className="col m2 no-pad hide-on-med-and-down">
                                            <div style={{ position: "absolute", bottom: "0", }}>
                                                <img src="../../images/logoTransparent.png" alt="" width="100px" />
                                            </div>
                                        </div>
                                        <div className="col m8 s12 white-text text-lighten-2" style={{ padding: "0px 0px 5px", margin: "0px", textTransform: "capitalize" }}>
                                            <h5>{this.state.event.title}</h5>
                                            {this.state.event.location}
                                        </div>
                                        <div className="col m2 hide-on-med-and-down">
                                            <div style={{ marginTop: "20px" }}>
                                                <a href="#" className="grey-text text-lighten-2" style={{ position: "absolute", bottom: "0" }}>
                                                    <div className="c">
                                                        <div className="col" style={{ padding: "3px 4px 5px" }}>
                                                            <span>{this.state.event.views}</span>
                                                        </div>
                                                        <div className="col" style={{ padding: "0px 0px 5px" }}>
                                                            <div>
                                                                <i className="material-icons">visibility</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div> : null}
                        <div className="container">
                            <div className="row " style={{ marginTop: "20px" }}>
                                <div className="col m3 s12 adjust-pad hide-on-med-and-down">

                                    <Contact profile={this.state.artist} match={this.props.match} openProductModal={this.openProductModal} />
                                    <div className="clearfix"></div>
                                    <Items products={this.state.media.product} />

                                    <div>
                                        {/* <iframe width="100%" frameBorder="0" style={{ border: 0 }} height="250px"
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAMsF1hD4qPsu8T-vkdEss5WhkuJ7aH58o&q=${this.state.event.location || "paris effiel tower"}&maptype=satellite`} /> */}
                                        {/* <MediaBox src={this.state.event.imgUrl} caption={this.state.event.title} width="100%" /> */}
                                    </div>
                                    <div className="clearfix"></div>


                                </div>
                                <div className="col s12 m6 adjust-pad ">


                                    {window.innerWidth>620?
                                    <div className="profile-banner">
                                        <div className="row profile-box" >
                                            <div className="col m2 no-pad hide-on-med-and-down">
                                                <div style={{ position: "absolute", bottom: "0", }}>
                                                    <img src="../../images/logoTransparent.png" alt="" width="100px" />
                                                </div>
                                            </div>
                                            <div className="col m8 s12 white-text text-lighten-2" style={{ padding: "0px 0px 5px", margin: "0px", textTransform: "capitalize" }}>
                                                <h5>{this.state.event.title}</h5>
                                                {this.state.event.location}
                                            </div>
                                            <div className="col m2 hide-on-med-and-down">
                                                <div style={{ marginTop: "20px" }}>
                                                    <a href="#" className="grey-text text-lighten-2" style={{ position: "absolute", bottom: "0" }}>
                                                        <div className="c">
                                                            <div className="col" style={{ padding: "3px 4px 5px" }}>
                                                                <span>{this.state.event.views}</span>
                                                            </div>
                                                            <div className="col" style={{ padding: "0px 0px 5px" }}>
                                                                <div>
                                                                    <i className="material-icons">visibility</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>:null}
                                    <div className="col s12 no-padding " >
                                        <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                                            <li className="collection-header no-padx" ><h6 >Description  </h6>
                                                {/* <span className="grey-text" style={{ fontSize: "0.8em" }}>uploaded pictures</span> */}

                                            </li>
                                            <li className="collection-item col-pad" >
                                                <div className="row">
                                                        <div className="col s12" style={{ paddingTop: "10px", paddingLeft: "0px", paddingRight: "0px" }}>
                                                            <MediaBox src={`http://res.cloudinary.com/afrikal/image/upload/w_800,h_800,c_fill,g_auto/${this.state.event.imgID}`} caption={this.state.event.title} width="100%" />
                                                    </div>

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="row " style={{ margin: "1px 1px 10px" }}>

                                        <div className="col s12 no-padding " >
                                            <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>

                                                <li className="collection-item col-pad2">
                                                    {this.state.event.description}
                                                    <p style={{fontWeight:"800"}}>Starting: {moment(this.state.event.checkedDate).fromNow()}</p>
                                                    <p style={{ fontWeight: "800" }}>Duration: {this.state.event.startTime} - {this.state.event.stopTime}</p>
                                                        <p style={{ fontWeight: "800" }}>Address: {this.state.event.address}  {this.state.event.location}</p>
                                                    {/* <p style={{ fontWeight: "800" }}>Location: {this.state.event.location}</p> */}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>

                                <div className="col m3 s12 adjust-pad">
                                    <div className="row" style={{ marginBottom: "10px" }}>
                                        <div className="col s12 no-pad">
                                            <Calendarwidget userID={this.state.event.userID} match={this.props.match} />
                                        </div>
                                        <div className="col s12">
                                                {this.state.event.ticket ? <a href={`http://${this.state.event.ticket}`} target="_blank" className="btn grey darken-3 white-text z-depth-0" style={{ width: "100%", marginTop: "10px" }}> More info and Tickets </a> : null}
                                        </div>
                                        <div className="col s12 hide-on-med-and-down" style={{ paddingTop: "12px" }}>
                                            {playlist.length > 0 ?
                                                <div className="white">  <Audio
                                                    width={310}
                                                    height={200}
                                                    autoPlay={false}
                                                    fullPlayer={false}
                                                    playlist={playlist}
                                                /></div> : null}
                                        </div>
                                    </div>

                                    {/* <Description profile={this.state.artist} /> */}

                                    <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>

                                        <li className="collection-item " style={{ padding: "10px 20px" }}>
                                            Share on
                                    </li>
                                        <li className="collection-item " style={{ padding: "10px 20px" }}>
                                            <div className="row">
                                                <style>{`
                                        .SocialMediaShareButton{
                                            cursor:pointer !important;
                                        }
                                        `}</style>
                                                <div className="col s2">
                                                    <FacebookShareButton url={window.location.href} quote={this.state.event.title} children={<FacebookIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col s2">
                                                    <TwitterShareButton url={window.location.href} title={this.state.event.title} children={<TwitterIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col s2">
                                                    <LinkedinShareButton url={window.location.href} title={this.state.event.title} description={this.state.event.description} children={<LinkedinIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col s2">
                                                    <GooglePlusShareButton url={window.location.href} children={<GooglePlusIcon size={32} round={true} />} />
                                                </div>
                                            </div>

                                        </li>
                                    </ul>



                                    {/* <Details artist={this.state.artist} /> */}
                                </div>
                            </div>
                        </div>
                        </div>
                        :
                        <div>
                            <div className="white">
                            <div className="container" >
                                <div className="row white"  >
                                    <div className="col s6  " >
                                        <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>BROWSE AND DISCOVER</h5>
                                        {/* <p> Browse And Discover</p> */}
                                    </div>
                                    <div className="col s6 " >
                                        <div className="row" style={{ padding: "0px 3px", marginBottom: "0px" }}>

                                            <div className="col s12 right-align" >
                                                {/* <Filter searchCB={this.searchCB.bind(this)} /> */}
                                            </div>

                                            <div className="col s12">
                                                {/* <Searchbar searchCB={this.searchCB.bind(this)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="col s12 center-align" style={{ padding: "200px 10px" }}>This event is not available</div>
                        </div>
                    }
                    }
                    <Footer />

                    <style>{`
                    body{
                        background:#f7f7f7
                    }   
                     .dashboard .profile-banner{
                         background:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),#263238 url('http://res.cloudinary.com/afrikal/image/upload/w_500,h_200,c_fill,g_auto/${this.state.artist.bgID}') no-repeat;
                        background-position:center;
                        background-size:cover;
                        min-height:200px;
                        padding:20px;
                        position:relative;
                    }
                       .col-pad{
                        padding: 0px 20px !important
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
                     .col-pad2{
                        padding: 0px 15px !important
                    }
                    .tabs .tab a:hover, .tabs .tab a.active {
                        background-color: transparent;
                        color: #222;
                    }                   
                      .dashboard .container{
                        width:95%;
                        margin:auto;
                    }
                     .container2{
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
                       .col-pad{
                        padding: 0px 0px !important
                    }
                         .col-pad2{
                        padding: 0px 10px !important
                    }
                      .dashboard .profile-box{
                        padding-top: 100px;
                        width:100%;
                        position:relative
                    }
                    .no-padx{
                        padding:10px !important
                    }
                    .container2{
                        width:100% !important;
                    
                    }
                }
                `}</style>
                </div >
                : <Loading />
        );
    }
}

export default Event