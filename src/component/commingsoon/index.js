import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import $ from "jquery"
class Commingsoon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            location: ""
        }
    }
   
    typing(e) {
        this.setState({ [e.target.value]: e.target.name })
    }

    render() {
        return (
            <div >
                <Navbar />

                <div className="row">
                    <div className="col m4 offset-m4 white-text center-align">
                        <div style={{ marginTop: "30%",marginBottom:"20%" }}>
                            {/* <img src="../../images/logoTransparent.png" width="100px" alt="" /> */}
                            {/* <h4>TAMTAMTOOLS</h4> */}
                            <p style={{ fontSize: "2em" }}>We are launching soon!</p>
                            <form className="" action={`/search?name=${this.state.name}&location=${this.state.location}`}>
                                <div className="row ">
                                    <div className="input-field col s8 m7" style={{ padding: "0px" }}>
                                        <input id="place" name="name" required type="text" className="grey-text " placeholder="Who are you looking for?" style={{ background: "#fff", paddingLeft: "20px", paddingRight: "20px", boxSizing: "border-box" }} />
                                    </div>
                                    <div className="input-field col s4 m3" style={{ padding: "0px" }}>
                                        <input id="city" name="location" type="text" className="grey-text" placeholder="location" style={{ background: "#fff", paddingLeft: "20px", borderLeft: "1px solid #ccc", paddingRight: "20px", boxSizing: "border-box" }} />
                                    </div>

                                    <div className="col s12 m2 " style={{ padding: "0px" }}  >
                                        <button className="btn red waves-effect waves-red z-dept-0" style={{ padding: "6px 20px 39px 22px", marginTop: "15px" }}><i className="material-icons">search</i></button>

                                    </div>

                                </div>
                            </form>
                            {/* <div id="countdown" class="margin-top-10 margin-bottom-35"></div>

                            <br />
                            <input type="text" className="soon white-text text-darken-1" placeholder="Your email address" style={{ padding: "0px 20px", }} />
                            <button className="btn red darken-1 btn-large" style={{ borderRadius: "30px", marginTop: "10px" }}>Notify Me</button> */}
                        </div>
                    </div>
                </div>
                <style>{`
                    body{
                         background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.1)),url('../../images/EventsHeader.jpg');
                    }
                    // body{
                    //     background:#f7f7f7;
                    // }
                    input.soon::placeholder{
                        color:#eee
                    }
                `}
                </style>
                <Footer />
            </div>
        );
    }
}

export default Commingsoon;