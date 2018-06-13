import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Marketplaceslider from "../slider/marketplaceslider"
// import showslider from "../slider/showslider"
import { Link } from "react-router-dom"
import data from "../../data"
import apiUrl from "../../config"
import Recentartist from "../artist/recent"
import Recent from "../marketplace/recent"
import axios from "axios"
import { Card, CardTitle, Collapsible, CollapsibleItem, Button, Row, Input, Badge } from "react-materialize"
class Shows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        }
        this.search = this.search.bind(this)
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getshows`).then((res) => {
            if (res.data.success) this.setState({ shows: res.data })
        })
    }
    search(e) {
        axios.post(`${apiUrl}/api/getshows`, { text: e.target.value }).then((res) => {
            if (res.data) {
              
            }
        })
    }

    render() {
        var array = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
      
        return (
            <div className="shows">
                <Navbar />
                <div className="container " >

                    <div className="row"
                        style={{ marginTop: "20px" }}>
                        <div className="col m3 adjust-pad">

                            <Recentartist />
                            {this.state.shows.length ?
                                <Recent /> : null}

                        </div>
                        <div className="col m9 pad" >
                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col s10"><h5 style={{ margin: "0px" }}>shows  </h5></div>
                                <div className="col s2" >
                                    <form className="" style={{ padding: "0px 20px 0px 0px" }} >
                                        <input id="place" onChange={this.search.bind(this)} placeholder="Search for shows" type="text" className="input" style={{}} />
                                    </form>
                                </div>

                                {this.state.shows.length ? this.state.shows.map((shows, key) => (
                                    <div className="col m3 " key={key} style={{ padding: " 10px" }}>
                                        <div className="card z-depth-1 hoverable" style={{ margin: "0px" }}>
                                            <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: "url('./images/" + array[key] + "')", backgroundSize: "cover" }}>
                                                {/* <center> */}
                                                {/* <img className="activator" src={`./images/${item}`} style={{ width: "100px" }} /> */}
                                                {/* </center> */}
                                                <span className="card-title"></span>
                                            </div>
                                            <div className="card-content">
                                                <span className="card-title grey-text text-darken-4 activator">
                                                    <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span>
                                                <ul className="collection z" style={{ border: "0px", margin: "0px", textTransform: 'capitalize' }}>
                                                    <li className="collection-item avatar" style={{ paddingLeft: "50px", paddingTop: "0px", paddingBottom: "0px" }}>
                                                        <img src={`./images/${array[key]}`} alt="" className="circle" style={{ left: "0px" }} />
                                                        <span className="title">{shows.firstName} {shows.lastName}</span>
                                                        <p className="grey-text"><small >{shows.selectedIndustry >= 0 ? data.industry[shows.selectedIndustry].categories[shows.selectedCategory].title : "not available"}<br />
                                                        </small>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <Link to={`${this.props.match.url}/${shows._id}`} style={{ border: "1px solid lightgrey", width: '100%', fontSize: "0.8em", borderRadius: "20px" }} className="btn waves-effect waves-red transparent    z-depth-0 black-text ">View shows</Link>
                                                </div>
                                            </div>
                                            <div className="card-reveal">
                                                <span className="card-title grey-text text-darken-1"><i className="material-icons right">close</i></span>
                                                <p className="grey-text text-darken-1" style={{ fontSize: "0.8em" }}>{shows.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className="center-align" > There are no shows available</p>}
                            </div>

                            <div className="row">
                                <div className="col s6 offset-s3 center-align">
                                    <button type="button" style={{ border: "1px solid lightgrey", fontSize: "0.8em" }} className="btn waves-effect waves-red transparent z-depth-0 grey-text text-darken-2">Load More</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ padding: "0px 40px" }}>
                    <Marketplaceslider />
                </div>
                <Footer />
                <style>{`
                    body{
                        background:#f9f9f9;
                    }
                   .shows >.row{
                       padding:5px 0px;
                   }

                   .shows .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .shows .card .card-image img{
                    //    width:50%;
                    max-height:200px
                   }
                   .shows .left-grid-col{
                       padding:0px 10px 0px 0px !important;
                   }
                    .shows .left-grid{
                    //    border-right:1px solid lightgrey;
                   }
                    .shows .grid{
                       width:20% !important;
                   }
                    .shows .grid-2{
                       width:40% !important;
                   }
                  
                //    .shows .collapsible-header{
                //        padding:0px;
                //        border:0px;
                //        background:transparent;
                //        color:#fff;
                //     //    font-size:0.9em;
                //        border-bottom:1px solid #444;
                //    }
                //    .shows .collapsible-header:hover{
                //        background:#eee;
                //    }
                //   .shows .collapsible{
                //        box-shadow:none;
                //        border:0px;
                //    }
                //      .shows .collapsible i{
                //        font-size:1em;
                //    }
                   .shows z.collection .collection-item{
                       padding:0px;

                //     }
                //     .shows .collection a{
                //     }
                //     .shows i.small{
                //         font-size:1em;
                //     }
                //    .shows a.collection-item.active{
                //         color:#fff;
                //         background:#222 !important;
                //     }
                //     .shows a.collection-item:hover{
                //         background:#fff;
                //         // color:#fff;
                //     }
                    .shows .pad{
                        padding:0px 30px;
                    }
                      .shows .container{
                        width:95%;
                        margin:auto;
                    }
                         .shows .adjust-pad{
                        padding-right:0px;
                    }
                     .shows input.input{
                        height:23px;
                        border:1px solid lightgrey;
                        border-radius:10px;
                        padding:0px 10px;
                        font-size:0.8em;
                     }
                `}</style>
            </div>
        );
    }
}

export default Shows;