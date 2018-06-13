import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import moment from "moment"
import {Link} from "react-router-dom"
class Upcoming extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            twoArtists: [],
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestArtists`).then((res) => {
            if (res.data.success) {
                this.setState({ artists: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
        axios.get(`${apiUrl}/api/twoBestArtists`).then((res) => {
           
            if (res.data.success) {
              
                this.setState({ twoArtists: res.data.success, response: true })
            } else console.log(res.data)
        }).catch((err) => console.log(err));
    }
    render() {
        return (
            <div>
                <div className="row grey-text grey darken-4 bgtrans" style={{ padding: "30px 100px 50px", margin: "0px",borderTop:"1px solid #555" }}>
                    <div className="col s12 grey-text text-lighten-2 " style={{ marginBottom: "10px" }}>
                        <h5>Upcoming Artists</h5>

                    </div>
                    <div className="col s9" style={{ padding: "0px 30px 0px 10px" }}>
                        {this.state.twoArtists.map((artist,key) => (
                            <div className="row">
                                {/* <div className="divider" style={{background:"#444"}}> </div> */}
                                <div className="col s5" key={key}>
                                    <div style={{ minHeight: "200px", background: `url("${artist.dpUrl || "../../images/Designers2_1x1_1080x1080_Instagram_Optimized.jpg"}") no-repeat`, backgroundPosition: "center", backgroundSize: "100%", }}>
                                    </div>
                                </div>
                                <div className="col s7">
                                    <div className="grey-text text-lighten-1" style={{ padding: "10px 0px 0px" }}>Member since {moment(artist.date).format("LL")}</div>
                                    <h5 className="grey-text text-lighten-2" style={{ fontWeight: "bold", textTransform: "uppercase" }}> {artist.firstName}  {artist.lastName}</h5>
                                    <p className="grey-text text-lighten-2"> {artist.desc}
                                    </p>
                                    <Link to={`/artist/${artist._id}`} className="btn transparent right" style={{ border: "1px solid lightgrey", fontSize: "0.9em" }}>View Profile</Link>
                                </div>
                            </div>
                        ))}
                        {/* <div className="divider" style={{ background: "#444" }}> </div> */}
                    </div>
                    <div className="col s3">

                        {this.state.artists.map((artist) => (
                            <div className="row " style={{ padding: "10px 0px", background: "rgba(0,0,0,0.3)" }}>

                                <div className="col s4">
                                    <div style={{ minHeight: "80px", background: `url("${artist.dpUrl || "../../images/art6.jpg"}") no-repeat`, backgroundPosition: "center", backgroundSize: "cover", }}>
                                    </div>
                                </div>
                                <div className="col s8 grey-text text-lighten-2" style={{ textTransform: "capitalize" }}>
                                    {artist.firstName} {artist.lastName}<br />
                                    <span className="grey-text text-lighten-1"> {artist.desc}</span>
                                    <div><Link to={`/artist/${artist._id}`} className="grey-text text-lighten-1"><small><b>VIEW ARTIST</b></small></Link></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Upcoming;