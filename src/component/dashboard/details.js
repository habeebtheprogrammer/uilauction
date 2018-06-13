import React, { Component } from 'react';
import { Row, Col, Input } from "react-materialize"
import classnames from "classnames"
import axios from "axios"
import apiUrl from "../../config"
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organisation: "",
            email: "",
            phone: "",
            website: "",
            address: "",
            details: "",
            hide: "hide",
            isLoading: false,
            error: {},
            success: { server: "" },
            toggleClass: true,
            token: localStorage.getItem("jwToken")
        },

            this.typing = this.typing.bind(this)
        this.submitform = this.submitform.bind(this)

    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")

        if(this.props.artist._id)
        axios.get(`${apiUrl}/api/contactform2?id=${this.props.artist._id}`).then((res) => {
            if (res.data.success) {
                this.setState({ details: res.data.success })
        
            } else console.log(res)
        })
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitform(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/contactform`, this.state).then((res) => {
            setTimeout(() => {
                if (res.data.error) {
                    this.setState({ ...this.state, error: res.data.error });
                } else if (res.data.success) {
                    this.setState({ success: res.data.success });
                    setTimeout(() => window.location.reload(), 1000)
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
     
        return (
            <div>
                <ul className="collection with-header white col s12" style={{ border: "0px", marginBottom: "0px",padding:"0px", margin: "0px 0px 10px" }} >

                <li className="collection-header" >
                            <span className="title grey-text text-darken-4" style={{ fontSize: "1.1em" }}>Basic information
                            <button className="btn small right transparent grey-text  z-depth-0" onClick={()=>window.location.assign('/setting')} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Edit</button>


                            </span><br />
                            {/* <small className="grey-text">contact details </small> */}
                </li>
                <li className={classnames("grey-text text-darken-3")}>
                    <p style={{ padding: "0px 20px" }} >
                        <Row>
                            <Col s={6} className="mb">
                                    Organisation <br /> {this.state.details.organisation}
                            </Col>
                            <Col s={6} className="mb">
                                Telephone<br />{this.state.details.phone}
                            </Col>
                            <Col s={12} className="mb">
                                Contact address <br />  {this.state.details.address}
                            </Col>
                            <Col s={6} className="mb">
                                 email <br /> {this.state.details.email}
                            </Col>
                            <Col s={6} className="mb">
                                Website  <br /> {this.state.details.website}
                            </Col>
                        </Row>
                    </p>
                </li>
                <style>{`
                   .mb{margin-bottom:20px}
                `}</style>
            </ul>
            </div>
        );
    }
}

export default Details;