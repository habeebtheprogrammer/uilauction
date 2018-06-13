import React, { Component } from 'react';
import { Link } from "react-router-dom"
class Gridblock extends Component {
    render() {
        return (
            <div className="gridblock hide-on-small-only">
                <div className="row" style={{margin:"0px"}}>
                    <div className="col s12 m3 grid home-grid-red">
                        <Link to="/media">
                            <div className="home-grid-box" >
                                <center>
                                    <i className="material-icons home-grid-icon">play_arrow</i>
                                    <div className="home-grid-title" >Media Channel</div>
                                    {/* <p className="home-grid-subtitle">Video and Audio</p> */}
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 m3 grid home-grid-ash ">
                        <Link to="/commingsoon">
                            <div className="home-grid-box " >
                                <center>
                                    <i className="material-icons home-grid-icon">home</i>
                                    <div className="home-grid-title" >Lodging</div>
                                    {/* <p className="home-grid-subtitle">Appartment for Artists</p> */}
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 m3 grid home-grid-red">
                        <Link to="/marketplace">

                            <div className="home-grid-box" >
                                <center>
                                    <i className="material-icons home-grid-icon">shopping_cart</i>
                                    <div className="home-grid-title" >Marketplace</div>
                                    {/* <p className="home-grid-subtitle">Marketplace And extra  Tickets</p> */}
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 m3 grid home-grid-ash">
                        <Link to="/calendar">

                            <div className="home-grid-box" >
                                <center>
                                    <i className="material-icons home-grid-icon">place</i>
                                    <div className="home-grid-title" >Shows</div>
                                    {/* <p className="home-grid-subtitle">Shows And extra  Tickets</p> */}
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col  s12 m3 grid home-grid-red">
                        <Link to="/artists">

                            <div className="home-grid-box" >
                                <center>
                                    <i className="material-icons home-grid-icon">group</i>
                                    <div className="home-grid-title" >Artist Profiles</div>
                                    {/* <p className="home-grid-subtitle">Top rated Artist</p> */}
                                </center>
                            </div>
                        </Link>
                    </div>
                    <div className="col s3 home-grid">

                    </div>

                </div>
                <style>{`
                    .gridblock .grid{
                        width:20% !important;
                    }
                     .home-grid-ash{
                                background:rgba(0,0,0,0.8);
                                height:200px;
                                margin-top:70px
                            }
                            .home-grid-red{
                                background:rgba(83,0,0,0.3);
                                height:200px;
                                margin-top:70px
                            }
                            .home-grid-box{
                                padding:50px 0px;
                            }
                            .home-grid-title{
                                font-size:1.3em;
                                color:#eee;
                                position:relative
                                  transition: 0.2s ease-in;
                            }
                            .home-grid-subtitle{
                                color:#eee;
                                 transition: 0.2s ease-in;
                                  transition: 0.2s ease-in;
                            }
                             .home-grid-icon{
                                color: #eee;
                                  transition: 0.2s ease-in;
                                 font-size:2.5em
                                }
                             .home-grid-title{

                            }
                     .home-grid-red:hover .home-grid-icon,.home-grid-ash:hover .home-grid-icon{
                         color:#F44336;
                        transition: 0.2s ease-in;
                        font-size:2em;
                    }
                                .home-grid-red:hover .home-grid-subtitle{
                         letter-spacing:1px;
                         font-size:1.2em;
                        transition: 0.2s ease-in;
                        color:lightblue;
                    }
                           .home-grid-red:hover .home-grid-title,.home-grid-ash:hover .home-grid-title{
                        font-size:1.5em;
                        transition: 0.2s ease-in
                    }
                     @media (max-width: 620px) {
                        .gridblock .grid{
                        width:50% !important;
                        margin:0px;
                    }
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Gridblock;