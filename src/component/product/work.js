import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
class Work extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <ul className="collection with-header white" style={{ border: "0px" }}>
                    <li className="collection-header"><h6>Work Experience </h6>

                    </li>
                    <li className="collection-item " style={{ padding: "0px 20px" }}>

                        <div className="">
                            <p style={{ fontSize: "0.8em" }}>{this.props.profile.workExp}</p>
                        </div>
                        {/* <p className="grey-text"><small >{this.props.profile.desc}<br />
                        </small>
                        </p> */}
                    </li>
                </ul>
            </div>
        );
    }
}

export default Work;