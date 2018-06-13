import React, { Component } from 'react';
import data from "../../data"
import FileUpload from "react-fileupload"
import Loading from "../loader"
import apiUrl from "../../config"
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:false
        }
    }
    render() {
        let token = localStorage.getItem("jwToken")
        return (
            <div className="profile-banner">
                {this.state.isLoading ? <Loading /> : null}

                <div className="row profile-box" >
                    <div className="col m2 s12 hide-on-small-only">
                        <div style={{ position: "absolute", bottom: "0px", }}>
                            <img src="./images/logoTransparent.png" alt="" width="100px" />
                        </div>

                    </div>
                    <div className="col m5 s12 white-text text-lighten-2" style={{ padding: "0px", margin: "30px 5px 5px", textTransform: "capitalize" }}>
                        <h5>{this.props.profile.selectedIndustry}</h5>
                        {this.props.profile.selectedCategory}
                    </div>
                    <div className="col m2 s12 hide-on-med-and-down">
                        <a href="#" className="grey-text text-lighten-2 right" >
                            <div className="" style={{ bottom: "0px", marginTop: "70px" }}>
                                <div className="col" style={{ padding: "3px 4px 0px" }}>
                                    <span>{this.props.profile.views}</span>
                                </div>
                                <div className="col" style={{ padding: "0px" }}>
                                    <div>
                                        <i className="material-icons">visibility</i>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col m2 s12">
                        <div style={{ marginTop: "20px", position: "absolute", bottom: "5px" }}>

                            <FileUpload options={{
                                baseUrl: `${apiUrl}/api/uploadBgPic`,
                                param: {
                                    fid: 0
                                },
                                chooseAndUpload: true,
                                accept: "image/*",
                                fileFieldName: "bgPic",
                                uploadSuccess: function (res) {
                                    if(res.error){
                                        console.log(res.error)
                                    }else{
                                        window.location.reload()
                                    }
                                },
                                uploading: function (progress) {
                                
                                this.setState({isLoading:true})
                                }.bind(this),
                                paramAddToField: { token: token }
                            }}>
                                <button ref="uploadBtn" ref="chooseAndUpload" className="btn transparent z-depth-0 lighten-2 grey-text text-lighten-2" style={{ border: "1px solid lightgrey" }}>
                                    <i className="material-icons" right>file_upload</i>
                                </button>
                            </FileUpload>
                        </div>
                    </div>
                </div>
                <style>{`
                    body{
                        background:#f7f7f7
                    }
                     .profile-banner{
                         background:linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),#263238 url('http://res.cloudinary.com/afrikal/image/upload/w_500,h_200,c_fill,g_auto/${this.props.profile.bgID}') no-repeat;
                        background-position:center;
                        background-size:cover;
                        min-height:200px;
                        padding:20px;
                        position:relative;
                    }
                     .profile-box{
                        position:absolute;
                        bottom: 0px;
                        width:100%;
                    }
                   
                `}</style>
            </div>
        );
    }
}

export default Banner;