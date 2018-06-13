import React, { Component } from 'react';
import moment from "moment"
import { Link } from "react-router-dom"
import YouTube from "react-youtube"

class Listing extends Component {
    substr(text, length) {
        if (text)
            if (text.length > length) {

                return text.substr(0, length) + "..."
            }
            else return text
    }
    render() {
   
        return (
            <div className="container">
                <div className="row ">

                    <div className="col m8">
                        <div>

                            <div className="bold-title" style={{ padding: "20px 0px 0px" }}>
                                Our News
                                </div>
                            {this.props.news.map((post) => (
                                <div>
                                    <div className="post white" style={{ marginBottom: "40px" }}>
                                        {post.youtubelink ?
                                            <YouTube
                                                videoId={post.youtubelink}
                                                className="lgheight"
                                                opts={{
                                                    width: '100%',
                                                    playerVars: { // https://developers.google.com/youtube/player_parameters,
                                                        autoplay: 0
                                                    }
                                                }}
                                                onReady={this._onReady}
                                            />
                                            : <div className="img lcard" style={{ padding: "0px 0px 0px" }} style={{ background: `url(${post.imgUrl}) no-repeat`, backgroundSize: "contain", backgroundPosition: "center", }}>
                                            </div>}
                                       
                                        <div style={{ padding: "10px 20px" }}>
                                            <div className="title"> {post.title}</div>
                                            <div className="meta">
                                                <div className="row">
                                                    <div className="col m7 s12 no-pad2">
                                                        <span className="left new badge red" style={{ marginLeft: "0px" }}>Tag: {post.category}</span>
                                                    </div>
                                                    <div className="col m1 no-pad2 hide-on-med-and-down" style={{ width: "5%" }}>
                                                        <small> <i className="material-icons ">alarm</i></small>
                                                    </div>

                                                    <div className="col m2 s8 no-pad2">
                                                        {moment(post.date).format("LL")}
                                                    </div>
                                                    <div className="col m1 s2 right-align">
                                                        <small> <i className="material-icons ">visibility</i></small>
                                                    </div>
                                                    <div className="col m1 s2 no-pad2">
                                                        {post.views}
                                                    </div>

                                                </div>
                                                {/* <i className="material-icons">alarm</i> */}
                                                {/* <span className="right"> <i className="material-icons ">comment</i></span><span> Jan 12 2018</span> */}
                                            </div>
                                            <div className="content" style={{ whiteSpace: "pre-line" }}>  {this.substr(post.description,100)} </div>
                                            <Link to={`/news/${post._id}`} className="btn transparent z-depth-0 black-text" style={{ border: "1px solid lightgrey", margin: "10px 0px" }} >Continue<i className="material-icons right">arrow_forward</i></Link>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col m4">
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
                                            <div className="col s2" style={{ background: `url(${post.imgUrl})`, backgroundSize: "cover", height: "40px" }}>
                                                <div >
                                                </div>
                                            </div>
                                            <div className="col s10">
                                                <Link to={`/news/${post._id}`}>{post.title}</Link> <br />
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
                                <img src="./images/1.png" width="100%" className="img-responsive" alt="Image" />
                            </div>
                            <div className="col s6" style={{ paddingBottom: "0px" }}>
                                <img src="./images/2.png" width="100%" className="img-responsive" alt="Image" />
                            </div>
                        </div>

                    </div> */}
                        {/* <div className="membership blue-grey darken-4">
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Listing;