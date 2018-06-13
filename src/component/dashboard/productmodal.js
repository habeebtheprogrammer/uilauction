import React, { Component } from 'react';
import { Row, Input, Col, Button } from "react-materialize"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import classnames from "classnames"
import Modal from 'react-responsive-modal';
class Productmodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            description: "",
            price: "",
            billing:"",
            phone:"",
            stock:"",
            email:"",
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
       
        const { title,price,description,billing,phone,stock,email} = this.state
        return (
            <div className="pmodal">
                {this.props.profile.membership === "artist" ? 
                <button className="btn small  transparent grey-text right z-depth-0" onClick={this.onOpenModal} style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Upload</button>
                :
                    <button className="btn small  transparent grey-text right z-depth-0" disabled style={{ fontSize: "0.6em", height: "20px", lineHeight: "0px", border: "1px solid lightgrey", padding: "0px 20px" }}>Upload</button>
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

                                                paramAddToField: { token: token,title:this.state.title,description:this.state.description,price:this.state.price}
                                            }}>
                                                <button ref="chooseBtn" className="grey-text grey lighten-4 center-align btn" style={{ height: "20px", textTransform: "inherit", padding: "20px 10px 100px", width: "100%", margin: "auto", border: " 2px dashed #d0d0d0" }}>
                                                    <i className="material-icons">add_circle</i><br />
                                                    Click here to upload image
                                        </button>


                                                <Input s={6}   className="grey-text darken-1 t" labelClassName="grey-text darken-1" name="title" label="title" onChange={this.typing} error={this.state.error.title ? this.state.error.title : null} type="text" validate></Input>
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
                    <div className="row">
                        <div className="col s12  white" style={{ padding: "30px" }}>
                            <form onSubmit={this.submitform}>
                                <Row >
                                    <FileUpload options={{
                                        baseUrl: `${apiUrl}/api/uploadProduct`,
                                        param: {
                                            fid: 0
                                        },
                                        chooseAndUpload: false,
                                        accept: "image/*",
                                        fileFieldName: "product",
                                        uploadSuccess: function (resp) {
                                            if (resp.error) this.setState({ error: resp.error, progress: "", fileName: "" })
                                            else window.location.reload();
                                        }.bind(this),
                                        uploadError: function (err) {
                                            this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "" })
                                        }.bind(this),
                                        chooseFile: function (files) {
                                            console.log('you choose', typeof files == 'string' ? files : files[0].name)
                                            this.setState({ fileName: files[0].name })
                                        }.bind(this),
                                        uploadFail: function (err) {
                                            console.log(err)
                                            this.setState({ error: "An error has occured, please try again later", progress: "", fileName: "" })
                                        }.bind(this),
                                        uploading: function (progress) {
                                            this.setState({ progress: progress.loaded / progress.total, error: {} })
                                            console.log("loading...", progress.loaded / progress.total, "%")
                                        }.bind(this),

                                        paramAddToField: { token: token, title, price, description, billing, phone, stock, email }
                                    }}>

                                        <Row>
                                            <Col s={6}>
                                                <label>Title  <span className="red-text">*</span> {this.state.error.title ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="title" type="text" onChange={this.typing} className="input" required="required" title="" />
                                            </Col>
                                            <Col s={6}>

                                                <label>Price (Euro)<span className="red-text">*</span>{this.state.error.price ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="price" type="number" onChange={this.typing} className="input" required="required" title="" />
                                            </Col>
                                           
                                            <Col s={6}>

                                                <label>Number of item availble <span className="red-text">*</span> {this.state.error.stock ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="stock" type="number" onChange={this.typing}  className="input" required="required" title="" />
                                            </Col>
                                            <Col s={6}>

                                                <label>Telephone <span className="red-text">*</span> {this.state.error.phone ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="phone" type="number" onChange={this.typing}  className="input" required="required" title="" />
                                            </Col>
                                            
                                            <Col s={12}>

                                                <label>Email address  <span className="red-text">*</span></label>
                                                <input name="email" type="email" onChange={this.typing}  className="input" required="required" title="" />
                                            </Col>
                                            {/* <Col s={12}>
                                                <label>Billing adress <span className="red-text">*</span> {this.state.error.billing ? <span className="red-text">This field is required</span> : null}</label>
                                                <input name="billing" type="text" onChange={this.typing}  className="input" required="required" title="" />
                                            </Col> */}
                                            
                                            <Col s={12}>

                                                <label>Description  <span className="red-text">*</span> {this.state.error.description ? <span className="red-text">This field is required</span> : null}</label>
                                                <textarea name="description" onChange={this.typing} required="required" cols="30" rows="10"></textarea>
                                            </Col>
                                            {/* <Input s={6} className="grey-text darken-1" labelClassName="grey-text darken-1" name="title" label="Title" onChange={this.typing} error={this.state.error.title ? ' ' : null} ></Input>
                                            <Input s={6} className="grey-text darken-1 " labelClassName="grey-text darken-1" name="price" label="Price" onChange={this.typing} error={this.state.error.price ? ' ' : null} type="text" validate></Input>
                                            <Input s={12} className="grey-text darken-1" labelClassName="grey-text darken-1" name="description" label="Description" onChange={this.typing} error={this.state.error.description ? " " : null} type="textarea" validate></Input> */}
                                        </Row>
                                        
                                      
                                        {/* {this.state.progress !== "" ? <ProgressBar progress={this.state.progress} /> : null} */}
                                        {/* {this.state.fileName !== "" ? <small className="grey-text">{this.state.fileName} <br /></small> :null} */}
                                         <button ref="chooseBtn" className="red lighten-1 btn z-depth-0" style={{ padding: "0px 10px",marginRight:"10px", fontSize: "0.8em" }}>
                                            upload image
                                        </button>
                                        <button ref="uploadBtn" className="btn red z-depth-0 lighten-1" disabled={this.state.fileName !== "" ? false : true} style={{ width: "100%", fontSize: "0.8em" }}>Continue</button>
                                    </FileUpload>
                                </Row>
                            </form>
                            {this.state.success ? <p className="green-text darken-1 center-align"><small>{this.state.success}</small></p> : null}
                            {this.state.error.server ? <p className="red-text darken-1 center-align"> <small>{this.state.error.server}</small></p> : null}
                        </div>
                    </div>
                </Modal>
                <style>{`
               input{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            padding-left:10px !important;
                            padding-right:10px !important;
                            box-sizing: border-box !important;
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                        textarea{
                                  border:1px solid lightgrey !important;
                            border-radius:5px !important;
                            height:130px !important;
                            padding:10px !important;
                        }
                `}
                </style>
            </div >
        );
    }
}

export default Productmodal;