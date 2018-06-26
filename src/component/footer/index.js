import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Calendar from "./calendar"
import {
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
} from 'react-share';
class Footer extends Component {
    render() {
        return (

            <div>

                <div className="footer ">
                    {/* <div style={{ borderBottom: "1px solid #333" }}>
                        <Radio />
                    </div> */}
                    <div className="row fpad" style={{ padding: "" }}>
                        <div className="col m3">
                            <div className="title">
                                Navigation
                        </div>
                            <div className="content" >
                                <p className="col  s12"><Link to="/about" > About Us </Link></p>
                                <p className="col   s12"><Link to="/contact"> Contact Us </Link></p>
                                {/* <p className="col  s12"><Link to="/our-partners"> Our Partners </Link></p> */}

                            </div>
                        </div>
                        <div className="col m3">
                            <div className="title">
                                Our Account
                        </div>
                            <div className="content" >
                                <p className="col  s12"><Link to="/privacy-policy"> Privacy Policy</Link></p>
                                <p className="col  s12"><Link to="/terms-and-condition"> Terms of use </Link></p>
                                {/* <p className="col  s12"><Link to="/audition"> Auditions TamTamTools</Link></p> */}
                            </div>
                        </div>
                        <div className="col m3">
                            <div className="title">
                                Our Support
                        </div>
                            <div className="content" >
                                <div id="google_translate_element"></div>
                                {/* <p className="col  s12"><Link to="/pricing"> Pricing </Link></p> */}

                                {/* <p className="col  s12"><Link to="/our-Team"> Our Team</Link></p> */}
                            </div>
                        </div>
                        <div className="col m2">
                            {/* <div className="title">
                                About Us
                            </div>
                            <div className="content">
                                <p>TamTamTools is a social platform for you to connect with other talented artists, get support, and take your career to the next level</p>
                                <p>
                                  
                                </p>
                            </div> */}
                        </div>
                        <div className="col m4">
                            <div className="title">
                                Contact Us
                        </div>
                            <div className="content">
                                {/* <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.</p> */}
                                <p className="grey-text text-lighten-1"> No 32,along  University of ilorin road (permanent site) Oke odo, Tanke Ilorin Nigeria</p>
                                <p style={{ color: "#eee" }}>Email: info@uilaution.com</p>
                                <p className="">
                                    <a href="https://facebook.com/uilaution" target="_blank" className="left" style={{ marginRight: "10px" }}><FacebookIcon size={32} round={true} /></a>
                                    <a href="https://twitter.com/uilaution" target="_blank" className="left" style={{ marginRight: "10px" }}><TwitterIcon size={32} round={true} /></a>
                                    <a href="https://google.com" target="_blank" className="left" style={{ marginRight: "10px" }}><GooglePlusIcon size={32} round={true} /></a>
                                    <a href="https://linkedin.com/uilaution" target="_blank" className="left" style={{ marginRight: "10px" }}><LinkedinIcon size={32} round={true} /></a>
                                </p>
                                {/* <table border="0" cellpadding="10" cellspacing="0" align="center">
                                    <tr>
                                        <td align="center"></td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onClick={() => { javascript: window.open('https://www.paypal.com/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false; }}><img src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png" border="0" alt="Now Accepting PayPal" /></a>
                                            <div style={{ textAlign: "center" }}><a href="https://www.paypal.com/webapps/mpp/how-paypal-works"><font size="2" face="Arial" color="#eee">How PayPal Works</font></a></div>
                                        </td>
                                    </tr>
                                </table> */}
                            </div>
                        </div>

                    </div>
                    <style>{`
                    .footer{
                    padding:0px 0px 80px;
                    background:#000;
                    //    background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),#263238 url('../../images/Classical_1.jpeg') no-repeat;
                        background-position:top;
                        background-size:cover;
                    }
                    
                    .footer .title{
                        color:#eee;
                        font-size:1.4em;
                        margin-bottom:10px;
                    }
                    .fpad{
                       padding: 50px 40px 0px
                    }
                    .footer .content p{
                        margin:7px 0px
                    }
                    .footer a{
                        color:#aaa;
                    }
                    .footer .content{
                        color:#aaa;

                    }
                   .footer .m3{
                        width:20% !important;
                    }
                    .footer a:hover{
                        color:#eee;
                        transition:0.2s ease-in;
                    }
                     @media (max-width: 620px) {
                    .footer .m3{
                        width:100% !important;
                    }
                    .footer{
                        padding:0px 10px 20px;
                    }
                    .content .s12{
                        padding-left:0px
                    }
                    .fpad{
                        padding:0px
                    }
                    }
                   
                `}

                    </style>
                </div>
            </div>
        );
    }
}

export default Footer;