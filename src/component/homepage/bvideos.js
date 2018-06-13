import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import data from "../../data"
class Bvideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestArtists`).then((res) => {
            if (res.data.success) {
                this.setState({ artists: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
        setTimeout(() => this.setState({ count: false }), 3000)
    }

    render() {
        return (
            <div className="grey darken-4" style={{  padding: "0px 0px 50px",borderTop:"1px solid #555",borderBottom:"1px solid #555" }}>
                <div className="" style={{ padding: "0px 100px" }}>
                    <div className="w3_agile_team_grid">
                        <div className="w3_agile_team_grid_left">
                            <p>01</p>
                            <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
                        </div>
                        <div className="w3_agile_team_grid_right">
                            <h3 className="grey-text">Most viewed <span>Video</span></h3>
                            <p>Aliquam sit amet sapien felis. Proin vel dolor sed risus maximus gravida.
						Ut suscipit orci sem, eget lobortis sem dictum eu. Etiam congue ex sed volutpat fringilla.</p>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="agileinfo_services_grids">
                        {this.state.artists.map((artist) => (
                            <div className="col-md-4 w3_agile_services_grid">
                                <div className="agile_services_grid1 wthree_services_grid1" style={{ background: `url("${artist.bgUrl||"../../images/"+data.industry[artist.industryKey].img}") no-repeat`,backgroundPosition:"center",backgroundSize:"cover" }}>
                                    <h3 className="grey text-lighten-1" style={{textTransform:"capitalize"}}className="grey-text">{artist.selectedCategory}</h3>
                                    <div className="agile_services_grid1_sub" >
                                        <p className="red darken-2">20 January 2016</p>
                                    </div>
                                    <small><h4 className="grey-text text-lighten-1" style={{ textTransform: "capitalize" }}><span></span>{artist.selectedIndustry}</h4></small>

                                </div>
                                <div className="agileits_w3layouts_services_grid1">
                                
                                    <h5 ><a href="#" data-toggle="modal" className="grey-text text-lighten-2" data-target="#myModal">{artist.firstName} {artist.lastName}</a></h5>
                                    <p>{artist.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="clearfix"> </div>
                    </div>
                </div>
                <style>{`
                .img-responsive{
                    width:100%;
                }
                `}
                </style>
            </div>
        );
    }
}

export default Bvideos;