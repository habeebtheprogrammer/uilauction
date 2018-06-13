import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import apiUrl from "../../config"
import axios from "axios"
import { Route,Switch } from "react-router-dom"
import moment from "moment"
import Listing from "./listing"
import Post from "./post"
import { Link } from "react-router-dom"
import Artistslider from "../slider/artistslider"

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }

    componentWillMount() {
        axios.get(`${apiUrl}/api/news`).then((res) => {
            if (res.data.success) {
                this.setState({ news: res.data.success })
                // this.props.setUserProfile(res.data.success)
            } else console.log(res)
        })
    }

    render() {

        var coverimg = [{ src: "v1.jpg" }, { src: "v2.jpg" }, { src: "v3.jpg" }, { src: "v4.jpg" }, { src: "v5.jpg" }, { src: "v6.jpg" }, { src: "v7.jpg" }, { src: "v8.jpg" }]
        return (
            <div className="news ">
                <Navbar />
                <Switch>
                    <Route path={`${this.props.match.url}/:id`} render={(props) => (
                        <Post {...props} {...this.state} />
                    )} />
                    <Route path="/" render={(props) => (
                        <Listing {...props} {...this.state} />
                    )} />
                </Switch>
               

                <Footer />

                <style>{`
                    .row{
                        margin:0px !important;
                    }
                    .news .pad{
                        padding:0px 20px;
                    }
                    .news{
                        background:#f7f7f7;
                        // background:linear-gradient(#263238 ,transparent 80%)
                    }
                    .lcard{
                        height: 300px
                    }
                    .row{
                        margin:0px !important
                    }
                    .news .recent-news{
                        margin:75px 0px 0px;
                    }
                    .news .recent-news a{
                        color:#222;
                        font-size:1.1em
                    }
                    .news .recent-news small{
                        margin:75px 0px 0px;
                        color:#999
                    }
                     .no-pad2{
                        padding:0px !important
                    }
                    .news .bold-title{
                        font-size:1.6em;
                        font-weight:bold;
                        margin:10px 0px;
                    }
                    .news .post .title{
                        font-size:1.6em;
                        padding:10px 0px;
                    }
                    .news .container{
                        width:93%;
                        margin:auto;
                    }
                    .news .google-play{
                        color:#eee;
                    }
                    .news .membership{
                        min-height:330px;
                    }
                     @media (max-width: 620px) {
                        .container{
                        width:100% !important;
                    }
                    .no-pad2{
                        padding:0px !important
                    }
                     .lcard{
                        height: 200px
                    }
                }
                `}
                </style>
            </div>
        );
    }
}

export default News;