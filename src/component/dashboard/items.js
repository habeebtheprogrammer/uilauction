import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"
import apiUrl from "../../config"
class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: "",
            empty: ""
        }
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        var img = ["a6.jpg", "a9.jpg", "a10.jpg", "a5.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg", "v7.jpg"]
        img = img.splice(4, 4);
        // let collection =[];
        // collection = this.props.artists.splice(-4)
        // console.log(collection)
        return (
            <ul className="collection with-header" style={{ marginTop: "0px", border: "0px" }}>
                <li className="collection-header">marketplace</li>
                {this.props.products ? this.props.products.map((item, key) => (
                    <li key={key} className="collection-item avatar">
                        <img src={`${item.imgUrl || "../../images/user.png"}`} alt="" className="circle" />
                        <Link to={`/marketplace/${item._id}`} className=" grey-text text-darken-4" style={{ fontSize: "0.9em" }}>{this.substr(item.title,25)} </Link>
                        <Link to={`/dashboard/item/${item._id}`} className="btn small  transparent grey-text right z-depth-0"  style={{ fontSize: "0.6em", border: "1px solid lightgrey" }}>edit</Link>

                        <p>
                            <small >{this.substr(item.description,35)} </small>
                        </p>
                        <p>
                            <span className="grey-text text-darken-4">${item.price ? item.price : "not available"}</span>
                        </p>

                        {/* <Link to={`artists/${artist._id}`} className="secondary-content grey-text text-darken-4"><i className="material-icons">grade</i></Link> */}
                    </li>
                )) : null}
                {this.props.products ? null : <li className="collection-item"><small>Empty</small></li>}
            </ul>
        );
    }
}

export default Items;