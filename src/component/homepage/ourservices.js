import React, { Component } from 'react';
import { Link } from "react-router-dom"
// import "../../style.css"
// import "../../bootstrap.min.css"
class Ourservices extends Component {
    render() {
        return (
            <div className="our-services grey darken-4 " style={{borderTop:"1px solid #555",padding:"0px 100px 30px"}}>
                <div className="row" style={{ marginBottom: "0px" }}>
                    <div className="col m3 ">
                        {/* <img src="./images/tt.jpg" width="60%" class="img-responsive" alt="Image" /> */}
                    </div>
                    <div className="col m12">
                        <div className="w3_agile_team_grid">
                            <div className="w3_agile_team_grid_left">
                                {/* <p className="grey-text">02</p> */}
                                <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                            </div>
                            <div className="w3_agile_team_grid_right">
                                <h3 className="grey-text text-lighten-2">Tamtamtools <span>Services</span></h3>
                                {/* <p>
                                    Develop on-site personalized profiles, connect with new and existing clients build your buisness
                            </p> */}
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        {/* <h4 className="grey-text text-lighten-2">Tamtamtools <span className="red-text">Services</span></h4> */}
             
                        <div className="row center-align grey-text" style={{ margin: "0px",fontSize:"1.1em" }}>
                            <div className="col s6 m4  " style={{ margin: "0px" }}>

                                <img src="./images/ser_ad.png" width="100px" class="img-responsive" alt="Image" />
                                <br />
                                <p>Advertisements & Promotions</p>
                            </div>
                            <div className="col s6  m4   ">
                                {/* <center><i className="material-icons large">groups</i></center> */}
                                <img src="./images/ser_artwork.png" width="100px" class="img-responsive" alt="Image" style={{ display: "inline-block" }} />
                                <br />
                                <p> Our Partner </p>
                            </div>
                            <div className="col s6  m4  ">
                                <img src="./images/ser_part.png" width="100px" class="img-responsive" alt="Image" />
                                <br />
                                <p>  Affiliate/Partnership
                             Program
                            </p>
                            </div>

                            {/* <div className="col m3 border-bottom  pad">
                        <img src="./images/ser_mass.png" width="100px" class="img-responsive" alt="Image" />
                        <br />
                        <p> Mass Auditions &
                        Screening</p>
                    </div>
                    <div className="col m3 border-right pad">
                        <img src="./images/ser_event.png" width="100px" class="img-responsive" alt="Image" />
                        <br />
                        <p>Event
                            Management</p>
                    </div>
                    <div className="col m3 border-right pad">
                        <img src="./images/ser_subscr.png" width="100px" class="img-responsive" alt="Image" />
                        <br />
                        <p>  Premium
                                Subscription
                            </p>
                    </div>
                    <div className="col m3 border-right pad">
                        <img src="./images/ser_artwork.png" width="100px" class="img-responsive" alt="Image" />
                        <br />
                        <p> Sale of
                            Artwork
                            </p>
                    </div>
                    <div className="col m3 pad">
                        <img src="./images/ser_part.png" width="100px" class="img-responsive" alt="Image" />
                        <br />
                        <p>  Affiliate/Partnership
                             Program
                            </p>

                    </div> */}
                        </div>
                    </div>
                    <div className="col m3 ">
                        {/* <img src="./images/5.jpg" width="60%" class="img-responsive" alt="Image" /> */}

                    </div>
                </div>

                <style>{`
                    .our-services{
                        background:#fff;
                        padding:50px 0px 50px;
                    }
                    .our-services .title{
                        font-size:2em;
                        font-family:coco;
                        text-transform :uppercase
                    }
                    .our-services .subtitle{
                        font-size:1.1em
                    }
                    .our-services .border-bottom{
                        border-bottom:1px solid #bbb
                    }
                     .our-services .border-right{
                        border-right:1px solid #bbb
                    }
                    .our-services .pad{
                        padding:20px 0px;
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Ourservices;