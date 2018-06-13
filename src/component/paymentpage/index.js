import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import Payment from "../pay"
import $ from "jquery"
class Paymentpage extends Component {
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
        var amount;
        if (this.props.membership === "artist") amount = 78
        if(this.props.membership ==="supporters") amount = 48
        return (
            <div >
                <Navbar />

                <div className="row">
                    <div className="col m4 offset-m4 white-text center-align">
                        <div style={{ marginTop: "30%", marginBottom: "20%" }}>
                            {/* <img src="../../images/logoTransparent.png" width="100px" alt="" /> */}
                            {/* <h4>TAMTAMTOOLS</h4> */}
                            <p ><i className="material-icons" style={{ fontSize: "4em" }}>lock_outline</i></p>
                            <form className="" action={`/search?name=${this.state.name}&location=${this.state.location}`}>
                                <div className="row ">

                                    <div className="col s12  " style={{ padding: "0px" }}  >
                                        <h5 className="pay-text"> Pay a €{amount} {this.props.membership} membership fee to unlock your dashboard</h5>
                                    </div>
                                    <div className="col s12  " style={{ padding: "0px" }}  >
                                        <Payment {...this.props} />
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
                    .pay-text{
                        font-size:1.7em;
                        margin-bottom:20px
                    }
                `}
                </style>
                <Footer />
            </div>
        );
    }
}

export default Paymentpage;