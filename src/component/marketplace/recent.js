import React, { Component } from 'react';

class Recent extends Component {
    render() {
        return (
            <ul className="collection with-header" style={{ marginTop: "0px", border: "0px" }}>
                                <li className="collection-header"><h6>Marketplace</h6></li>
                                <li className="collection-item avatar">
                                    <img src="./images/coll4.jpg" alt="" className="circle" />
                                    <span className="title">Jonathan Burke Jr.</span>
                                    <p ><small ><span>Title : </span><span className="grey-text">Brand new microphone</span><br />
                                        <span>Price : </span><span className="grey-text">$500</span>
                                    </small>
                                    </p>

                                    <a href="#!" className="secondary-content"><i className="material-icons">shopping_cart</i></a>
                                </li>
                                <li className="collection-item avatar">
                                    <img src="./images/cg.jpg" alt="" className="circle" />
                                    <span className="title">Jonathan Burke Jr.</span>
                                    <p ><small ><span>Title : </span><span className="grey-text">Brand new microphone</span><br />
                                        <span>Price : </span><span className="grey-text">$500</span>
                                    </small>
                                    </p>

                                    <a href="#!" className="secondary-content"><i className="material-icons">shopping_cart</i></a>
                                </li>                    <li className="collection-item avatar">
                                    <img src="./images/cf.jpg" alt="" className="circle" />
                                    <span className="title">Jonathan Burke Jr.</span>
                                    <p ><small ><span>Title : </span><span className="grey-text">Brand new microphone</span><br />
                                        <span>Price : </span><span className="grey-text">$500</span>
                                    </small>
                                    </p>

                                    <a href="#!" className="secondary-content"><i className="material-icons">shopping_cart</i></a>
                                </li>                    <li className="collection-item avatar">
                                    <img src="./images/cd.jpg" alt="" className="circle" />
                                    <span className="title">Jonathan Burke Jr.</span>
                                    <p ><small ><span>Title : </span><span className="grey-text">Brand new microphone</span><br />
                                        <span>Price : </span><span className="grey-text">$500</span>
                                    </small>
                                    </p>

                                    <a href="#!" className="secondary-content"><i className="material-icons">shopping_cart</i></a>
                                </li>
                            </ul>
        );
    }
}

export default Recent;