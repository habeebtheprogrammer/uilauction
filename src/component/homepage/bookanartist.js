import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Radio from "./radio"
import Video from "./video"
import apiUrl from "../../config"
import axios from "axios"
import Gridblock from "./gridblock"
import {Preloader} from "react-materialize"
class Bookanartist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artists: []
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestArtists`).then((res) => {

            if (res.data.success) {
                let collection = res.data.success.splice(0, 2)
                this.setState({ artists: collection })
            }
        })
    }

    render() {
     
        return (
            <div className="bookanartist ">
                <div className="row">

                    <div className="col m6">
                        <div className="center-align btitle" style={{ fontFamily: "coco" }}>
                            Most Viewed  <span style={{ color: "#e53935" }}>Videos</span>
                        </div>
                        <div className="center-align grey-text text-darken-1" style={{ fontSize: "1.1em", marginBottom: "10px" }}>
                            Explore some of the finest videos from around the world.<br /> Be inspire
                            <br />
                           {this.state.artists.length>0?null: <p><center><Preloader flashing size="small" /></center></p>}
                        </div>
                        <div className="row">
                            <div className="col m1 s12" ></div>{this.state.artists.map((artist, key) => (
                                <div className="col m5 s12" key={key} style={{ padding: " 10px" }}>
                                    <div className="card z-depth-0 hoverable" style={{ margin: "0px" }}>
                                        <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: `url('${artist.bgUrl || "../../images/Designers2_1x1_1080x1080_Instagram_Optimized.jpg"}')`, backgroundSize: "cover", zIndex: "0" }}>
                                            <span className="card-title"></span>
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title grey-text text-darken-4 activator">
                                                <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span>
                                            <ul className="collection z" style={{ border: "0px", margin: "0px", textTransform: 'capitalize' }}>
                                                <li className="collection-item avatar" style={{ paddingLeft: "50px", paddingTop: "0px", paddingBottom: "0px" }}>
                                                    <img src={`${artist.dpUrl || "./../../images/user.png"}`} alt="" className="circle" style={{ left: "0px" }} />
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
                            ))}
                            <div className="col m1 s12" ></div>
                        
                        </div>
                    </div>
                    <div className="col m6 ">
                        <div className="center-align btitle" style={{ fontFamily: "coco" }}>
                            Top Rated  <span style={{ color: "#e53935" }}>Artist</span>
                        </div>
                        <div className="center-align grey-text text-darken-1" style={{ fontSize: "1.1em", marginBottom: "10px" }}>
                            Explore some of the best artist from around the world.<br /> Be inspire
                           {this.state.artists.length > 0 ? null : <p><center><Preloader flashing size="small" /></center></p>}
                            
                        </div>
                        <div className="row">
                            <div className="col m1 s12 " ></div>
                            {this.state.artists.map((artist,key) => (
                                <div className="col m5 s12" key={key} style={{ padding: " 10px" }}>
                                    <div className="card z-depth-0 hoverable" style={{ margin: "0px" }}>
                                        <div className="card-image waves-effect waves-light waves-block" style={{ padding: "70px 0px", background: `url('${artist.bgUrl || "../../images/Designers2_1x1_1080x1080_Instagram_Optimized.jpg"}')`, backgroundSize: "cover", zIndex: "0" }}>
                                            <span className="card-title"></span>
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title grey-text text-darken-4 activator">
                                                <i className="material-icons right" style={{ fontSize: "0.9em" }}>more_vert</i></span>
                                            <ul className="collection z" style={{ border: "0px", margin: "0px", textTransform: 'capitalize' }}>
                                                <li className="collection-item avatar" style={{ paddingLeft: "50px", paddingTop: "0px", paddingBottom: "0px" }}>
                                                    <img src={`${artist.dpUrl || "./../../images/user.png"}`} alt="" className="circle" style={{ left: "0px" }} />
                                                    <span className="title">{artist.firstName} {artist.lastName}</span>
                                                    <p className="grey-text"><small >{artist.selectedCategory}<br />
                                                    </small>
                                                    </p>
                                                </li>
                                            </ul>
                                            <div>
                                                <Link to={`artist/${artist._id}`} style={{ border: "1px solid lightgrey", width: '100%', fontSize: "0.8em", borderRadius: "20px" }} className="btn link-hover waves-effect waves-red transparent    z-depth-0 black-text ">View Profile</Link>
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
                            ))}
                            <div className="col m1 s12" ></div>
                            
                        </div>
                    </div>
                </div>
                <style>{`
                    .bookanartist{
                        background:#eee;
                        padding:30px;
                    }
                    .bookanartist .btitle{
                        font-size:1.4em;
                        text-transform :uppercase
                    }
                    .bookanartist .bsubtitle{
                        font-size:1em
                    }
                    .bookanartist .row{
                        margin-bottom:0px;
                    }
                         .bookanartist .media-round{
                        position:relative;
                        display:inline-block;
                        padding:3px 5px 0px;
                        margin:40px 0px;
                        // border:2px solid #eee;
                        border-radius:100%;
                        transition:0.2s ease-in;
                        background:#fff;
                    }
                    .bookanartist a i{
                        color:rgb(244, 67, 54)
                    }
                    .bookanartist a:hover .media-round{
                        background:rgb(244, 67, 54);
                        // border:2px solid #fff;
                        transition:0.2s ease-in
                    }
                     .bookanartist a:hover i{
                         color:#fff; 
                     }
                     .link-hover:hover{
                        background:rgb(229, 57, 53);
                        transition:0.2s ease-in;
                        color:#fff;
                     }
                         .bookanartist .card-content{
                       padding: 10px;
                       font-size:0.9em
                   }
                   .bookanartist .card .card-image img{
                    //    width:50%;
                    max-height:200px
                   }
                `}
                </style>
            </div>
        );
    }
}

export default Bookanartist;