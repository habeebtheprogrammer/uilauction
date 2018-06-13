import React, { Component } from 'react';
import {Link} from "react-router-dom"
import data  from "../../data"
import axios from "axios"
import apiUrl from "../../config"
class Recent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getNewArtists`).then((res) => {
            
            if (res.data.success) this.setState({ artists: res.data.success })
          
            
        })
    }

    render() {
        var img = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        // let collection =[];
        // collection = this.state.artists.splice(-4)
        // console.log(collection)
        return (
            <ul className="collection with-header" style={{ marginTop: "0px", border: "0px",textTransform:'capitalize' }}>
                <li className="collection-header"><h6>New Members</h6></li>
                {this.state.artists.length>0? this.state.artists.map((artist, key) => (
                    <li key={key} className="collection-item avatar">
                        <img src={`${artist.dpUrl || "../../images/user.png"}`} alt="" className="circle" />
                        <Link to={`/artist/${artist._id}`} className="title grey-text text-darken-4 truncate">{artist.firstName} {artist.lastName}</Link>
                        <p ><small ><span>Category : </span><span className="grey-text">{artist.selectedCategory}</span><br />
                            <span>Location : </span><span className="grey-text">{artist.location ? artist.location:"not available"}</span>
                        </small>
                        </p>
                    </li>
                )):null}
            </ul>
        );
    }
}

export default Recent;