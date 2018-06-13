import React, { Component } from 'react';

class Banner extends Component {
    render() {
        return (
            <div className="profile-banner">
                <div className="row profile-box" >
                    <div className="col m2 12">
                        <div className="hide-on-med-and-down" style={{ position: "absolute", bottom: "0", }}>
                            <img src="../../images/logoTransparent.png" alt="" width="100px" />
                        </div>
                    </div>
                    <div className="col m8 s12 white-text text-lighten-2" style={{ padding: "0px 0px 5px", margin: "0px", textTransform: "capitalize" }}>
                        <h5>{this.props.artist.selectedIndustry}</h5>
                        {this.props.artist.selectedCategory}
                    </div>
                    <div className="col s12 m2 hide-on-med-and-down">
                        <div style={{ marginTop: "20px" }}>
                            {/* <button ref="chooseBtn" className="btn btn-default btn-sm">choose</button> */}
                            <a href="#" className="grey-text text-lighten-2" style={{ position: "absolute", bottom: "0" }}>
                                <div className="c">
                                    <div className="col" style={{ padding: "3px 4px 5px" }}>
                                        <span>{this.props.artist.views}</span>
                                    </div>
                                    <div className="col" style={{ padding: "0px 0px 5px" }}>
                                        <div>
                                            <i className="material-icons">visibility</i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;