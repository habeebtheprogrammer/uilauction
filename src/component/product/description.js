import React, { Component } from 'react';
import axios from "axios"
import classnames from "classnames"
import apiUrl from "../../config"
import {Link} from "react-router-dom"
import {MediaBox} from "react-materialize"
class Description extends Component {
    constructor(props){
        super(props);
        this.addtocart = this.addtocart.bind(this)
    }
 
    addtocart(e){
        e.preventDefault();
        if(window.localStorage.getItem("jwToken")){
            
        } else{
            var s = [{af:"df"}].toString()
            // window.localStorage.setItem("cart",s)
        }
    }
    render() {
        return (
            <div>
                
                <ul className="collection with-header white" style={{ border: "0px",margin:"0px 0px 10px" }}>
                 
                    <li className="collection-item " style={{ padding: "0px 20px" }}>
                        <div className="row">
                            <div className="col m4 offset-m4 s12" style={{paddingTop:"10px"}}>
                                <MediaBox src={this.props.product.imgUrl}  caption={this.props.product.title} width="100%" />
                            </div>
                            {/* <div className="col s6" style={{ paddingTop: "10px" }}>
                                <MediaBox src={this.props.product.imgUrl} caption={this.props.product.title} width="100%" />
                            </div> */}
                          
                        </div>
                    </li>
                </ul>
                <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                    <li className="collection-header no-padxs" ><h6 >Description  </h6>
                    </li>
                    <li className="collection-item col-pad" style={{  }}>
                        <div className="row">
                            <div className="col s12" style={{ padding: "20px 10px"}}>
                              
                                <span style={{ whiteSpace: "pre-line" }}>{this.props.product.description}</span>

                            </div>
                        </div>
                    </li>
                </ul>
                {/* <ul className="collection with-header white" style={{ border: "0px", margin: "0px 0px 10px" }}>
                    <li className="collection-header no-padxs" ><h6 >Shipping Fees  </h6>
                    </li>
                    <li className="collection-item col-pad" style={{}}>
                        <div className="row">
                            <div className="col s12" style={{ padding: "20px 10px" }}>
                                {this.props.product.sfee !== 0? <div>National (<b>€{this.props.product.sfee}</b>)</div>:null}
                                {this.props.product.sfee2 !== 0? <p>International (<b>€{this.props.product.sfee2}</b>)</p> :null}
                                <span style={{ whiteSpace: "pre-line" }}>{this.props.product.sdescription}</span>
                            </div>
                        </div>
                    </li>
                </ul> */}
            </div>
        );
    }
}

export default Description;