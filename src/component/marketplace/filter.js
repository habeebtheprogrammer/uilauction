import React, { Component } from 'react';
import data from "../../data"
import apiUrl from "../../config"
import axios from "axios"
class Filter extends Component {
    constructor(props){
        super(props);
        this.state={
            orderby:"",
            distance:"",
            category:""
        }
        this.filter.bind(this)
        this.update.bind(this)
        this.updateCat.bind(this)
    }
    distanceBar(e){
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }
    update(value){
        this.setState({orderby:value},(state)=>{
            this.filter()
        })
    }
    updateCat(value) {
        this.setState({ category: value }, (state) => {
            this.filter()
        })
    }
    filter(){
        // e.preventDefault();
        // this.setState({ searching: true })
         window.location.search ===""?
             axios.get(`${apiUrl}/api/filteritems?orderby=${this.state.orderby}&distance=${this.state.distance}&category=${this.state.category}`).then((res) => {
                 if (res.data.search) {
                   
                     //    this.setState({result:res.data.search});
                     this.props.searchCB(res.data.search)
                     // this.setState({ searching: false })
                 } else console.log(res)
             })
        :
        axios.get(`${apiUrl}/api/searchitems${window.location.search}&orderby=${this.state.orderby}&distance=${this.state.distance}&category=${this.state.category}`).then((res) => {
            if (res.data.search) {
             
                //    this.setState({result:res.data.search});
                this.props.searchCB(res.data.search)
                // this.setState({ searching: false })
            }else console.log(res)
        });
        // window.location.assign(`/api/search${window.location.search}&orderby=${this.state.order}`)
    }
    // distance(){
    //     window.location.assign(`${apiUrl}/api/search${window.location.search}&distance=${this.state.distance}`)
    // }
    // category(){
    //     window.location.assign(`${apiUrl}/api/search${window.location.search}&category=${this.state.category}`)
    // }
    render() {
    
        return (
            <div>
                <div className="right" style={{ position: "relative", padding: "1px 10px 0px", display: "inline-block" }}>
                    <div className="filter-toggle-button " style={{ position: "relative", float: "left" }}>
                        <div className=""> <b>Default order </b>
                            <div className="" style={{ marginLeft: "10px", position: "relative", float: "right" }}>
                                <span><i className="material-icons grey-text text-lighten-0" >list</i></span>
                            </div></div>
                        <div className="card filter-toggle-div left-align">
                            {/* <p onClick={(e)=>this.update("rating")}>Highest rated</p> */}
                            <p onClick={(e) => this.update("viewed")}> Most reviewed</p>
                            <p onClick={(e) => this.update("newest")}>Newest member</p>
                            <p onClick={(e) => this.update("oldest")}>Oldest member</p>
                        </div>
                    </div>
                </div>
                <div className="right" style={{ position: "relative", padding: "1px 10px 0px", display: "inline-block" }}>
                    <div className="filter-toggle-button" style={{ position: "relative", float: "left" }}>
                        {/* <div className=""> <b>Distance</b>
                            <div className="" style={{ position: "relative", marginLeft: "10px", float: "right" }}>
                                <span><i className="material-icons grey-text text-lighten-0" >my_location</i></span>
                            </div></div> */}
                        <div className="card filter-toggle-div left-align">
                            <small>Radius around selected destination (km)</small>
                            <p className="range-field right-align ">
                                <input type="range" min="0" max="100" name="distance" onChange={this.distanceBar.bind(this)} />
                                <small><a href={`/search?distance=${this.state.distance}`}className="dark-text">apply</a></small>
                            </p>
                        </div>
                    </div>

                </div>
                <div className="right" style={{ position: "relative", padding: "1px 10px 0px", display: "inline-block" }}>
                    <div className="filter-toggle-button" style={{ position: "relative", float: "left" }}>
                        <div className=""> <b>Category</b>
                            <div className="" style={{ position: "relative", float: "right" }}>
                                <span><i className="material-icons  grey-text text-lighten-0" >view_list</i></span>
                            </div></div>
                        <div className="card last filter-toggle-div left-align" style={{ height: "200px", overflow: "auto" }}>
                            {data.industry.map((industry, key) => (
                                <p key={key} onClick={(e) => this.updateCat(industry.title)}>{industry.title}</p>
                            ))}

                        </div>
                    </div>

                </div>
                <style>{`
                     .last.filter-toggle-div{
                         left:-100px;
                         transition:0.3s ease-in;
                     }
                    //  .filter-toggle-div p{
                    //      cursor:pointer
                    //  }
                     .filter-toggle-div p:hover{
                        color:darkred;
                        transition:0.3s ease-in;
                     }
                     .filter-toggle-div:before{
                         content:"";
                         position:absolute;
                         border-style:solid;
                         border-color:transparent transparent white transparent;
                         border-width:10px;
                         top:-20px;
                     }
                       .filter-toggle-div{
                         position:absolute;
                         width:200px;
                         top:15px;
                         background:#fff;
                         padding: 0px 20px;
                         display:none;
                         z-index:2;
                         transition:0.3s ease-in;
                     }
                  
                    .filter-toggle-button:hover > .filter-toggle-div{
                        display:block;
                        transition:0.3s ease-in;
                    }
                    .filter-toggle-button{
                        cursor:pointer
                    }
                `} </style>
            </div>
        );
    }
}

export default Filter;