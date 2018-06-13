import React, { Component } from 'react';
import { Row, Col, Input } from "react-materialize"
import classnames from "classnames"
import axios from "axios"
import apiUrl from "../../config"
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            country: "",
            nationality: "",
            vatno: "",
            phone:"",
            details: "",
            hide: "hide",
            isLoading: false,
            error: {},
            success: { server: "" },
            toggleClass: true,
            token: localStorage.getItem("jwToken")
        },

            this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.submitform = this.submitform.bind(this)

    }
    componentWillMount() {
        var token = localStorage.getItem("jwToken")
        axios.get(`${apiUrl}/api/contactform?token=${token}`).then((res) => {
            if (res.data.success) {
                this.setState({ details: res.data.success })
                // this.props.setUserProfile(res.data.success)
            
            } else console.log(res)
        })
    }
    toggleClass(e) {
        e.preventDefault();
        this.setState({ toggleClass: !this.state.toggleClass })
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitform(e) {
        e.preventDefault();
        this.setState({ isLoading: true, error: {}, success: {} })
        axios.post(`${apiUrl}/api/contactform2`, this.state).then((res) => {
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
            <ul className="collection white col s12" style={{ border: "0px", marginBottom: "0px" }} >

                <li className="collection-item avatar" style={{ paddingLeft: "20px" }}>
                    {/* <img src="./images/rockstar.jpg" alt="" className="circle" /> */}
                    <span className="title grey-text text-darken-2" style={{ fontSize: "1.3em" }}>Location
                        <a href="#" className={classnames("grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>edit</i></a>
                    </span>
                    <p className="grey-text"><small>Location allows members to find you easily</small>
                    </p>


                </li>
                <li className={classnames(this.state.toggleClass ? this.state.hide : null)}>
                    <p style={{ padding: "0px 20px" }} >
                        <form onSubmit={this.submitform}>
                            <Row>
                                <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="address" label="street-number-zip-city-country" onChange={this.typing} error={this.state.error.address ? this.state.error.address : null} type="text" ></Input>
                                {/* <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="country" label="country" onChange={this.country} error={this.state.error.country ? this.state.error.country : null} type="text" validate></Input> */}
                                <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="nationality" label="nationality" onChange={this.typing} error={this.state.error.nationality ? this.state.error.nationality : null} type="text" ></Input>
                                <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="vatno" label="vat number" onChange={this.typing} error={this.state.error.vatno ? this.state.error.vatno : null} type="number" ></Input>
                                {/* <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="dob" label="Date of Birth" onChange={this.typing} error={this.state.error.dob ? this.state.error.dob : null} type="date" ></Input> */}
                                <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="phone" label="Phone" onChange={this.typing} error={this.state.error.phone ? this.state.error.phone : null} type="number" ></Input>
                                {/* <Input m={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="vatno" label="vat number" onChange={this.typing} error={this.state.error.vatno ? this.state.error.vatno : null} type="text" validate></Input> */}
                            </Row>
                            <Row>
                                {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                                {this.state.success.server ? <p className="green-text darken-1 center-align"><small>{this.state.success.server}</small></p> : null}
                            </Row>
                            <button type="submit" className="btn red z-depth-0 darken-1" >Save</button>
                        </form>
                    </p>
                </li>
                <li className={classnames("grey-text text-darken-2")}>
                    <p style={{ padding: "0px 20px" }} >
                        <Row>
                            <Col s={6} className="mb">
                                Address<br /> <small>{this.state.details.address}</small>
                            </Col>
                            <Col s={6} className="mb">
                                 Country<br /> <small>{this.state.details.country}</small>
                            </Col>
                            <Col s={6} className="mb">
                                 Nationality<br /> <small> {this.state.details.nationality}</small>
                            </Col>
                            <Col s={6} className="mb">
                                Vat number<br /> <small>{this.state.details.vatno}</small>
                            </Col>
                            <Col s={6} className="mb">
                                Date of birth<br /> <small> {this.state.details.dob}</small>
                            </Col>
                            <Col s={6} className="mb">
                                Phone<br /> <small> {this.state.details.phone}</small>
                            </Col>
                            <Col s={6} className="mb">
                               Business or personal<br /> <small>{this.state.details.company ? "Business":"personal"}</small>
                            </Col>
                        </Row>
                    </p>
                </li>
           
                <style>{`
                   .mb{margin-bottom:20px}
                `}</style>
            </ul>
        );
    }
}

export default Location;