import React, { Component } from 'react';
import { Row, Col, Input } from "react-materialize"
import classnames from "classnames"
import axios from "axios"
import apiUrl from "../../config"
class Details extends Component {
    constructor(props) {
        super(props);
    }

    render() {
  
        return (
            <div>
                <ul className="collection with-header white col s12" style={{ border: "0px", marginBottom: "0px", padding: "0px", margin: "0px 0px 10px" }} >

                    <li className={classnames("grey-text text-darken-3")}>
                        <p className="col-pad" >
                            <Row>
                              
                                <Col s={6} className="mb">
                                    Telephone<br />{this.props.details.phone}
                                </Col>
                              
                                <Col s={6} className="mb">
                                    Email <br /> {this.props.details.email}
                                </Col>
                                <Col s={6} className="mb">
                                    Website  <br /> {this.props.details.website}
                                </Col>
                            </Row>
                        </p>
                    </li>
                    <style>{`
                   .mb{margin-bottom:20px}
                `}</style>
                </ul>
            </div>
        );
    }
}

export default Details;