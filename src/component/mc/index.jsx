import React, { Component } from 'react';
import { Player } from "video-react"
import Audio from "react-audioplayer"
import axios from "axios"
import apiUrl from "../../config"
import moment from "moment"
import { Link } from "react-router-dom"
import Navbar from "../navbar/index"
import Loading from "../loader"
import YouTube from 'react-youtube';
import MetaTags from "react-meta-tags"
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
import Footer from "../footer/index"
class Mc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            currentArtist: {},
            currentArtistMedia: { videos: [], audios: [] },
            nowPlaying: {},
            mostview: []
        }
        this.getArtist = this.getArtist.bind(this)
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            axios.get(`${apiUrl}/api/videoById?id=${this.props.match.params.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.success) {
                    axios.get(`${apiUrl}/api/videos`).then((res2) => {
                        if (res2.data.success) {
                            axios.get(`${apiUrl}/api/artist?id=${res.data.success.userID}`).then((res3) => {
                                if (res3.data.user) {
                                    this.setState({ currentArtist: res3.data.user, currentArtistMedia: res3.data.media });
                                }
                            })
                            this.setState({ videos: res2.data.success });
                        }
                    })
                    this.setState({ nowPlaying: res.data.success })
                }
            })
        } else
            axios.get(`${apiUrl}/api/videos`).then((res) => {
                if (res.data.success) {
                    axios.get(`${apiUrl}/api/artist?id=${res.data.success[0].userID}`).then((res) => {
                        if (res.data.user) {
                            this.setState({ currentArtist: res.data.user, currentArtistMedia: res.data.media });
                        }
                    })
                    this.setState({ videos: res.data.success, nowPlaying: res.data.success[0] });

                }
            })

        axios.get(`${apiUrl}/api/getbestvideos`).then((res) => {
            if (res.data.success) {
                this.setState({ mostview: res.data.success });
            }
        })
    }
    getArtist(userid) {
      

    }
    substr(text, length) {
        if (text)
            if (text.length > length) {

                return text.substr(0, length) + "..."
            }
            else return text
    }
    render() {
        var playlist = [];
        playlist = this.state.currentArtistMedia.audios ? this.state.currentArtistMedia.audios.map((audio) => (
            {
                name: "Listen Live", // song name 
                src: "http://streaming.radionomy.com/la1077", // song source address 
                img: "../../../images/Writers_Models_Style_7.jpg", // (optional) song image source address 
            })) : [{
                name: "Live Radio Station", // song name ,
                src: "http://streaming.radionomy.com/la1077", // song source address 
                img: "../../../images/Writers_Models_Style_7.jpg"
            }]

        return (
            <div className="mc ">
                <MetaTags>
                    <title>{this.state.nowPlaying.title}</title>
                    <meta name="description" content={this.state.nowPlaying.description} />
                    <meta property="og:title" content={this.state.nowPlaying.title} />
                    <meta property="og:description" content={this.state.nowPlaying.description} />
                    <meta property="og:video" content={this.state.nowPlaying.videoUrl} />
                </MetaTags>
                <Navbar />
                <div className="container">
                    <div className="row " style={{ marginTop: "10px" }}>
                        <div className="row">
                            <div className="col m8 s12" style={{ paddingTop: "10px" }}>
                                {this.state.nowPlaying && this.state.nowPlaying.youtubelink ?
                                    <YouTube
                                        videoId={this.state.nowPlaying.youtubelink}
                                        className="lgheight"
                                        opts={{
                                            width: '100%',
                                            playerVars: { // https://developers.google.com/youtube/player_parameters,
                                                autoplay: 0
                                            }
                                        }}
                                        onReady={this._onReady}
                                    />

                                    : <Player
                                        playsInline
                                        // poster="/assets/poster.png"
                                        src={this.state.nowPlaying.videoUrl} />}
                                {this.state.videos.length > 0 ?
                                    <div className="row white x-font-x1 " style={{ margin: "0px", padding: "10px", border: "1px solid lightgrey" }}>
                                        <div className="col s9 m10" style={{ textTransform: "capitalize" }}>
                                            <span style={{ fontSize: '1.4em' }}>{this.state.nowPlaying.title}</span>
                                        </div>
                                        <div className="col s3 m2 right-align" >
                                            <h6 style={{ fontSize: '1em' }}>{this.state.nowPlaying.views} views</h6>
                                        </div>
                                        <div className="col m12" >
                                            {this.state.nowPlaying ?
                                                <div >
                                                    <div className="row">
                                                        <div className="col s1">
                                                            <img src={`${this.state.nowPlaying.dpUrl || "../../images/user.png"}`}alt="" className="circle smalldp" />
                                                        </div>
                                                        <div className="col s10" >
                                                            <h6 style={{ textTransform: "capitalize" }}>{this.state.nowPlaying.firstName} {this.state.nowPlaying.lastName}</h6>
                                                            <span style={{ whiteSpace: "pre-line" }}>{this.state.nowPlaying.description}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                :
                                                null}
                                            <div className="row share">
                                                <style>{`
                                        .SocialMediaShareButton{
                                            cursor:pointer !important;
                                        }
                                        `}</style>
                                                <div className="col s12 " style={{}}>
                                                    Share on
                                    </div>
                                                <div className="col m8 s12">
                                                </div>
                                                <div className="col m1 s3">
                                                    <FacebookShareButton url={window.location.href} quote={this.state.nowPlaying.description} children={<FacebookIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col m1 s3">
                                                    <TwitterShareButton url={window.location.href} title={this.state.nowPlaying.title} children={<TwitterIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col m1 s3">
                                                    <LinkedinShareButton url={window.location.href} title={this.state.nowPlaying.title} description={this.state.nowPlaying.description} children={<LinkedinIcon size={32} round={true} />} />
                                                </div>
                                                <div className="col m1 s3">
                                                    <GooglePlusShareButton url={window.location.href} children={<GooglePlusIcon size={32} round={true} />} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col s12">
                                            {() => this.getArtist(this.state.nowPlaying.userID)}
                                        </div>
                                    </div>
                                    : null}

                                <div className="row" style={{ margin: "0px" }}>
                                    <ul className="collection with-header">
                                        <li className="collection-header">
                                            <div className="bold-title">
                                                Most viewed
                                            </div>
                                        </li>
                                        <li className="collection-item">
                                            <div className="row" style={{ margin: "0px" }}>
                                                {this.state.mostview.map((video) => (

                                                    <div className="col m4 s12 videos pad-lg">

                                                        <div className="row" style={{ padding: "10px 0px" }}>
                                                            <div className="col m12 s5" style={{ padding: "0px" }}>
                                                                {video.youtubelink ?
                                                                    <YouTube
                                                                        videoId={video.youtubelink}
                                                                        className="setheight2"
                                                                        
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
                                                                        src={video.videoUrl} />
                                                                }
                                                            </div>
                                                            <div className="col m12 s7" >
                                                                <div> <a className="grey-text text-darken-3" href={`/media-channel/${video._id}`}>{this.substr(video.title,20)}</a></div>
                                                                <small>     {video.industry}</small>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col m4 s12">
                                <div className="row " style={{ padding: "10px 0px 10px" }}>
                                    <div className="col s12 white">
                                    </div>
                                    <div className="col s12">
                                        <div className="radionomy-player"></div>
                                    </div>
                                    {/* <div className="col s12 hide-on-med-and-up" style={{ padding: "0px", overflow: "auto" }}>
                                            <Audio
                                                width={430}
                                                height={200}
                                                autoPlay={false}
                                                fullPlayer={true}
                                                playlist={playlist}

                                            />
                                        </div>  */}
                                </div>
                                <div className="recent-news blue-grey darken-4">
                                    <ul className="collection with-header">
                                        <li className="collection-header">
                                            <div className="bold-title">
                                                {this.state.currentArtist.firstName ? this.state.currentArtist.firstName + " " + this.state.currentArtist.lastName : null} recent uploads
                                        </div>
                                        </li>
                                        {this.state.currentArtistMedia.videos.slice(0, 5).map((video) => (
                                            <li className="collection-item">
                                                <div className="row" style={{ margin: "0px" }}>
                                                    <div className="col s5 videos " >
                                                        {video.youtubelink ?
                                                            <YouTube
                                                                videoId={video.youtubelink}
                                                                className="setheight3"
                                                                
                                                                opts={{
                                                                    width: '100%',
                                                                    playerVars: { // https://developers.google.com/youtube/player_parameters,
                                                                        autoplay: 0
                                                                    }
                                                                }}
                                                                onReady={this._onReady}
                                                            />
                                                            : <Player
                                                                playsInline
                                                                // poster="/assets/poster.png"
                                                                src={video.videoUrl} />}

                                                        <style>{`
                                                        .videos .video-react-big-play-button.video-react-big-play-button-left{
                                                            display:none;
                                                        }
                                                        .audioElements__timeContainer___1gIBH{
                                                            display:none !important
                                                        }
                                                        `}
                                                        </style>
                                                    </div>
                                                    <div className="col s7">
                                                        <div> <a href={`/media-channel/${video._id}`}>{this.substr(video.title, 20)}</a></div>
                                                        <div ><small>     {this.substr(video.description, 20)}</small></div>
                                                        <div className="hide-on-med-and-down"><small>
                                                            {this.substr(video.industry, 20)}</small></div>
                                                    </div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <div className="google-play">
                                <div className="row">
                                    <div className="col s6" style={{ paddingBottom: "0px" }}>
                                        <img src="../../../../images/1.png" width="100%" className="img-responsive" alt="Image" />
                                    </div>
                                    <div className="col s6" style={{ paddingBottom: "0px" }}>
                                        <img src="../../../../images/2.png" width="100%" className="img-responsive" alt="Image" />
                                    </div>
                                </div>

                            </div> */}
                            </div>

                        </div >
                        <div className="row" style={{ margin: "0px" }}>
                            <ul className="collection with-header">
                                <li className="collection-header">
                                    <div className="bold-title">
                                        Recommended for you
                                </div>
                                </li>
                                <li className="collection-item">
                                    <div className="row" style={{ margin: "0px" }}>
                                        {this.state.videos.map((video) => (

                                            <div className="col m3 s12 videos pad-lg">

                                                <div className="row" style={{ padding: "10px 0px" }}>
                                                    <div className="col m12 s5" style={{ padding: "0px" }}>
                                                        {video.youtubelink ?
                                                            <YouTube
                                                                videoId={video.youtubelink}
                                                                className="setheight"
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
                                                                src={video.videoUrl} />
                                                        }
                                                    </div>
                                                    <div className="col m12 s7" >
                                                        <div> <a className="grey-text text-darken-3" href={`/media-channel/${video._id}`}>{this.substr(video.title,20)}</a></div>
                                                        <small>     {video.industry}</small>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
                <style>
                    {`
                            body{
                                background:#f7f7f7
                            }   
                        .row{
                            margin:0px;
                        }
                            .mc .container{
                                width:90%;
                                margin:auto;
                            }
                            .share{
                                padding: 0px 10px 10px;
                                text-align:right;
                            }
                            .pad-lg{
                                padding:10px 20px !important
                            }
                            
                              .setheight{
                          height:160px !important
                    }
                     .setheight3{
                          height:65px !important
                    }
                     .setheight2{
                          height:125px !important
                    }
                    .smalldp{
                        width:50px
                    }
                             @media (max-width: 620px) {
                                 .setheight{
                          height:60px !important
                    }
                      .setheight2{
                          height:60px !important
                    }
                       .setheight3{
                          height:60px !important
                    }
                     .lgheight{
                          height:200px !important
                    }
                           .mc .container{
                                width:100% !important
                            }
                             .share{
                                padding: 30px 0px;
                                text-align:left;
                            }
                            .row{
                                margin:0px !important
                            }
                            .x-font-x1{
                                font-size:0.9em;
                            }
                            .collection-item{
                                padding:10px  0px!important
                            }
                             .smalldp{
                        width:20px;
                        // margin-top:10px !important
                    }
                    }
                        `}
                </style>
            </div >
        );
    }
}

export default Mc;
