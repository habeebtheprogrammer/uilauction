import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
import { Link } from "react-router-dom"
import moment from "moment"
import FileUpload from "react-fileupload"
import Loading from "../loader"
class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bio: "",
            hide: "hide",
            toggleClass: true,
            isLoading:false,
            success:"",
            error:""
        }
        this.postBio = this.postBio.bind(this)
        this.typing = this.typing.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
    }
    componentWillMount() {
        this.setState({ bio: this.props.profile.bio })
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toggleClass(e) {
        this.setState({ toggleClass: !this.state.toggleClass })
    }
    postBio(e) {
        e.preventDefault();
        let token = localStorage.getItem("jwToken")
        axios.post(`${apiUrl}/api/postBio`, { "bio": this.state.bio, "token": token }).then((res) => {
            if (res.data.bio) {
                let bio = res.data.bio;
                this.props.editBio(bio)
                this.setState({ toggleClass: !this.state.toggleClass })
            }
        })

    }
    render() {
        let token = localStorage.getItem("jwToken")
      
        return (
            <div>
                <ul className="collection white" style={{ border: "0px", padding: "20px 20px", marginTop: "0px", marginBottom: "12px" }}>
                    <div className=" center-align" >
                        {/* <img src="./images/v6.jpg" className="circle" alt="" width="130px" /> */}
                        <FileUpload options={{
                            baseUrl: `${apiUrl}/api/uploadDp`,
                            param: {
                                fid: 0
                            },
                            chooseAndUpload: true,
                            accept: "image/*",
                            fileFieldName: "dp",
                            uploadSuccess: function (res) {
                                if(res.error){
                                  
                                    setTimeout(() => {
                                        this.setState({ error: "Error uploading file", isLoading: false, })
                                        
                                    }, 2000);
                                }
                                else{
                                    this.setState({ isLoading: false,success:"Uploaded successfully" })
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                   

                                }
                                
                            }.bind(this),
                            chooseFile: function (files) {
                                this.setState({ isLoading:true, success: "", error: "" })
                            }.bind(this),
                            uploadFail: function (err) {
                                this.setState({ isLoading: false, success:"", error: "Please try again late" })
                                console.log(err)
                            }.bind(this),
                            uploadError: function (err) {
                                this.setState({ error: " please try again later",isLoading:false})
                            }.bind(this),
                            uploading: function (progress) {
                                this.setState({success:"",error:"",isLoading:true})
                            }.bind(this),
                            paramAddToField: { token: token }
                        }}>
                            {/* <button ref="chooseBtn" className="btn btn-default btn-sm">choose</button> */}
                            <button ref="uploadBtn" ref="chooseAndUpload" className="btn grey z-depth-0 lighten-2 profile-pic" style={{}}>
                                <i className="material-icons">camera_alt</i>
                            </button>
                        </FileUpload>
                    </div>
                    <p className="center-align custom-title" ><b>{this.props.profile.username}</b></p>
                    {this.state.success ? <p className="green-text darken-1  center-align"> <small>{this.state.success} </small></p> : null}
                    {this.state.error ? <p className="red-text darken-1 center-align"> <small> {this.state.error} </small></p> : null}
                    <div className="grey-text center-align grey-text text-darken-1">
                        <span className={classnames(this.state.toggleClass ? null : this.state.hide)}>
                            {this.props.profile.bio}
                        </span>
                        <input className={classnames(this.state.toggleClass ? this.state.hide : null)} onChange={this.typing} name="bio" placeholder="" />
                        <a href="#" className={classnames(this.state.toggleClass&&window.location.pathname==="/setting" ? null : this.state.hide, "grey-text text-darken-1")} onClick={this.toggleClass}><i className="material-icons" style={{ fontSize: "1em", marginRight: "10px" }}>edit</i></a>
                        {this.state.toggleClass ? null : <a href="#" className={classnames("grey-text text-darken-1")} className="" onClick={this.postBio}><i className="material-icons" style={{ fontSize: "1em", marginRight: "10px" }}>send</i></a>}
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        {window.location.pathname === "/setting" ?
                            <Link to="/dashboard" style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white  z-depth-0 grey-text text-darken-3">Dashboard</Link>

                            :this.props.profile.membership === "artist"
                                ? <Link to="/setting" style={{ border: "1px solid lightgrey", width: "100%", textTransform: "capitalize" }} className="btn white  z-depth-0 grey-text text-darken-3">Edit Profile</Link>
                            :null
                            
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
                    {this.state.isLoading ? <Loading /> : null}

                </ul>
                <style>{`
            .profile-pic
            {
                background: #eee url('http://res.cloudinary.com/afrikal/image/upload/w_300,h_300,c_fill,g_auto/${this.props.profile.dpID}') no-repeat;
                background-size: contain;
                padding: 40px 70px 80px 50px;
                background-position:center;
                border-radius: 100%;
                width: 100px
            }
            small{
                font-size:0.8em !important;
            }
            `}
                </style>
            </div >
        );
    }
}

export default Contact;