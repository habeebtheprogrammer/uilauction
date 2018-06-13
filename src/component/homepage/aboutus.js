import React, { Component } from 'react';
import { Link } from "react-router-dom"
class Aboutus extends Component {
    render() {
        return (
            <div className="about-us center-align ">
                <div className="row">
                    <div className="col m3" style={{ padding: "0px" }}>
                        

                    </div>
                    <div className="col m6">
                        <p className="title" style={{fontFamily:"coco"}}> AbOUT <span style={{ color: "#e53935" }}>US</span></p>
                        <p className="subtitle">
                            Tamtamtools brings together artists, artistes and their seekers around the world on a single user-friendly online platform, and provides visibility & exposure to the artists and identification & evaluation tools to the seekers.
                        <br />
                            <Link to="/register" className="waves-effect waves-red btn transparent" style={{ marginTop: "20px", border: "2px solid #eee" }}> Register</Link>

                        </p>
                    </div>
                    <div className="col m3">
                    </div>
                </div>
                
                <style>{`
                    .about-us{
                        padding:50px 0px;
                        color:#eee;
                        background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),#263238 url('./images/7.jpg');
                        background-size:100%;
                    }
                    .about-us .title{
                        font-size:2em;
                        text-transform :uppercase
                    }
                    .about-us .subtitle{
                        font-size:1.1em
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Aboutus;