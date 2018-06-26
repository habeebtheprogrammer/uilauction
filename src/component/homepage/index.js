import React, { Component } from 'react';
import Navbar from "../navbar/index"
import { Link } from "react-router-dom"
import Searchbar from "./searchbar"
import Footer from "../footer/index"
import Marketplace from './marketplace';
import { Divider, Slider, Slide } from 'react-materialize';

class Hompage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    render() {
        var token = window.localStorage.getItem("jwToken")
        return (
            <div >
                <Navbar />

                {/* <div style={{
                    background: "#000 url('./images/Opera_2.jpg') no-repeat ", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", backgroundPosition: "top", height: "400px"
                }}> */}

                    {/* <div className="row">
                        <div className="col m5 s12 white-text home-banner" style={{}}>
                            <h3>Behold! Pure Talent!</h3>
                            <p style={{fontSize:"1.2em"}}> Discover the most prodigious artists</p>
                            {token ? null : <Link to="/pricing" className="btn joinbtn z-depth-0 yellow darken-4" style={{  }}>Join Tamtamtamtools today!</Link>}
                            
                        </div>
                        <div className="col m2 hide-on-med-and-down" style={{padding:"0px"}}>
                            <img src="../../images/logoTransparent.png" width="250px" style={{ marginTop: "30px" }} className="" alt="Image" />
                        </div>                        
                        <div className="col m5 hide-on-med-and-down">
                        
                        </div>
                    </div>
 */}

                    {/* <Searchbar /> */}
                    {/* <Gridblock /> */}
                {/* </div> */}
                <Slider className="firstSlider">
                    <Slide

                        src="../../images/demo1_slide5_880x285-1.jpg" 
                        // title="Behold! Pure Talent!"
                        placement="left">
                        {/* Sell your books, Cd's and lots more <br /> */}
                        {/* {token ? null : <Link to="/pricing" className="btn joinbtn z-depth-0 yellow darken-4" style={{}}>Join Tamtamtamtools today!</Link>} */}
                    </Slide>

                    <Slide
                        src="../../images/demo1_slide6_880x285-1.jpg"
                        // title="Media streaming platform"
                        placement="left">
                        {/* Sell your books, Cd's and lots more <br /> */}
                        {/* {token ? null : <Link to="/pricing" className="btn joinbtn z-depth-0 yellow darken-4" style={{}}>Join Tamtamtamtools today!</Link>} */}
                    </Slide>
                    <Slide
                        src="../../images/demo1_slide9_880x285-1.jpg"
                        // title="Events and Marketplace"
                        placement="right">
                        {/* Sell your books, Cd's and lots more <br /> */}
                        {/* {token ? null : <Link to="/pricing" className="btn joinbtn z-depth-0 yellow darken-4" style={{}}>Join Tamtamtamtools today!</Link>} */}
                     </Slide>
                </Slider>
                {/* <Video /> */}
                <div className="" style={{paddingLeft:"5px",paddingRight:"5px"}}>

                {/* <Pictures /> */}
                {/* <Services /> */}
                {/* <Featured /> */}
                <Marketplace />
                {/* <News /> */}
                </div>
                <Footer />

                <style>{`
                            body{background:#f7f7f7}
                            .input-field input[type=text]:focus + label {
                                color: #fff !important;
                            }
                            .no-pad{
                                padding:0px !important
                            }
                            .container{
                                width:90% !important
                            }
                            // .home-banner{
                            //         padding:50px 70px !important
                            // }
                            .input-field input[type=text]:focus {
                                border-bottom: 2px solid red  !important;
                            }
                                .input-field input[type=text].valid {
                                border-bottom: 2px solid !important;
                                box-shadow: 0 1px 0 0 #000;
                            }
                            .video-react-big-play-button.video-react-big-play-button-left{
                                background:none;
                                border:#555;
                            }
                            .slider .slides li:nth-child(3) img{
                                background-position: top !important;
                                }
                                .slider .slides li:nth-child(2) img{
                                background-position-y: top !important;
                                }
                                .slider .slides li:nth-child(1) img{
                                background-position-y:top !important;
                                }
                                // .slides{height:460px !important}
                            .font-h2{
                                color:#eee;
                                margin:90px 0px 30px;
                            }
                           .slider.firstSlider{
                                // height:460px !important
                            }
                             .row{
                                margin:0px  !important
                            }
                             .ecard{
                        height: 300px
                            }
                        .joinbtn{
                            padding: 5px 15px ;
                            height: inherit !important; 
                            font-size:0.7em  !important;
                            border-radius: 5px !important; 
                            margin-top: 40px !important;
                        }
                          @media (max-width: 620px) {
                                .slider .slides li:nth-child(3) img{
                                background-position-y: 0px !important;
                                background-position: left !important;
                                }
                                .slider .slides li:nth-child(2) img{
                                background-position-y: 0px !important;
                                background-position: left !important;
                                }
                                // .slider .slides li:nth-child(1) img{
                                // background-position-y: 0px !important;
                                // background-position: left !important;
                                
                                }
                                 .home-banner{
                                    padding:50px 20px !important
                            }
                            .container{
                                width:97% !important
                            }
                            .row{
                                margin:0px !important
                            }
                             .ecard{
                                 height: 200px
                                }
                                  .slider .slides li:nth-child(3) img{
                                background-position-y: inherit !important;
                                }
                                // .slider .slides li:nth-child(2) img{
                                // background-position-y: 401px !important;
                                // }
                                .slider .slides li:nth-child(1) img{
                                background-position-y: inherit !important;
                                }
                                .slides{height:inherit !important}
                                      .col-pad{
                        padding: 10px !important;
                        font-size:1em
                    }
                    
                   .pad-top{
                       padding-top:0px !important
                       padding-bottom:0px !important
                   }
                   .joinbtn{
                           padding: 0px 15px  !important;
                            font-size: 0.6em  !important;
                   }
                    }
                  
            `}
                </style>
            </div>
        );
    }
}

export default Hompage;