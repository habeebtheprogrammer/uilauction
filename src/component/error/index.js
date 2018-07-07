import React, { Component } from 'react';
import Navbar from "../navbar/index"
import Footer from "../footer/index"
import { Icon } from 'react-materialize';
class Notfound extends Component {
    render() {
        return (
            <div>
                {/* <Navbar /> */}
                <div className="container" style={{marginTop:"100px"}}>
                    
                    <div className="row">
                        <div className="col s6 offset-s3 center-align">
                            
                            <img src="../../../images/pic_error.png" width="50%" class="img-responsive" alt="Image" />
                            <p className="grey-text">© 2018 Uilauction. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
                  <style>{`
                    body{
                        color:#f7f7f7;
                        // background:linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)),#263238 url('./images/live-concerts-events-in-bujumbura.jpg') no-repeat
                    }
                `}
                </style>
            </div>
        );
    }
}

export default Notfound;
