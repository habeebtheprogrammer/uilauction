import React, { Component } from 'react';
import Footer from "../footer/index"
import Navbar from "../navbar/index"
import Loading from "../loader"
import axios from "axios"
import apiUrl from "../../config.js"
class Password extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
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
        this.setState({ isLoading: true,success:"",error:"" })
        axios.post(`${apiUrl}/api/reset`, this.state).then((res) => {
            if (res.data.success) {
                this.setState({ success: res.data.success, isLoading: false})
                setTimeout((success) => {
                    window.location.reload()
                }, 1000);
            }
            else this.setState({ error: res.data.error,isLoading:false })

        }).catch((err) => this.setState({ error: "An error has occured. please try again later", isLoading: false }))
    }
    render() {
        return (
            <div style={{ padding: "100px 10px " }}>
                {this.state.isLoading?<Loading />:null}
                {/* <Navbar /> */}
                <div className="row" >
                  
                    <div className="col m4  offset-m4 s12" style={{padding:"50px 10px"}}>
                    <div className="center-align" >
                        <h5 className="pay-text">  Password reset</h5>
                    </div>
                        <form onSubmit={this.reset}>
                            <label for="">Email</label>
                            <input type="email" required name="email" onChange={this.typing} className="input" id="" />
                            {this.state.success ? <p className="green-text darken-1 ">{this.state.success} </p> : null}
                            {this.state.error ? <p className="red-text darken-1"> {this.state.error} </p> : null}
                           <center> <button type="submit" className="btn grey darken-3 z-depth-0">Reset</button></center>
                        </form>
                    </div>
                </div>
         

                <style>{`
                    body{
                        background:#f7f7f7;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                     .pay-text{
                        font-size:1.5em;
                        font-weight:800;
                    }
                    .row{
                        margin:0px !important;
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

export default Password;
