import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Row, Col, MediaBox, Preloader } from "react-materialize"
import axios from "axios"
import apiUrl from "../../config"
import MetaTags from 'react-meta-tags';
import moment from "moment"
import { connect } from "react-redux"
import Bestprofiles from "../artist/bestprofiles"
import { bindActionCreators } from "redux"
import auth from "../../reducer/index"
import { setUserProfile } from "../../actions/index"
import data from "../../data"
import FileUpload from "react-fileupload"
import Contact from "./contact"
import Work from "./work"
import Loading from "../loader"
import validator from "validator"
import { Player } from "video-react"
import Audio from "react-audioplayer"
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
import FacebookProvider, { Share } from 'react-facebook';
// import Modal from "./modal"
import Banner from "./banner"
import Details from "./details"
import Items from "./items"
import Bannerslider from "../slider/bannerslider"
import Profileslider from "../slider/profileslider"
import Calendarwidget from "./calendarwidget"
import YouTube from "react-youtube"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
            details: {},
            media: { product: [], audios: [], videos: [] },
            productToggle: false,
            productModal: false,
            firstLoad: true,

        }
        this.productModal = this.productModal.bind(this)
        this.openProductModal = this.openProductModal.bind(this)

    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    componentWillMount() {
        if (validator.isMongoId(this.props.match.params.id)) {
            axios.get(`${apiUrl}/api/artist?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.user) {
                    this.setState({ artist: res.data.user, media: res.data.media });
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
    }
    productModal(bool) {
        this.setState({ productModal: bool, firstLoad: false })
    }
    openProductModal(e) {
        e.preventDefault();
        this.setState({ productModal: true, firstLoad: false, productToggle: true })
    }
    render() {

        let token = localStorage.getItem("jwToken");
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
        return (
            this.state.artist ?
                <div className="dashboard">
                    <MetaTags>
                        <title>{this.state.artist.username}</title>
                        <meta name="description" content={this.state.artist.about} />
                        <meta property="og:title" content={this.state.artist.username} />
                        <meta property="og:description" content={this.state.artist.about} />
                        <meta property="og:image" content={this.state.artist.dpUrl} />
                    </MetaTags>
                  
                    <Navbar />
                    <div className="container" style={{ paddingTop: "10px" }}>
                        <div className="row " style={{ marginTop: "10px" }}>
                            <div className="col s12 m3 adjust-pad">

                                <Contact profile={this.state.artist} match={this.props.match} openProductModal={this.openProductModal} />
                                <div className="clearfix"></div>
                                <Items products={this.state.media.product} />
                                {/* <Description profile={this.state.artist} />
                        <Work profile={this.state.artist} /> */}

                            </div>
                            <div className="col s12 m6 adjust-pad">
                                <Banner artist={this.state.artist} />
                                <div className="row " style={{ margin: "1px 1px 10px" }}>

                                    <div className="col s12 no-padding " >
                                        <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                                            <li className="collection-header" ><h6 >Pictures  </h6>
                                                {/* <span className="grey-text" style={{ fontSize: "0.8em" }}>uploaded pictures</span> */}

                                            </li>
                                            <li className="collection-item col-pad" style={{ padding: "0px 20px" }}>
                                                <div className="row" style={{ paddingBottom: "20px" }}>
                                                    {this.state.media.pictures ?
                                                        this.state.media.pictures.map((picture, key) => (

                                                            <div className="col s12 m6" style={{ paddingTop: "10px",paddingLeft: "0px", paddingRight: "0px"  }}>
                                                                <MediaBox src={`http://res.cloudinary.com/afrikal/image/upload/w_300,h_200,c_fill,g_auto/${picture.imgID}`} caption={picture.title} width="100%" />
                                                                <p style={{ padding: "0px 5px" }}>{picture.caption} <small className="right grey-text">{moment(picture.date).fromNow()} </small></p>

                                                            </div>

                                                        ))
                                                        : null}

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col s12 no-padding ">
                                        <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                                            <li className="collection-header" ><h6 >Video  </h6>
                                                {/* <span className="grey-text" style={{ fontSize: "0.8em" }}>Uploaded videos</span> */}
                                                {/* <span className="right">{this.props.product.views}<i className="material-icons">visibility</i></span> */}

                                            </li>
                                            <li className="collection-item col-pad" style={{}}>
                                                <div className="row">
                                                    {this.state.media.videos.length > 0 ?
                                                        this.state.media.videos.map((video, key) => (

                                                            <div className="col s12" style={{ paddingTop: "10px" }}>
                                                                {video.youtubelink ?
                                                                    <YouTube
                                                                        videoId={video.youtubelink}
                                                                        opts={{
                                                                            width: '100%',
                                                                            playerVars: { // https://developers.google.com/youtube/player_parameters,
                                                                                autoplay: 0
                                                                            }
                                                                        }}
                                                                        onReady={this._onReady}
                                                                    />
                                                                    :
                                                                    <Player
                                                                        playsInline
                                                                        // poster="/assets/poster.png"
                                                                        src={video.videoUrl}
                                                                    />}
                                                                <p>{video.title} <small className="right grey-text">{moment(video.date).fromNow()}</small></p>
                                                                <div style={{ whiteSpace: "pre-line" }}>{video.description}</div>
                                                                {/* <MediaBox src={video.videoUrl} caption={video.title} width="100%" /> */}
                                                            </div>
                                                        ))
                                                        : null}


                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <Work profile={this.state.artist} /> */}
                                {/* <Description profile={this.state.artist} /> */}

                            </div>

                            <div className="col m3 adjust-pad">
                                <div className="row" style={{ marginBottom: "10px" }}>
                                    <div className="col s12 no-pad" >
                                        <Calendarwidget match={this.props.match} />

                                    </div>
                                    <div className="col s12" style={{ paddingTop: "12px" }}>
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
                                                {/* <FacebookProvider appId="141625929928215">
                                                    <Share href="https://tamtamtools.herokuapp.com/artist/5adf40b5ce6fb0001490b428">
                                                    <button type="button">Share</button>
                                                    </Share>
                                                </FacebookProvider> */}
                                                <FacebookShareButton url={window.location.href} quote={this.state.artist.firstName + " " + this.state.artist.lastName} children={<FacebookIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s2">
                                                <TwitterShareButton url={window.location.href}  title={this.state.artist.bio} children={<TwitterIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s2">
                                                <LinkedinShareButton url={window.location.href}  title={this.state.artist.firstName + " " + this.state.artist.lastName} description={this.state.artist.bio} children={<LinkedinIcon size={32} round={true} />} />
                                            </div>
                                            <div className="col s2">
                                                <GooglePlusShareButton url={window.location.href}  children={<GooglePlusIcon size={32} round={true} />} />
                                            </div>
                                        </div>

                                    </li>
                                </ul>

                                {/* <Details artist={this.state.artist} /> */}
                            </div>
                        </div>
                    </div>
                    <Footer />

                    <style>{`
                    body{
                        background:#f7f7f7
                    }   
                     .dashboard .profile-banner{
                         background:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),#263238 url('${this.state.artist.bgUrl || "../../images/EventsHeader.jpg"}') no-repeat;
                        background-position:top;
                        background-size:cover;
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
                     .col-pad{
                        padding: 0px 20px !important
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
                        padding: 0px !important;
                        font-size:0.9em
                    }
                      .dashboard .profile-box{
                        padding-top: 100px;
                        width:100%;
                        position:relative
                    }
                }
                `}</style>
                </div >
                : <Loading />
        );
    }
}

export default Profile