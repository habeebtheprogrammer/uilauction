import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import Loading from "../loader"
import apiUrl from "../../config"
class Youtube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtubelink: "",
            title:"",
            description:"",
            hide: "hide",
            toggleClass: true,
            isLoading:false
        }
        this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.postlink = this.postlink.bind(this)
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
    postlink(e) {
        e.preventDefault();
        var token = localStorage.getItem("jwToken")
        var u = new URL(this.state.youtubelink)
        let qlink = new URLSearchParams(u.search)
        let url = qlink.get("v")
       
        this.setState({isLoading:true})
        axios.post(`${apiUrl}/api/youtubelink`, { "youtubelink": url,title:this.state.title, description:this.state.description, "token": token }).then((res) => {
            if (res.data.success) {
                window.location.reload()

                // this.setState({ toggleClass: !this.state.toggleClass })
            }

        })
    }
    render() {
        return (
            <div>
                {this.state.isLoading?<Loading />:null}
                <ul className="collection with-header white" style={{ border: "0px",marginBottom:"10px" }}>
                    <li className="collection-header">
                        <span className="title grey-text text-darken-4" style={{ fontSize: "1em" }}>youtube
                           {this.props.profile.membership === "artist"? <button className="btn small right transparent grey-text  z-depth-0" onClick={this.toggleClass} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>upload</button>
                                : <button className="btn small right transparent grey-text  z-depth-0" disabled style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>upload</button>}
                        </span><br />
                        {/* <small className="grey-text" onClick={this.toggleClass} style={{ cursor: "pointer" }}>Click here to edit</small> */}
                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>
                        <form onSubmit={this.postlink}>
                        <input placeholder="title"  required className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="title" />
                            <input placeholder="youtube link" required className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="youtubelink"/>
                            <textarea placeholder="description" required className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="description"></textarea>
                        {/* <a href="#" className={classnames(this.state.toggleClass ? null : this.state.hide, "grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>edit</i></a> */}
                        {this.state.toggleClass ? null : <button type="submit" className="btn red darken-1 z-depth-0" style={{ textTransform: "lowercase", padding: "0px 20px", marginBottom: "20px" }}>upload</button>}
                        {/* <p className="grey-text"><small >{this.props.profile.desc}<br />
                        </small>
                        </p> */}
                        </form>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Youtube;