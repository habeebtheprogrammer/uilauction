import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
class Description extends Component {
    constructor(props){
        super(props);

    }
 
    render() {
        return (
            <div>
                <ul className="collection with-header white" style={{ border: "0px",margin:"0px 0px 10px" }}>
                    <li className="collection-header">
                        <span className="title grey-text text-darken-4" style={{ fontSize: "1.1em" }}>About me
                            <span className="grey-text text-darken-4 right" ><i className="material-icons" style={{ fontSize: "0.9em", marginRight: "10px" }}>person</i></span>
                    </span><br />
                    {/* <small className="grey-text">This will allow you to be able contact the seller </small> */}
                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>
                         
                        <div className="" >
                            <p style={{ whiteSpace: "pre-line" }}>{this.props.profile.desc}</p>
                            </div>
                     
                    </li>
                </ul>
            </div>
        );
    }
}

export default Description;