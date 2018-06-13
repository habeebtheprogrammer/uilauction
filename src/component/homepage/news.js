import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import { Icon } from "react-materialize"
import {Link} from "react-router-dom"
import moment from "moment"
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        }
        this.substr = this.substr.bind(this)
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/recentNews`).then((res) => {
          
            if (res.data.success) {
            
                this.setState({ news: res.data.success, response: true })
            } else console.log(res.data)
        })
    }

    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {

        return (
            <div className="" style={{paddingBottom:"10px"}}>
                <center>
                    <h5 style={{ fontFamily: "avenirBold", padding: "10px 0px 0px" }}>NEWS ABOUT OUR MEMBERS</h5>
                    {/* <p> From our News</p> */}
                </center>

                <div className="row">
                    {this.state.news.map((news) => (
                        <div className="col s12 m4 x2-padding">
                            <Link to={`news/${news._id}`} className="grey-text text-darken-3">

                                <div className="card  hoverable z-depth-0 white" style={{ border: "1px solid lightgrey", textTransform: "capitalize"}}>
                                   
                                    <div className="" style={{
                                        background: `linear-gradient(rgba(132, 84, 34, 0),rgba(132, 84, 34, 0)),#fff url('http://res.cloudinary.com/afrikal/image/upload/w_800,h_700,c_fill,g_auto/${news.imgID}') no-repeat `, backgroundRepeat: "no-repeat",
                                        backgroundSize: "100%", height: "270px"
                                    }}>
                                        {/* <div className="date-box white-text center-align   right" style={{ width: "20%", margin: "0px 10px" }}>
                                            <div className="green darken-1" style={{ fontSize: "1.5em",padding:"10px 0px"}}> {moment(news.date).format("DD")}</div>
                                            <div className="black" style={{ fontSize: "0.8em", padding: "10px 0px" }}>
                                            <div>{moment(news.date).format("MMM")}</div>
                                                <div>{moment(news.date).format("YYYY")}</div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div style={{ padding: "10px 15px 10px" }}>
                                        <div className="row" style={{ margin: "0px" }}>
                                            <div className="col s12">

                                                <div style={{ textTransform: "capitalize", fontSize: "1.4em",padding:"10px 0px" }}><b>{this.substr(news.title, 25)}</b></div>
                                            </div>
                                            <div className="col s12">
                                                <div className="gr">{this.substr(news.description, 40)}</div>
                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>visibility</Icon>

                                            </div>
                                            <div className="col s2 grey-text">
                                                <small>{news.views}</small>
                                            </div>
                                            <div className="col s1 grey-text" style={{ paddingTop: "2px" }}>
                                                <Icon tiny>group</Icon>
                                            </div>
                                            <div className="col s6 grey-text left-align">
                                                <small>{this.substr(news.category, 7)}</small>
                                            </div>
                                         
                                        </div>
                                        {/* <div className="" style={{ textTransform: "uppercase", padding: "5px 0px", fontSize: "1.3em" }}><b>{this.substr(news.title)}</b></div> */}
                                        {/* <div className="grey-text "><small style={{ fontSize: "0.8em" }}>At Fiverr, our marketplace is only as strong as our community, and regardless of whether you’re a buyer... </small> <a href="" className="black-text "><small>READ MORE</small></a> </div> */}
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}

                </div>

                <style>{`
                .img-responsive{
                    width:100%;
                }
                `}
                </style>
            </div>
        );
    }
}

export default News