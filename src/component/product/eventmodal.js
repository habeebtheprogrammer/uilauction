import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Calendar from "react-calendar"
import { Input, Col, Row } from "react-materialize"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import classnames from "classnames"
import axios from "axios"
import moment from "moment"
import jwt from "jsonwebtoken"
import Loading from "../loader"
class Eventmodal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            date: new Date(),
            title: "",
            location: "",
            description: "",
            link: "",
            startTime: "",
            stopTime: "",
            error: {},
            checkedDate: "",
            events: [],
            progress: "",
            success: "",
            fileName: ""
        }
        this.onCloseModal = this.onCloseModal.bind(this)
    }



    onCloseModal = () => {
        this.setState({ open: false });
    };

    

    render() {
      
        let token = localStorage.getItem("jwToken");
        return (
            moment(this.props.event).dates() === moment(this.props.clickedDay).dates()
             ?
            <div className="eventmodal">
                <Modal open={this.props.open} onClose={()=>this.props.onClose(false)} classNames={{ modal: "custom-modal" }} little>
                    <div className="row ">
                        <div className="col s6 left-grid">
                            <iframe width="100%" frameBorder="0" style={{ border: 0 }} height="450px"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAMsF1hD4qPsu8T-vkdEss5WhkuJ7aH58o&q=${this.props.location || "paris effiel tower"}&maptype=satellite`} />
                        </div>
                        <div className="col s6 right-grid bg" style={{ padding: "30px" }}>
                         
                        </div>
                    </div>
                </Modal>
                <style>{`
                    .custom-modal{
                        padding:0px !important;
                        margin:0px !important;
                    }
                    .bg{
                    background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.5)),#263238 url('../../../images/EventsHeader.jpg') no-repeat;
                    min-height:450px !important;
                    background-size:cover;
                    }
                    .left-grid{
                    padding:0px !important;
                    }
                    .row{
                        margin:0px;
                        padding:0px;
                    }
                    .right-grid{
                         min-height:400px !important;
                    }
                    input{
                        font-size:0.8em !important;
                        padding:0px !important;
                    }
                    input::placeholder{
                        font-size:0.8em !important;
                        color:#333 !important;
                    }
                    .col.input-field{
                        padding:0px !important;
                    }
                     .border{
                // border:1px solid lightgrey !important;
                font-weight:bold;
            }
                `}
                </style>
            </div>
            :null
        );
    }
}

export default Eventmodal;