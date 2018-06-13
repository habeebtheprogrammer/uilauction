import React, { Component } from 'react';
import { Link } from "react-router-dom"
class Radio extends Component {
    render() {
        return (
            <div className="radiostream ">
                <a href="/media-channel">
                    <div className="container">

                        <div className="row" style={{ margin: "0px" }}>
                            <div className="col m2 s3">
                                <div className="media-round">
                                    <i className="material-icons ">play_arrow</i>
                                </div>
                            </div>
                            <div className="col m5 s9">
                                <div className="rtitle">
                                    TAMTAMTOOLS RADIO
                    </div>
                            </div>
                            <div className="col m1 s2 hide-on-small-only">
                                <div style={{ margin: "5px 0px" }}>
                                    <img src="../../../images/logoTransparent.png" width="100%" alt="Image" style={{ borderRadius: "100%" }} />
                                </div>


                            </div>
                            <div className="col s10 m4 hide-on-small-only" >
                                <div style={{paddingTop:"10px"}}><small><b>On Air</b></small></div>
                                <div><small><b>Tamtamtools live radio</b> </small></div>
                                {/* <div><small><b>(join tamtamtools today!)</b></small></div> */}
                            </div>
                        </div>



                    </div>
                </a>
                <style>{`
                   .radiostream{
                      padding:0px 0px;
                    //   border-bottom:1px solid #333;
                    //   border-top:1px solid #555;
                   }
                   .radiostream .media-round{
                        position:relative;
                        display:inline-block;
                        padding:9px 10px 0px;
                        margin:10px 0px;
                        // border:2px solid #222;
                        border-radius:100%;
                        transition:0.2s ease-in;
                        background:#fff;
                    }
                    .radiostream i{
                        color: #222;
                        font-size:2em
                    }
                    .radiostream .rtitle{
                        display:inline-block;
                        padding:25px 0px 20px;
                        font-weight:bold;
                    }
                    .radiostream a {
                        color:#fff;
                    }
                    .radiostream a:hover .media-round{
                        background:rgb(244, 67, 54);
                        // border:2px solid #fff;
                        transition:0.2s ease-in
                    }
                     .radiostream a:hover i{
                         color:#fff; 
                     }
                    .radiostream .container{
                        width:70% !important;
                        margin:auto;
                    }
                 @media (max-width: 620px) {
                            .radiostream .media-round{
                        position:relative;
                        display:inline-block;
                        padding:4px 5px 0px;
                        margin: 3px 0px 0px;
                        // border:2px solid #222;
                        border-radius:100%;
                        transition:0.2s ease-in;
                        background:#fff;
                    }
                     .radiostream .container{
                         width:97% !Important
                     }
                       .radiostream i{
                        color: #222;
                        font-size:1.3em
                    }
                       .radiostream .rtitle{
                        display:inline-block;
                        padding:6px 0px !important;
                        font-weight:normal;
                    }
                    .radiostream{
                        padding:10px 0px;
                    }
                }
                `}
                </style>
            </div>
        );
    }
}

export default Radio;