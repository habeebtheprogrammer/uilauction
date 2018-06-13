import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
// import artistslider from "../slider/artistslider"
import { Link } from "react-router-dom"
import validator from "validator"
import Select from 'react-select';
import apiUrl from "../../config"
import data from "../../data"
import Bestprofiles from "./bestprofiles"
import Recent from "./recent"
import Keywordfilter from "./keywordfilter"
import Search from "./search"
import axios from "axios"
import { connect } from "react-redux"
import auth from "../../reducer/index"
import Contact from "../profile/contact"
import Banner from "../search/banner"
import { Card, CardTitle, Collapsible, CollapsibleItem, Button, Row, Input, Badge } from "react-materialize"
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}
class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist:{},
            artists: [],
            filterByIndustry: [],
            selectValue: ""
        }
        this.filterResult = this.filterResult.bind(this)
    }
    componentWillMount() {
        if (this.props.auth.user.id) {
            axios.get(`${apiUrl}/api/artist?id=${this.props.auth.user.id}`).then((res) => {
                // this.props.setUserProfile(res.data.data)
                if (res.data.success) {
                    this.setState({ artist: res.data.success });
                } else this.setState({ artist: false })
            })
        } else this.setState({ artist: false })
        if (this.props.match.params.id) {
            var index;
            data.industry.map((title,key)=>{
                if(this.props.match.params.id ===title.title ) index=key
            })
            axios.get(`${apiUrl}/api/getArtists?search=${index}`).then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    this.setState({ artists: res.data.success, filterByIndustry: res.data.success })
                } else console.log(res.data)
            }).catch((err) => console.log(err))
        } 
        else{
            axios.get(`${apiUrl}/api/getArtists`).then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    this.setState({ artists: res.data.success, filterByIndustry: res.data.success })
                } else console.log(res.data)
            }).catch((err) => console.log(err))
        }
    
  
    }

    filterResult(artists) {
        this.setState({ filterByIndustry: artists })
    }
    render() {
        console.log(this.props)
        let array = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        return (
            <div className="artist">
                <Navbar />
                <div className="container " >

                    <div className="row"
                        style={{ marginTop: "20px" }}>
                        <div className="col m3 s12 adjust-pad" style={{ marginTop: "13px" }}>

                            {this.state.artist ? <Contact match={this.props.match} profile={this.state.artist} /> : <Bestprofiles />}
                            <Recent />

                        </div>
                        <div className="col s12 m9 pad" >
                            {/* <Banner /> */}
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col s9"><h5 style={{ margin: "0px" }}>Artists Profiles  </h5></div>

                                {/* <div className="col s5" >
                                   <Keywordfilter />
                                </div> */}
                                <div className="col s3" >
                                    <Keywordfilter artists={this.state.artists} filterResult={this.filterResult} />
                                </div>
                                {this.state.filterByIndustry.length ?
                                    this.state.filterByIndustry.map((artist, key) => (
                                        <div className="col m3 s12" key={key} style={{ padding: " 10px" }}>
                                            <div className="card z-depth-1 hoverable" style={{ margin: "0px" }}>
                                                <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: `url('${artist.bgUrl||"../../images/Designers2_1x1_1080x1080_Instagram_Optimized.jpg"}')`, backgroundSize: "cover", zIndex: "0" }}>
                                                    <span className="card-title"></span>
                                                </div>
                                                <div className="card-content">
                                                    <span className="card-title grey-text text-darken-4 activator">
                                                        <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span>
                                                    <ul className="collection z" style={{ border: "0px", margin: "0px", textTransform: 'capitalize' }}>
                                                        <li className="collection-item avatar" style={{ paddingLeft: "50px", paddingTop: "0px", paddingBottom: "0px" }}>
                                                            <img src={`${artist.dpUrl||"./../../images/user.png"}`}alt="" className="circle" style={{ left: "0px" }} />
                                                            <span className="title">{artist.firstName} {artist.lastName}</span>
                                                            <p className="grey-text"><small >{artist.selectedCategory}<br />
                                                            </small>
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <div>
                                                        <Link to={`artist/${artist._id}`} style={{ border: "1px solid lightgrey", width: '100%', fontSize: "0.8em", borderRadius: "20px" }} className="btn waves-effect waves-red transparent    z-depth-0 black-text ">View Profile</Link>
                                                    </div>
                                                </div>
                                                <div className="card-reveal" style={{ fontSize: "0.8em" }}>
                                                    <span className="card-title grey-text text-darken-1"><i className="material-icons right">close</i></span>
                                                    <p className="grey-text text-darken-1">{artist.desc}</p>
                                                    <div className="">
                                                        <a href="#" className="grey-text text-darken-2 " style={{ position: "absolute", bottom: "0" }}>
                                                            <div className="">
                                                                <div className="col" style={{ padding: "3px 4px 0px" }}>
                                                                    <span>{artist.views}</span>
                                                                </div>
                                                                <div className="col" style={{ padding: "0px" }}>
                                                                    <div>
                                                                        <i className="material-icons">visibility</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="col s12 center-align" >
                                        <p> No result found </p>
                                    </div>
                                }
                            </div>

                            <div className="row">
                                <div className="col s6 offset-s3 center-align">
                                    <button type="button" style={{ border: "1px solid lightgrey", fontSize: "0.8em" }} className="btn waves-effect waves-red transparent z-depth-0 grey-text text-darken-2">Load More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="" style={{ padding: "0px 40px" }}>
                    <Marketplaceslider />
                </div> */}
                <Footer />
                <style>{`
                    body{
                        background:#f9f9f9;
                    }
                   .artist >.row{
                       padding:5px 0px;
                   }

                   .artist .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .artist .card .card-image img{
                    //    width:50%;
                    max-height:200px
                   }
                   .artist .left-grid-col{
                       padding:0px 10px 0px 0px !important;
                   }
                    .artist .left-grid{
                    //    border-right:1px solid lightgrey;
                   }
                    .artist .grid{
                       width:20% !important;
                   }
                    .artist .grid-2{
                       width:40% !important;
                   }
                  
                //    .artist .collapsible-header{
                //        padding:0px;
                //        border:0px;
                //        background:transparent;
                //        color:#fff;
                //     //    font-size:0.9em;
                //        border-bottom:1px solid #444;
                //    }
                //    .artist .collapsible-header:hover{
                //        background:#eee;
                //    }
                //   .artist .collapsible{
                //        box-shadow:none;
                //        border:0px;
                //    }
                //      .artist .collapsible i{
                //        font-size:1em;
                //    }
                   .artist z.collection .collection-item{
                       padding:0px;

                //     }
                //     .artist .collection a{
                //     }
                //     .artist i.small{
                //         font-size:1em;
                //     }
                //    .artist a.collection-item.active{
                //         color:#fff;
                //         background:#222 !important;
                //     }
                //     .artist a.collection-item:hover{
                //         background:#fff;
                //         // color:#fff;
                //     }
                    .artist .pad{
                        padding:0px 20px;
                    }
                      .artist .container{
                        width:92%;
                        margin:auto;
                    }
                         .artist .adjust-pad{
                        padding-right:0px;
                    }
                     .artist input.input{
                        height:23px;
                        border:1px solid lightgrey;
                        border-radius:10px;
                        padding:0px 10px;
                        font-size:0.8em;
                     }
                      .artist input{
                        height:20px;
                     }
                `}</style>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Artist);