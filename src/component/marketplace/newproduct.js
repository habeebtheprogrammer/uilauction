import React, { Component } from 'react';
import {Link} from "react-router-dom"
import axios from "axios"
import apiUrl from "../../config"
import jwt from "jsonwebtoken";

class Newproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: "",
            empty:""
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/getNewProduct`).then((res) => {
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
    render() {
        var img = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        img = img.splice(4,4);
        var usertoken = window.localStorage.getItem("jwToken");
        let memb;
        if (usertoken) memb = jwt.verify(usertoken, "h1a2b3e4e5b6");
        return (
            <ul className="collection with-header" style={{ marginTop: "0px", border: "0px",textTransform:'capitalize' }}>
                <li className="collection-header"><h6>New Arrival</h6></li>
                {this.state.products ? this.state.products.map((item, key) => (
                    <li key={key} className="collection-item avatar">
                        <img src={`${item.imgUrl||"../../images/user.png"}`} alt="" className="circle" />
                        <a href={`/marketplace/${item._id}`} className="mtitle grey-text text-darken-4">{item.title} </a>
                        <p><small ><span>Description : </span><span className="grey-text">{this.substr(item.description, 40)} </span><br />
                            <span>Price : </span><span className="grey-text">N{memb ? item.mprice || item.price : item.nprice || item.price}</span>
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

export default Newproduct;