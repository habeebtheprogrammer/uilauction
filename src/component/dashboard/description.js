import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
class Description extends Component {
    constructor(props){
        super(props);
        this.state = {
            desc: "",
            hide: "hide",
            toggleClass: false
        }
        this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.postDescription = this.postDescription.bind(this)
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
    postDescription(e) {
        e.preventDefault();
        var token = localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/postDescription`, { "desc": this.state.desc, "token": token }).then((res) => {
            if (res.data.desc) {
             
                let desc = res.data.desc;
                this.props.editDesc(desc)
                this.setState({ toggleClass: !this.state.toggleClass })
            }
        })
    }
    render() {
        return (
            <div>
                <ul className="collection with-header white" style={{ border: "0px", marginBottom: "12px" }}>
                    <li className="collection-header">
                        <span className="title grey-text text-darken-4" style={{ fontSize: "1.1em" }}>About me
                            <a href="#" className={classnames( "grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>edit</i></a>
                        
                            {/* <button className="btn small right transparent grey-text  z-depth-0" onClick={this.toggleClass} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Edit</button> */}
                            {/* <span className="grey-text text-darken-4 right" ><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>person</i></span> */}
                        </span><br />

                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>
                         
                          <div className={classnames(this.state.toggleClass?"hide":"show")}>
                                <article style={{whiteSpace:"pre-line"}}>{this.props.profile.desc}</article>
                            </div>
                           { this.state.toggleClass===true ? 
                           <div>
                        <textarea className={classnames()} onChange={this.typing} name="desc"  wrap="hard" ></textarea>
                             <a href="#" onClick={this.postDescription} className={classnames("grey-text text-darken-1")} className="btn red darken-1 z-depth-0" style={{textTransform:"lowercase",padding:"0px 20px",marginBottom:"20px"}}>update</a>
                      </div> :null}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Description;