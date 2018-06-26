import React, { Component } from 'react';
import apiUrl from "../../config"
import axios from "axios"
import { Input, Col, Preloader } from "react-materialize"
import Select from "react-select"
class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            name: "",
            searching: false,
            result: []
        }
    }

    componentWillMount() {
        this.setState({ searching: true })
        axios.get(`${apiUrl}/api/searchitems${window.location.search}`).then((res) => {
            if (res.data.search) {
                //    this.setState({result:res.data.search});
                this.props.searchCB(res.data.search)
                this.setState({ searching: false })
            }
        });
    }

    search(e) {
        e.preventDefault();
        var obj = { name: this.state.name, location: this.state.location }

        this.setState({ searching: true })

        axios.get(`${apiUrl}/api/searchitems?name=${this.state.name}&location=${this.state.location}`).then((res) => {

            if (res.data.search) {
                //    this.setState({result:res.data.search});
                this.props.searchCB(res.data.search);
                this.setState({ searching: false })
            }
        });
    }
    typing(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value }, (state) => {
            axios.get(`${apiUrl}/api/searchitems?name=${this.state.name}&location=${this.state.location}`).then((res) => {
                if (res.data.search) {
                    //    this.setState({result:res.data.search});
                    this.props.searchCB(res.data.search)
                    this.setState({ searching: false })
                }
            });

        })
    }
    render() {

        return (
            <div>
                <form className="search hide-on-med-and-down" action={`/marketplace?name=${this.state.name}`}>
                    <div style={{ padding: "10px 0px 0px" }}>
                        <div className="row" style={{ marginBottom: "0px" }}>
                            <div className="col m4" style={{ padding: "0px" }}>
                            </div>
                            <div className="col m6" style={{ padding: "0px" }}>

                                <input type="text" onChange={this.typing.bind(this)} placeholder="Search" name="name" class="form-control" required="required" style={{ borderLeft: "1px solid #eee" }} />
                            </div>
                            {/* <div className="col s2">
                            <input type="text" placeholder="Location" name="category" class="form-control" required="required" style={{ border: "0px", marginBottom: "0px" }} />

                        </div> */}
                            <div className="col s2">
                                <button className="btn red lighten-1 waves-effect waves-red z-depth-0" style={{ height: "34px" }}><i className="material-icons" >search</i></button>
                            </div>
                        </div>
                    </div>
                    <style>{`
                   .search input{
                        height:2em !important;
                        border-bottom:0px !important;
                        border: 1px solid #ccc !important;
                        padding-left:15px !important;
                        padding-right:15px !important;
                        width:100% !important;

                        background:#fff !important;
                    }
                    .search input::placeholder{
                        font-size:0.9em;
                    }
                    
                `}
                    </style>
                </form>
                <form className="search hide-on-med-and-up" action={`/marketplace?name=${this.state.name}`}>
                    <div style={{ padding: "10px 0px 0px" }}>
                        <div className="row" style={{ marginBottom: "0px" }}>
                            <div className="col s8" style={{ paddingRight: "0px" }}>

                                <input type="text" onChange={this.typing.bind(this)} placeholder="Search" name="name" class="form-control" required="required" style={{ borderLeft: "1px solid #eee" }} />
                            </div>

                            <div className="col s2">
                                <button className="btn red lighten-1 waves-effect waves-red z-depth-0" style={{ height: "34px" }}><i className="material-icons" >search</i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Searchbar;