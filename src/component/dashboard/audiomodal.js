import React, { Component } from 'react';
import { Row, Input, Col, Button } from "react-materialize"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import classnames from "classnames"
import Modal from 'react-responsive-modal';
import Loading from "../loader"
class Audiomodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: "",
            description: "",
            error: {},
            progress: "",
            success: "",
            fileName: ""
        }
        this.typing = this.typing.bind(this)
    }
    typing(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    submitform(e) {
        e.preventDefault();
    }

    onCloseModal = () => {
        this.setState({ open: false });
    };
    render() {
        let token = localStorage.getItem("jwToken");
    
        return (
            <div className="pmodal">
                {this.state.progress !== "" ? <span> <Loading /> Loading</span> : null}
                {this.props.profile.membership === "artist" ?
                    <button className="btn small  transparent grey-text right z-depth-0" onClick={this.onOpenModal} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Upload</button>
                    :
                    <button className="btn small  transparent grey-text right z-depth-0" disabled tyle={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Upload</button>
                }
                {/* <div className={classnames(this.props ? "fadeIn" : "bounceOutUp", "row animated custom-modal")}>
                        <div className="col m4 offset-m4  ">
                            <div className=" white card" style={{ marginTop: "100px" }}>
                                <div className=" lighten-2" style={{ padding: "20px 30px" }}>Upload a product
                           <a href="#" onClick={this.closeModal} className="right-align grey-text " style={{ position: "absolute", right: "40px" }}> <i className="material-icons">close</i></a>

                                </div>

                                <divider></divider>
                                <form style={{ padding: "0px 30px 20px" }} onSubmit={this.submitform}>
                                    <Row >

                                        <Col s={12} className="adjust-inline">
                                            <FileUpload options={{
                                                baseUrl: `${apiUrl}/api/uploadProduct`,
                                                param: {
                                                    fid: 0
                                                },
                                                chooseAndUpload: false,
                                                accept: "image/*",
                                                fileFieldName: "product",
                                                uploadSuccess: function (resp) {
                                                    console.log(resp)
                                                    
                                                    if (resp.error) this.setState({error:resp.error,progress:""}) 
                                                    else window.location.reload();
                                                }.bind(this),
                                                uploadError: function (err) {
                                                    console.log(err)
                                                    this.setState({ error: "An error has occured, please try again later",progress:"" }) 
                                                }.bind(this),
                                                uploadFail: function (err) {
                                                    console.log(err)
                                                    this.setState({ error: "An error has occured, please try again later", progress: "" }) 
                                                }.bind(this),
                                                uploading: function (progress) {
                                                    this.setState({ progress: progress.loaded/progress.total,error:{}})
                                                    console.log("loading...",progress.loaded/progress.total,"%")
                                                }.bind(this),

                                                paramAddToField: { token: token,name:this.state.name,description:this.state.description,price:this.state.price}
                                            }}>
                                                <button ref="chooseBtn" className="grey-text grey lighten-4 center-align btn" style={{ height: "20px", textTransform: "inherit", padding: "20px 10px 100px", width: "100%", margin: "auto", border: " 2px dashed #d0d0d0" }}>
                                                    <i className="material-icons">add_circle</i><br />
                                                    Click here to upload image
                                        </button>


                                                <Input s={6}   className="grey-text darken-1 t" labelClassName="grey-text darken-1" name="name" label="name" onChange={this.typing} error={this.state.error.name ? this.state.error.name : null} type="text" validate></Input>
                                                <Input s={6}  className="grey-text darken-1" labelClassName="grey-text darken-1" name="price" label="price" onChange={this.typing} error={this.state.error.price ? this.state.error.price : null} type="number" validate></Input>
                                                <Input s={12}  className="grey-text darken-1 " labelClassName="grey-text darken-1" name="description" label="description" onChange={this.typing} error={this.state.error.description ? " " : null} type="textarea" validate></Input>
                                                {this.state.success ? <p className="green-text darken-1 center-align"><small>{this.state.success}</small></p> : null}
                                                {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                       
                                                <Row>
                                                </Row>
                                                {this.state.progress !==""?<ProgressBar progress={this.state.progress} />:null}
                                                <button ref="uploadBtn" className="btn red z-depth-0 darken-1" style={{ borderRadius: "20px" }}>Save</button>
                                            </FileUpload>

                                        </Col>


                                    </Row>


                                </form>
                            </div>
                        </div>
                    </div> */}
                <Modal open={this.state.open} onClose={this.onCloseModal} classNames={{ modal: "custom-modal" }} little>
                    <div className="row pbg1">
                        <div className="col s5" >
                        </div>
                        <div className="col s7  white" style={{ padding: "30px" }}>
                            <form onSubmit={this.submitform}>
                                <Row >
                                    <FileUpload options={{
                                        baseUrl: `${apiUrl}/api/uploadAudio`,
                                        param: {
                                            fid: 0
                                        },
                                        chooseAndUpload: false,
                                        accept: "audio/*",
                                        fileFieldName: "audio",
                                        uploadSuccess: function (resp) {
                                            if (resp.error) this.setState({ error: resp.error, progress: "", fileName: "" })
                                            else window.location.reload();
                                        }.bind(this),
                                        uploadError: function (err) {
                                            this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "" })
                                        }.bind(this),
                                        chooseFile: function (files) {
                                            console.log('you choose', typeof files == 'string' ? files : files[0].name)
                                            this.setState({ fileName: files[0].name, error: "", success: "" })
                                        }.bind(this),
                                        uploadFail: function (err) {
                                            console.log(err)
                                            this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "" })
                                        }.bind(this),
                                        uploading: function (progress) {
                                            this.setState({ progress: progress.loaded / progress.total, error: {} })
                                            console.log("loading...", progress.loaded / progress.total, "%")
                                        }.bind(this),

                                        paramAddToField: { token: token, name: this.state.name, description: this.state.description }
                                    }}>

                                        <Row>
                                            <Col s={12}>
                                                <label>Title  <span className="red-text">*</span> {this.state.error.name ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="name" type="text" onChange={this.typing} className="input" required="required" title="" />
                                            </Col>

                                            <Col s={12}>

                                                <label>Description  <span className="red-text">*</span> {this.state.error.description ? <span className="red-text">This field is required</span> : null}</label>
                                                <textarea name="description" onChange={this.typing} required="required" cols="30" rows="10"></textarea>
                                            </Col>
                                        </Row>
                                        {/* <Input s={12} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="name" label="name" onChange={this.typing} error={this.state.error.name ? ' ' : null} type="text" validate></Input> */}
                                        {/* <Input s={12} className="grey-text darken-1 no-pad" labelClassName="grey-text darken-1" name="description" label="Description" onChange={this.typing} error={this.state.error.description ? " " : null} type="textarea" validate></Input> */}

                                        {/* {this.state.progress !== "" ? <ProgressBar progress={this.state.progress} /> : null} */}
                                        {/* {this.state.fileName !== "" ? <small className="grey-text">{this.state.fileName} <br /></small> :null} */}
                                        <button ref="chooseBtn" className="red lighten-1 btn z-depth-0" style={{ padding: "0px 10px", marginRight: "10px", fontSize: "0.8em" }}>
                                            upload audio
                                        </button>
                                        <button ref="uploadBtn" className="btn red z-depth-0 lighten-1" disabled={this.state.fileName !== "" ? false : true} style={{ width: "100%", fontSize: "0.8em" }}>Continue</button>
                                    </FileUpload>
                                </Row>
                            </form>
                            {this.state.fileName !== "" ? <small className="grey-text">You have choosen {this.state.fileName} <br /></small> : null}
                            {this.state.success ? <p className="green-text darken-1 center-align"><small>{this.state.success}</small></p> : null}
                            {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                        </div>
                    </div>
                </Modal>
                <style>{`
               
                    .row{
                        margin:0px;
                        padding:0px;
                    }
                    .custom-modal{
                        width:100% !important
                    }
                    
                `}
                </style>
            </div >
        );
    }
}

export default Audiomodal;