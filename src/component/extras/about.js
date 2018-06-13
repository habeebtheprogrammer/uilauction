import React, { Component } from 'react';
import Navbar from '../navbar/index'
import Footer from '../footer/index'
class About extends Component {
    render() {
        return (
            <div className="contact-us">
                <Navbar />
                <div style={{
                    background: "#000 url('./images/j2a.jpg') no-repeat ", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", backgroundPosition: "top", height: "400px"
                }}>

                </div>
                <div className="clearfix"></div>
                <div className="container" style={{ paddingTop: "20px" }}>

                    <div className="row">
                        <div className="col-md-4">

                            <h5 className="headline margin-bottom-30">Find Us There</h5>
                            <div className="sidebar-textbox">
                                <p>
                                    No 32,along University of ilorin road (permanent site) Oke odo, Tanke Ilorin Nigeria</p>
                                <ul className="contact-details">
                                    <li><i className="material-icons">phone</i> <strong>Phone:</strong> <span>(+234) 8181362484 </span></li>
                                    <li><i className="material-icons">web</i> <strong>Web:</strong> <span><a href="#">www.bidders.herokuapp.com</a></span></li>
                                    <li><i className="material-icons">email</i> <strong>E-Mail:</strong> <span><a href="#">support@bidders.com</a></span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8">

                            <section id="contact">
                                <h5 className="headline margin-bottom-35">About Us</h5>

                                <div id="contact-message">
                                    <p>TamTamTools is a platform devoted to the support of talented and rising artists, with the goal of helping them take their career to the next level and achieve their dreams of becoming successful in their various fields.</p>
                                    <p>Founded by Gilles Van Der Linden, an international successful tenor opera singer and a team of professionals from a wide spectrum of fields, our organization is well aware of the challenges rising talents face in the real world and is dedicated to assisting them tackle such issues.</p>
                                    <p>We seek to bring together talented individuals from all over the world, share resources and provide appropriate career guidance, advice and support. Through our platform, artists can gain exposure as we tackle one of their key problems - talent awareness, by showcasing their works and consequently increasing publicity.</p>
                                    <p>Our vision of career development and advancement for artists is underscored by the regular provision of financial support for our members with the best rated profile on a monthly basis.</p>
                                    <p>We’re building a huge community and would like you to be part of it. Are you a talented singer, model, DJ, photographer, writer, make-up artist or exceptionally skilled in any field? Why don’t you come on board?</p>
                                </div>

                            </section>
                        </div>
                    </div>

                </div>
                <style>{`
                        #contact textarea {
                            min-height: 200px;
                            margin: 15px 0 25px 0;
                        }

                        #contact input {
                            margin-bottom: 25px;
                        }
                        .contact-us input, .contact-us textarea{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                        }
                        .contact-us input::placeholder{
                            padding-left:10px !important;
                        }
                        .loader { margin-left: 15px; }
                        .submit.disabled:hover,
                        .submit.disabled { background-color: #e8e8e8; color: #333; }

                        #contact input.button.submit {
                            margin-bottom: 10px;
                            line-height: 18px;
                            height: 49px;
                            transition: all 0.25s !important;
                        }


                        #contact input[type="submit"].submit:hover {
                            opacity: 0.92;
                        }

                        .contact-sent {
                            background-color: #EBF6E0;
                            color: #5f9025;
                            padding: 20px 26px;
                            margin-bottom: 30px;
                            border-radius: 3px;
                        }
                        textarea{padding:10px !important}


                        /* Office Address Box */
                        .office-address {
                            text-align: center;
                            position: relative;
                            color: #fff;
                            display: table-cell;
                            vertical-align: middle;
                            height: 100%;
                        }

                        .office-address ul {
                            list-style: none;
                            font-size: 18px;
                            padding: 0;
                            line-height: 30px;
                        }

                        .office-address h3 {
                            font-size: 28px;
                            color: #fff;
                            margin-top: 0;
                        }

                        .office-address h3:after {
                            content: "";
                            height: 2px;
                            width: 50px;
                            position: relative;
                            display: block;
                            background-color: #66676b;
                            margin: 20px auto;
                            border-radius: 2px;
                        }

                        .address-container {
                            background-color: #2b2c30;
                            background-size: 100%;
                            background-position: 50% 50%;
                            background-repeat: no-repeat;
                            background-size: cover;
                            display: table;
                            width: 100%;
                            position: relative;
                            height: 100%
                        }

                        .address-container:before {
                            content: "";
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            top:0;
                            left:0;
                            display: block;
                            background-color: #333;
                            opacity: 0.7;
                        }


                        /* Google Maps */
                        .contact-map { display: flex; }
                        .contact-map #singleListingMap-container { flex: 1; position: relative; padding-top: 0; }
                        .contact-map .address-box-container { flex: 0 auto; width: 440px; height: 450px; }
                        .contact-map #singleListingMap-container #singleListingMap { height: 100%; width: 100%; }

                        @media (min-width: 1680px) { .contact-map .address-box-container { height: 480px; } }
                        @media (max-width: 1440px) { .contact-map .address-box-container { height: 420px; } }


                        /* Contact Details */
                        .sidebar-textbox {
                            display: inline-block;
                            width: 100%;
                            padding-right: 40px;
                        }

                        .sidebar-textbox.color {
                            background-color: #666;
                            color: #fff;
                        }

                        .sidebar-textbox.color h4 {color: #fff;}
                        .sidebar-textbox h4 {
                            font-size: 16px;
                            margin: 0;
                            padding: 0;
                            margin-bottom: 16px;
                        }

                        .sidebar-textbox span { color: #666; display: inline-block; }
                        .sidebar-textbox.color span { color: #fff; }

                        .sidebar-textbox ul.contact-details {
                            list-style: none;
                            padding: 5px 0 0 0;
                        }

                        .sidebar-textbox ul.contact-details strong {
                            font-weight: 500;
                        }

                        .sidebar-textbox ul.contact-details li {
                            text-align: left;
                            padding-left: 60px;
                            position: relative;
                            width: 100%;
                            display: inline-block;
                            margin: 10px 0;
                            line-height: 24px;
                        }

                        .sidebar-textbox ul.contact-details li a { color: #66676b; }

                        .sidebar-textbox ul.contact-details li strong {
                            display: block;
                            color: #333;
                        }

                        .sidebar-textbox ul.contact-details li i {
                            height: 100%;
                            position: absolute;
                            left: 0;
                            font-size: 32px;
                            color: #333;
                            top: 10px
                        }

                `}
                </style>
                <Footer />

            </div>
        );
    }
}

export default About;
