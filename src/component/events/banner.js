import React, { Component } from 'react';
import data from "../../data"
import FileUpload from "react-fileupload"
import apiUrl from "../../config"
import Searchbar from './searchbar';
class Banner extends Component {
    constructor(props){
        super(props);
    }
    
    searchCB(result){
        this.props.searchCB(result)
    }
    render() {
        return (
            <div className="profile-banner">
                <div className="row profile-box" >
                    <div className="col m2 s12 hide-on-small-only" style={{padding:"10px"}}>
                        <div style={{  }}>
                            <img src="./images/logoTransparent.png" alt="" width="120px" />
                        </div>

                    </div>
                    <div className="col m8 s12 white-text text-lighten-2" style={{ padding: "0px", margin: "5px", textTransform: "capitalize" }}>
                        <h4 className="" style={{margin:"10px 0px"}}>Search</h4>
                        <Searchbar searchCB={this.searchCB.bind(this)}/>
                     
                    </div>
                  
                </div>
                <style>{`
                
                     .profile-banner{
                         background:linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),#263238 url('../../images/live-concerts-events-in-bujumbura.jpg') no-repeat;
                        background-position:cover;
                        background-size:cover;
                        min-height:250px;
                        padding:20px;
                        position:relative;
                    }
                     .profile-box{
                        position:absolute;
                        bottom: 0px;
                        width:100%;
                        margin-bottom:10px;
                    }
                 
                   
                `}</style>
            </div>
        );
    }
}

export default Banner;