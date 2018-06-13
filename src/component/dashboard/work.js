import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workExp: "",
            hide: "hide",
            toggleClass: true
        }
        this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.postWorkExp = this.postWorkExp.bind(this)
    }
    componentWillMount() {
        this.setState({ workExp: this.props.profile.workExp })
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
    postWorkExp(e) {
        e.preventDefault();
        var token = localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/postWorkExp`, { "workExp": this.state.workExp, "token": token }).then((res) => {
            if (res.data.workExp) {
              
                let workExp = res.data.workExp;
                this.props.editWorkExp(workExp)
                this.setState({ toggleClass: !this.state.toggleClass })
            }
        })
    }
    render() {
        return (
            <div>
                <ul className="collection with-header white" style={{ border: "0px",marginBottom:"10px" }}>
                    <li className="collection-header">
                        <span className="title grey-text text-darken-4" style={{ fontSize: "1.1em" }}>Resume
                            <button className="btn small right transparent grey-text  z-depth-0" onClick={this.toggleClass} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Edit</button>
                        </span><br /><small className="grey-text" onClick={this.toggleClass} style={{ cursor: "pointer" }}>Click here to edit</small>
                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>

                        <div className={classnames(this.state.toggleClass ? null : this.state.hide)}>
                            <p style={{fontSize:"0.8em"}}>{this.props.profile.workExp}</p>
                        </div>
                        <input className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="workExp" placeholder="" />
                        {/* <a href="#" className={classnames(this.state.toggleClass ? null : this.state.hide, "grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>edit</i></a> */}
                        {this.state.toggleClass ? null : <a href="#" onClick={this.postWorkExp} className={classnames("grey-text text-darken-1")} className="btn red darken-1 z-depth-0" style={{ textTransform: "lowercase", padding: "0px 20px", marginBottom: "20px" }}>send</a>}
                        {/* <p className="grey-text"><small >{this.props.profile.desc}<br />
                        </small>
                        </p> */}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Work;