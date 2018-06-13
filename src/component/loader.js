import React, { Component } from 'react';
import Loader from "react-loader-spinner"

class Loading extends Component {
    render() {
        return (
            <div className="row" style={{ 
                background: "rgba(0, 0, 0, 0.5)",zIndex:"1024",
 margin: "0px", position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
                <div className="col s4 offset-s4 center-align" style={{ paddingTop: "200px" }}>
                    <Loader
                        type="Grid"
                        color="#fff"
                        height="100"
                        width="50"
                    />
                    <span className="grey-text text-lighten-2"><b>Loading</b></span>
                </div>
            </div>
        );
    }
}

export default Loading;