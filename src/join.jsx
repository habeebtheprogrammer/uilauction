import React, { Component } from 'react';
import { Row, Input, Col, ProgressBar, Button } from "react-materialize"
import Modal from "react-responsive-modal"
import moment from "moment"
import { Link } from "react-router-dom"
import axios from "axios"
import countries from "./component/countries"
import apiUrl from "./config.js"
class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            success: "",
            error: "",
            firstName: "",
            country:"",
            lastName: "",
            email: ""
        }
        this.typing = this.typing.bind(this)
        this.subscribe = this.subscribe.bind(this)
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    subscribe(e) {
        e.preventDefault();
        this.setState({ isLoading: true, success: "", error: "" })
        axios.post(`${apiUrl}/api/subscribe`, this.state).then((res) => {
            if (res.data.success) {
                this.setState({ success: res.data.success, isLoading: false })
                setTimeout((success) => {
                    // window.location.reload()
                }, 1000);
            }
            else this.setState({ error: res.data.error, isLoading: false })

        }).catch((err) => this.setState({ error: "An error has occured. please try again later", isLoading: false }))
    }
    componentDidMount() {
        setTimeout(() => {
            let timer = window.localStorage.getItem("timer");
            if (timer) {
                var date = new Date()
                var time2 = moment(date).minute();
                //    var initial =moment(timer).minute();
                var time1 = moment(timer).add(30, "minutes")
                if (moment(time1).isBefore(date)) {
                    window.localStorage.removeItem("timer")
                    window.localStorage.setItem("timer", date)
                    this.setState({ openModal: true })
                }
            } else {
                var date = new Date
                window.localStorage.setItem("timer", date)
                this.setState({ openModal: true })
            }
        }, 8000)

    }

    render() {
        let token = window.localStorage.getItem("jwToken");

        return (
            token ? null :
                <div>
                    <div className="eventmodal">
                        <Modal open={this.state.openModal} onClose={() => this.setState({ openModal: false })} classNames={{ modal: "join-modal" }} little>
                            <div className="row join-bg white-text" style={{ margin: "0px" }}>
                                <div className="col s12" style={{ minHeight: "400px", background: "", padding: "20px" }}>
                                    <h5 className="grey-text text-lighten-3">Subscribe to our newsletter Today</h5>
                                    <form onSubmit={this.subscribe} className="row" style={{paddingTop:"20px"}}>
                                        <Col s={6}>
                                            <label>First Name </label>
                                            <input name="firstName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label>Last Name </label>
                                            <input name="lastName" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>
                                            <label>Country</label>
                                            <input name="country" onChange={this.typing} type="text" className="input" required="required" title="" />
                                        </Col>
                                        <Col s={6}>

                                            <label for="">Email</label>
                                            <input type="email" required name="email" onChange={this.typing} className="input" id="" />
                                        </Col>
                                        <Col s={12}>
                                        {this.state.success ? <p className="green-text  lighten-1 ">{this.state.success} </p> : null}
                                        {this.state.error ? <p className="red-text lighten-1"> {this.state.error} </p> : null}
                                        <button type="submit" className="btn black z-depth-0" style={{ marginTop: "10px" }}>Subscribe</button>
                                            </Col>
                                    </form>
                                </div>
                                {/* <a href="/pricing" className="btn z-depth-0 black darken-4" style={{ position: "absolute", bottom: "0", right: "0", padding: "5px 15px", height: "inherit", marginTop: "40px" }}>Join Tamtamtools today!</a> */}
                            </div>
                        </Modal>
                    </div>
                    <style>{`
                            select{
                                display:block !important
                            }
                             .join-modal{
                                width:100% !important;
                                padding:0px !important;
                                margin:0px !important;
                            background:#fff url("../../images/Writers_Models_Style_13.jpg") no-repeat;
                                background-size:cover;
                            background-position:center;  
                            }
                            .join-bg{
                            min-height:400px !important;
                           background:rgba(133, 71, 68, 0.4)
                            }

            `}</style>
                </div>
        );
    }
}

export default Join;