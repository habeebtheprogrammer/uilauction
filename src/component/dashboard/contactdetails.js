import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
class Contactdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            hide: "hide",
            telephone:"",
            toggleClass: true
        }
        this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.postContact = this.postContact.bind(this)
    }
    componentWillMount() {
        this.setState({ desc: this.props.profile.desc })
    }
    typing(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleClass(e) {
        e.preventDefault();
        this.setState({ toggleClass: !this.state.toggleClass })
    }
    postContact(e) {
        e.preventDefault();
        var token = localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/postContact`, { "desc": this.state.desc,"phone":this.state.telephone, "token": token }).then((res) => {
            if (res.data.desc) {
              
                let desc = res.data.desc;
                this.props.editContact(desc)
                this.setState({ toggleClass: !this.state.toggleClass })
            }
        })
    }
    render() {
        return (
            <div>
                <ul className="collection with-header white" style={{ border: "0px" }}>
                    <li className="collection-header">

                    <h6>Contact form
                     <a href="#" onClick={this.toggleClass} className="right grey-text text-darken-2"><small>Edit form</small></a></h6>

                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>

                        <div className={classnames(this.state.toggleClass ? null : this.state.hide)} >
                            {/* <div className="c ">
                             
                                <div className="col" style={{ padding: "0px" }}>
                                    <div>
                                        <i className="material-icons">contact_phone</i>
                                    </div>
                                </div>
                                <div className="col" style={{ padding: "3px 4px 0px" }}>
                                    <span>3</span>
                                </div>
                            </div> */}
                            <p >
                                TELEPHONE
                            : {this.props.profile.desc}
                            </p>
                            <p>CONTACT: {this.props.profile.desc}</p>
                        </div>
                        <input className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="desc" placeholder="" />
                        {/* <a href="#" className={classnames(this.state.toggleClass ? null : this.state.hide, "grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>edit</i></a> */}
                        {this.state.toggleClass ? null : <a href="#" onClick={this.postContact} className={classnames("grey-text text-darken-1")} className="btn red darken-1 z-depth-0" style={{ textTransform: "lowercase", padding: "0px 20px", marginBottom: "20px" }}>send</a>}
                        {/* <p className="grey-text"><small >{this.props.profile.desc}<br />
                        </small>
                        </p> */}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Contactdetails;