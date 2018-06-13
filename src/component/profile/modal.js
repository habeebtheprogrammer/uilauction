import React, { Component } from 'react';
import { Row, Input, Col, ProgressBar, Button } from "react-materialize"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import classnames from "classnames"
import axios from "axios"
import Loading from "../loader"

class Cmodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organisation: "",
            email: "",
            phone: "",
            website: "",
            address: "",
            details: "",
            message: "",
            toggle: true,
            error: {},
            progress: "",
            success: "",
            id: this.props.artist._id,
        }
        this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.submitform = this.submitform.bind(this)
        this.typing = this.typing.bind(this)
    }
    typing(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitform(e) {
        e.preventDefault();
    }
    closeModal(e) {
        e.preventDefault();
        this.setState({ toggle: false })
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitform(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/contactartist`, this.state).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    setTimeout(() => window.location.reload(), 2000)
                } else {
                    console.log(res)
                }
                this.setState({ isLoading: false })
            }, 1000);

        }).catch((err) => {
            setTimeout(() => {
                this.setState({ isLoading: false, error: { server: "Please try again later. an error has occured" } })
            }, 1000);
        })
    }

    render() {
        let token = localStorage.getItem("jwToken");
      
        return (
            <div>
                {this.state.isLoading ? <Loading /> : null}

                <form style={{ padding: "30px" }} onSubmit={this.submitform}>
                    <Row>
                        <Col s={6}>
                        <label>Organisation</label>
                        <input name="organisation"  type="text" className="input" required="required" title="" />
                       </Col>
                        <Col s={6}>
                       
                        <label>Telephone</label>
                        <input name="phone" type="number" className="input" required="required" title="" />
                        </Col>
                        <Col s={12}>
                       
                        <label>Email address</label>
                        <input name="email" type="email" className="input" required="required" title="" />
                        </Col>
                        <Col s={12}>
                       
                        <label>Message</label>
                        <textarea name="message"  required="required" cols="30" rows="10"></textarea>
                        </Col>

                    </Row>
                    <Row>
                        <Col s={12}>
                        {this.state.error.server ? <p className="red-text darken-1 ">{this.state.error.server}</p> : null}
                        {this.state.success.server ? <p className="green-text darken-1 ">{this.state.success.server}</p> : null}
                        </Col>
                        <Col s={12}>
                        <button type="submit" className="btn red z-depth-0 darken-1" >Send</button>
                        </Col>
                  
                    </Row>
                </form>
                <style>{`
                        input,textarea{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                                  padding-left:10px !important;
                            box-sizing: border-box !important;
                            padding-right:10px !important;
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                        textarea{
                            height:100px !important;
                            padding:10px !important;
                            
                        }
                      label.grey-text.darken-1{
                            // padding-left:10px !important;
                        }
                `}
                </style>

            </div>
        );
    }
}

export default Cmodal;