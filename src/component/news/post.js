import React, { Component } from 'react';
import apiUrl from "../../config"
import axios from "axios"
import {Link} from "react-router-dom"
import moment from "moment"
import { Player } from 'video-react';
import YouTube from "react-youtube"
class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            post:{},
            response:false
        }
    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/newsbyid?id=${this.props.match.params.id}`).then((res) => {
            if (res.data.success) {
                this.setState({ post: res.data.success,response:true })
             
            } else console.log(res)
        })
    }

    render() {
        return (
            this.state.post.title?
            <div className="container">
                <div className="row ">

                    <div className="col m8">
                        <div>

                            <div className="bold-title" style={{ padding: "20px 0px 0px" }}>
                                Our News
                                </div>
                                <div>
                                    <div className="post white" style={{ marginBottom: "40px",paddingBottom:"30px" }}>
                                        {this.state.post.youtubelink?
                                            <YouTube
                                                videoId={this.state.post.youtubelink}
                                                className="lgheight"
                                                opts={{
                                                    width: '100%',
                                                    playerVars: { // https://developers.google.com/youtube/player_parameters,
                                                        autoplay: 0
                                                    }
                                                }}
                                                onReady={this._onReady}
                                            />
                                            : <div className="img" style={{ padding: "0px 0px 0px" }} style={{ background: `url(${this.state.post.imgUrl}) no-repeat`, backgroundSize: "contain", backgroundPosition: "center", height: "300px" }}>
                                            </div>}
                                        <div style={{ padding: "10px 20px" }}>
                                            <div className="title"> {this.state.post.title}</div>
                                            <div className="meta">
                                            <div className="row">
                                                <div className="col m7 s12 no-pad2">
                                                    <span className="left new badge red" style={{ marginLeft: "0px" }}>Tag: {this.state.post.category}</span>
                                                </div>
                                                <div className="col m1 no-pad hide-on-med-and-down" style={{ width: "5%" }}>
                                                    <small> <i className="material-icons ">alarm</i></small>
                                                </div>

                                                <div className="col m2 s8 no-pad2">
                                                    {moment(this.state.post.date).format("LL")}
                                                </div>
                                                <div className="col m1 s2 right-align">
                                                    <small> <i className="material-icons ">visibility</i></small>
                                                </div>
                                                <div className="col m1 s2 no-pad2">
                                                    {this.state.post.views}
                                                </div>

                                            </div>
                                                {/* <i className="material-icons">alarm</i> */}
                                                {/* <span className="right"> <i className="material-icons ">comment</i></span><span> Jan 12 2018</span> */}
                                            </div>
                                            <div className="content" style={{ whiteSpace: "pre-line" }}>  {this.state.post.description} </div>

                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="col m4 s12">
                        <div className="recent-news blue-grey darken-4">
                            <ul className="collection with-header">
                                <li className="collection-header">
                                    <div className="bold-title">
                                        Recent Posts
                        </div>
                                </li>
                                {this.props.news.slice(0,6).map((post) => (
                                    <li className="collection-item">
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col s2 no-pad" style={{ background: `url(${post.imgUrl})`, backgroundSize: "100%",backgroundPosition:"center", height: "40px" }}>
                                                <div >
                                                </div>
                                            </div>
                                            <div className="col s10 no-pad">
                                                <a href={`/news/${post._id}`}>{post.title}</a> <br />
                                                <small>     {moment(post.date).format("LL")}</small>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <div className="google-play">
                            <div className="row">
                                <div className="col s6" style={{ paddingBottom: "0px" }}>
                                    <img src="../../../images/1.png" width="100%" className="img-responsive" alt="Image" />
                                </div>
                                <div className="col s6" style={{ paddingBottom: "0px" }}>
                                    <img src="../../images/2.png" width="100%" className="img-responsive" alt="Image" />
                                </div>
                            </div>

                        </div> */}
                        {/* <div className="membership blue-grey darken-4">
                        </div> */}
                    </div>
                </div>
            </div>:null
        );
    }
}

export default Post;