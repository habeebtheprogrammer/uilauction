import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
import moment from "moment"
import { Link } from "react-router-dom"
import FileUpload from "react-fileupload"
import Modal from "react-responsive-modal"
import Cmodal from "./modal"
import Loading from "../loader"
class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            isLoading:false

        }
        this.onClose = this.onClose.bind(this)

    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    onClose(bool) {
        this.setState({ openModal: bool })
    }
    render() {
        console.log(this.props.match)
        return (
            <div className="contact">
                <Modal open={this.state.openModal} onClose={() => this.setState({ openModal: false })} classNames={{ modal: "custom-modal" }} little>
                    <Cmodal artist={this.props.profile} />
                </Modal>
                <ul className="collection white" style={{ border: "0px", padding: "20px 20px", marginTop: "0px" }}>
                    <div className=" center-align" ><center>
                        <div className="profile-pic">
                        </div></center>
                    </div>
                    <p className="center-align custom-title" ><b>{this.props.profile.username}</b></p>
                    <div className="grey-text center-align grey-text text-darken-4">
                        {this.substr(this.props.profile.bio, 80)}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {this.props.match.path ==="/about/:id"?
                            <a href="#" onClick={() => this.setState({ openModal: true })} style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white z-depth-0 grey-text text-darken-4">Contact Artist</a>
                        :
                            <Link to={`/about/${this.props.profile._id}`} style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white z-depth-0 grey-text text-darken-4">About</Link>
                        
        }
                    </div>
                    <div className="row  grey-text text-darken-4" style={{ fontSize: "0.9em", margin: "0px" }}>

                    </div>
                    <div className="row  grey-text text-darken-4" style={{ fontSize: "0.9em", margin: "0px" }}>
                        <div className="col s1 " style={{ paddingLeft: "0px" }}>
                            <i className="material-icons" style={{ fontSize: "1.3em", }}>place</i>

                        </div>
                        <div className="col s3 " style={{ paddingLeft: "0px" }}>
                            <span>location</span>
                        </div>
                        <div className="col s8 right-align" style={{ paddingRight: "0px" }}>

                            {this.props.profile.country}
                        </div>
                    </div>
                    <div className="row  grey-text text-darken-3" style={{ fontSize: "0.9em", margin: "0px" }}>
                        <div className="col s1 " style={{ paddingLeft: "0px" }}>
                            <i className="material-icons" style={{ fontSize: "1.3em", }}>group</i>

                        </div>
                        <div className="col s3 " style={{ paddingLeft: "0px" }}>
                            <span>membership</span>
                        </div>
                        <div className="col s8 right-align" style={{ paddingRight: "0px" }}>

                            {this.props.profile.membership}
                        </div>
                    </div>

                    <div className="row  grey-text text-darken-3" style={{ fontSize: "0.9em", margin: "0px" }}>
                        <div className="col s1 " style={{ paddingLeft: "0px" }}>
                            <i className="material-icons" style={{ fontSize: "1.3em", }}>event</i>

                        </div>
                        <div className="col s5 " style={{ paddingLeft: "0px" }}>

                            <span>Member since</span>
                        </div>
                        <div className="col s6 right-align" style={{ paddingRight: "0px" }}>
                            <span>{this.props.profile.date ? moment(this.props.profile.date).format("LL") : "Not available"}</span>
                        </div>
                    </div>
                    <div className="row  grey-text text-darken-3" style={{ fontSize: "0.9em", margin: "0px" }}>
                        <div className="col s1 " style={{ paddingLeft: "0px" }}>
                            <i className="material-icons" style={{ fontSize: "1.3em", marginRight: "10px" }}>visibility</i>

                        </div>
                        <div className="col s3 " style={{ paddingLeft: "0px" }}>

                            <span>views</span>
                        </div>
                        <div className="col s8 right-align" style={{ paddingRight: "0px" }}>
                            <span>{this.props.profile.views ? this.props.profile.views : "Not available"}</span>
                        </div>
                    </div>

                </ul>
                <style>{`
           .contact .profile-pic
            {
                background: #eee url('${this.props.profile.dpUrl || "../../images/user.png"}') no-repeat;
                background-size: contain;                background-position:center;


                padding: 60px;
                border-radius: 100%;
                width: 100px
            }
              
                 .contact    .custom-title{
                        font-size:1.4em;
                        margin:5px 0px 0px;
                    }
                       textarea{
                                  border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            height:130px !important;
                            padding:10px !important;
                        }
                          input{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                            padding-right:10px !important;
                            box-sizing: border-box !important;
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                  
            `}
                </style>
            </div>
        );
    }
}

export default Contact;