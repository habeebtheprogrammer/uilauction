import React, { Component } from 'react';
import Footer from "../footer/index"
import Navbar from "../navbar/index"
import Loading from "../loader"
import axios from "axios"
import validator from "validator"
import apiUrl from "../../config.js"
class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            npassword:"",
            opassword:"",
            cpassword:"",
            isLoading:false,
            error:"",
            success:""
        }
        this.typing = this.typing.bind(this)
        this.reset = this.reset.bind(this)
    }
    typing(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    reset(e) {
        e.preventDefault();
        console.log(this.state.cpassword,this.state.npassword)
        if(this.state.cpassword === this.state.npassword)
        {
          this.setState({ isLoading: true, success: "", error: "" })
        axios.post(`${apiUrl}/api/resetpassword`, {...this.state,token:this.props.match.params.token}).then((res) => {
            if (res.data.success) {
                this.setState({ success: res.data.success, isLoading: false})
                setTimeout((success) => {
                    window.location.assign("/")
                }, 1000);
            }
            else this.setState({ error: res.data.error,isLoading:false })

        }).catch((err) => this.setState({ error: "An error has occured. please try again later", isLoading: false }))
    }
      else    this.setState({ success: "", error: "Password do not match" })
      
    }
    render() {
        return (
            <div>
                {this.state.isLoading?<Loading />:null}
                {/* <Navbar /> */}
                <div className="row" style={{ padding: "80px 0px 200px" }}>
                    <div className="col s12 center-align" >
                        <h5 className="pay-text">  Password reset</h5>
                    </div>
                    <div className="col m4 offset-m4 s12">
                        <form className="row" onSubmit={this.reset}>
                            <div className="col m12">
                                <label for="">New password</label>
                                <input type="password" required name="npassword" onChange={this.typing} className="input" id="" />
                            </div> 
                            <div className="col m12">
                                <label for="">Confirm password</label>
                                <input type="password" required name="cpassword" onChange={this.typing} className="input" id="" />
                            </div>
                          <div className="col s12">
                            {this.state.success ? <p className="green-text darken-1 ">{this.state.success} </p> : null}
                            {this.state.error ? <p className="red-text darken-1"> {this.state.error} </p> : null}
                            <button type="submit" className="btn grey darken-3 z-depth-0">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
         

                <style>{`
                    body{
                        // background:#eee;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                     .pay-text{
                        font-size:1.5em;
                        font-weight:800;
                    }
                     input{
                            border:1px solid lightgrey !important;
                            border-radius:5px !important;
                             padding-left:10px !important;
                            box-sizing: border-box !important;
                            padding-right:10px !important;
                        }input::placeholder{
                            padding-left:10px !important;
                        }
                      label.grey-text.darken-1{
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
                {/* <Footer /> */}
            </div>
        );
    }
}

export default Resetpassword;
