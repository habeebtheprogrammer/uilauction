import React, { Component } from 'react';
import axios from "axios"
import apiUrl from "../../config"
import moment from "moment"
import { Link } from "react-router-dom"
class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
        }
    }
    componentWillMount() {
        axios.get(`${apiUrl}/api/eightPictures`).then((res) => {
          
            if (res.data.success) {
                this.setState({ pictures: res.data.success })
            }
            else this.setState({ empty: res.data.empty })

        })
        setTimeout(() => this.setState({ count: false }), 3000)
    }
    substr(text, length) {
        if (text.length > length) {

            return text.substr(0, length) + "..."
        }
        else return text
    }
    render() {
        return (
            <div className="">
                <center>
                    {/* <h5 style={{ fontFamily: "avenirBold", padding: "20px 0px" }}>RECENT PICTURES</h5> */}
                </center>

                <div className="row">
                    {this.state.pictures.map((picture) => (

                        <div className="col s3">
                            <Link to={`artist/${picture.userID}`} className="grey-text text-darken-3">
                                <div className="card z-depth-0 hoverable white" style={{ border: "1px solid lightgrey", textTransform: "capitalize" }}>
                                    <div className="" style={{
                                        background: `linear-gradient(rgba(132, 84, 34, 0.2),rgba(132, 84, 34, 0.2)),#000 url('${picture.imgUrl || "../../images/funky6.jpg"}') no-repeat `, backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover", backgroundPosition: "center", height: "170px"
                                    }}>

                                    </div>
                                </div>
                            </Link>
                        <div className="center-align">{picture.description}</div>
                        </div>
                    ))}

                </div>

            </div>
        );
    }
}

export default Pictures;