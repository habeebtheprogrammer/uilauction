import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"
import apiUrl from "../../config"
import jwt from "jsonwebtoken";
import Countdown from 'react-countdown-now';
import moment from "moment"
class Bestproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: "",
            empty:""
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getBestProduct`).then((res) => {
            if (res.data.success){
                this.setState({ products: res.data.success })
            } 
            else this.setState({ empty: res.data.empty })
            
        })
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    renderer({ hours, minutes, seconds, completed }) {
        if (completed) {
            // Render a completed state
            return <span className="red-text"><b>Bid Closed!</b></span>;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    render() {
        var img = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        img = img.splice(4,4);
        var usertoken = window.localStorage.getItem("jwToken");
        let memb;
        if (usertoken) memb = jwt.verify(usertoken, "h1a2b3e4e5b6");
        return (
            <ul className="collection with-header" style={{ marginTop: "0px", border: "0px",textTransform:'capitalize' }}>
                <li className="collection-header"><h6>Latest Trending</h6></li>
                {this.state.products ? this.state.products.map((item, key) => (
                    <li key={key} className="collection-item avatar">
                        <img src={`${item.imgUrl||"../../images/user.png"}`} alt="" className="circle" />
                        <a href={`/marketplace/${item._id}`} className="mtitle grey-text text-darken-4">{item.title} </a>
                        <p><small ><span>Starting at </span><span className="grey-text">N{item.price} </span><br />
                            <span className="right">  <Countdown date={Date.now(item.date) + item.duration}
                                renderer={this.renderer} /></span>
                        </small>
                        </p>
                 
                        {/* <Link to={`artists/${artist._id}`} className="secondary-content grey-text text-darken-4"><i className="material-icons">grade</i></Link> */}
                    </li>
                )):null}
                {this.state.empty?<li className="collection-item">{this.state.empty}</li>:null}
            </ul>
        );
    }
}

export default Bestproduct;