import React, { Component } from 'react';
import axios from "axios"
import moment from "moment"
import apiUrl from "../../config"
import { Player } from "video-react"
import { Link } from "react-router-dom"
import YouTube from "react-youtube"
import { Divider, Slider, Slide, Icon } from 'react-materialize';
class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            mostviewed:[]
        }
        this.getArtist = this.getArtist.bind(this)

    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/homevideos`).then((res) => {
          
            if (res.data.success) {
                this.setState({ videos: res.data.success })
            } else console.log(res.data)
        }).catch((err) => console.log(err));
        axios.get(`${apiUrl}/api/getbestvideos`).then((res) => {
            
            if (res.data.success) {
                this.setState({ mostviewed: res.data.success })
            } else console.log(res.data)
        }).catch((err) => console.log(err));
    }
    getArtist(id) {
        var artist;
        return id
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    render() {
        return (
            <div className="" >
                {/* 
                <center>
                    <h5 style={{ fontFamily: "avenirBold", padding: "20px 0px" }}>MEDIA CHANNEL</h5>
                </center> */}
                <div className="row" style={{ margin: "0px" }}>
                    <ul className="collection with-header ">
                        <li className="collection-header">
                            <div className="bold-title">
                               Tending videos
                                            </div>
                        </li>
                        <li className="collection-item x-xs-pad">
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
                                            <div className="col m12 s7" style={{padding:"0px"}}>
                                                {/* <div> <a className="grey-text text-darken-3" style={{fontSize:"1.1em"}} href={`/media-channel/${video._id}`}>{video.title}</a></div> */}
                                                   {/* <div className="grey-text right-align">{video.industry}</div> */}
                                                <div className="row" style={{  margin: "0px" }}>
                                                    <div className="col s12" style={{}}>

                                                        <div style={{ fontSize: "1.1em", padding: "10px 0px" }}><a className="grey-text text-darken-3"  href={`/media-channel/${video._id}`}><b>{this.substr(video.title, 30)}</b></a></div>
                                                    </div>
                                                    {/* <div className="col s12 hide-on-med-and-down">
                                                        <div className="g" style={{ fontSize: "0.9em" }}>{this.substr(video.description,35 )}</div>
                                                    </div> */}
                                                    <div className="col s1  grey-text" style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>visibility</Icon>

                                                    </div>
                                                    <div className="col s2  grey-text">
                                                        <small>{video.views}</small>
                                                    </div>
                                                    <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>group</Icon>
                                                    </div>
                                                    <div className="col s8grey-text left-align ">
                                                        <small>{video.industry} </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </li>
                    </ul>
                </div>
                <div className="row hide-on-med-and-up">
                    <div className="col m7 s12 ">
                        <div className="recent-news blue-grey darken-4">
                            <ul className="collection with-header">
                                <li className="collection-header">
                                    <div className="bold-title">
                                        Most viewed
                                    </div>
                                </li>
                                {this.state.mostviewed.slice(0, 2).map((video) => (
                                    <li className="collection-item x-xs-pad" >
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col m5 s5" style={{padding:"0px"}}>
                                                {video.youtubelink
                                                    ? 
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
                                                        src={video.videoUrl} />}
                                            </div>
                                            <div className="col m4 s7 left-pad">
                                                <div className="row" style={{ margin: "0px" }}>
                                                    <div className="col s12" style={{}}>

                                                        <div style={{ fontSize: "1.1em", padding: "10px 0px" }}><a className="grey-text text-darken-3" href={`/media-channel/${video._id}`}><b>{this.substr(video.title, 40)}</b></a></div>
                                                    </div>
                                                    <div className="col s12 hide-on-med-and-down">
                                                        <div className="g" style={{ fontSize: "0.9em" }}>{this.substr(video.description, 100)}</div>
                                                    </div>
                                                    <div className="col s1  grey-text" style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>visibility</Icon>

                                                    </div>
                                                    <div className="col s2  grey-text">
                                                        <small>{video.views}</small>
                                                    </div>
                                                    <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                        <Icon tiny>group</Icon>
                                                    </div>
                                                    <div className="col s8grey-text left-align ">
                                                        <small>{video.industry} </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col m3 s12 right-align hide-on-med-and-down">
                                                <div >
                                                    {moment(video.date).format("LL")}

                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className="col m5 s12">
                        {this.state.mostviewed.length > 0 ? this.state.mostviewed.slice(-1).map((video) => (
                                <div className="card  hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>
                                {video.youtubelink
                                        ? 
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
                                        src={video.videoUrl} />}
                                    <style>{`
                                                        .videos .video-react-big-play-button.video-react-big-play-button-left{
                                                            display:none;
                                                        }
                                                        `}
                                    </style>
                                    <div className="" style={{ padding: "10px" }}>
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col s12" style={{}}>

                                                <div style={{ fontSize: "1.1em", padding: "10px 0px" }}><a className="grey-text text-darken-3" href={`/media-channel/${video._id}`}><b>{this.substr(video.title, 40)}</b></a></div>
                                            </div>
                                            <div className="col s12 hide-on-med-and-down">
                                                <div className="g" style={{ fontSize: "0.9em" }}>{this.substr(video.description, 45)}</div>
                                            </div>
                                            <div className="col s1  grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>visibility</Icon>

                                            </div>
                                            <div className="col s2  grey-text">
                                                <small>{video.views}</small>
                                            </div>
                                            <div className="col s1 grey-text " style={{ paddingTop: "2px" }}>
                                                <Icon tiny>group</Icon>
                                            </div>
                                            <div className="col s8grey-text left-align ">
                                                <small>{video.industry} </small>
                                            </div>
                                        </div>

                                        <div className="clearfix">

                                        </div>

                                    </div>
                                </div>
                        )) : null}
                    </div>
                </div>
                {/* <div className="row">
                    {this.state.videos.length > 0 ? this.state.videos.map((video) => (
                        <div className="col m3">
                            <Link to={`media-channel/${video._id}`} className="grey-text text-darken-3">
                                <div className="card  hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize", }}>

                                    <Player
                                        playsInline
                                        // poster="/assets/poster.png"
                                        src={video.videoUrl} />
                                    <style>{`
                                                        .videos .video-react-big-play-button.video-react-big-play-button-left{
                                                            display:none;
                                                        }
                                                        `}
                                    </style>
                                    <div className="" style={{ padding: "10px" }}>
                                        <div className="  row " style={{ margin: "0px" }}>
                                            <div className="col s12" style={{}}>
                                                <div style={{ textTransform: "capitalize", fontSize: "1.3em", padding: "5px 0px" }}><b>{this.substr(video.title, 20)}</b></div>
                                            </div>
                                            <div className="col s12" >
                                                <div className="g" style={{ fontSize: "0.9em" }}>{this.substr(video.description, 30)} </div>

                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>visibility</Icon>
                                            </div>
                                            <div className="col s2 grey-text">
                                                <small>{video.views}</small>
                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>group</Icon>
                                            </div>
                                            <div className="col s6 grey-text">
                                                <small>{video.industry}</small>
                                            </div>
                                        </div>

                                        <div className="clearfix">

                                        </div>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    )) : null}

                </div> */}
                <style>{`  
                   
                        .left-pad{padding-left:20px !important}
                    .setheight{
                          height:163px !important
                    }
                    @media (max-width: 620px) {
                          .x-xs-pad{
                        padding:10px 0px !important;
                        font-size:1em;
                        }
                        .left-pad{padding-left:10px !important}
                         .setheight{
                          height:70px !important
                    }
                    .setheight2{
                          height:200px !important
                    }
                    }`}
                    </style>
            </div>
        )
    }
}
export default Video;