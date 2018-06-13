import React, { Component } from 'react';

class Searchbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:"",
            location:""
        }
    }
    typing(e){
        this.setState({[e.target.value]:e.target.name})
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: "0px",paddingBottom:"50px" }}>
                <div className="font-h2">
                    <center>
                        <h2 style={{fontFamily:"avenirBold" }}> Find Artists Connecting</h2>
                        <div style={{ fontFamily: "avenirBold" }} className="adjust-font-x1">Sharing and Waiting to be Discovered</div>
                    </center>
                </div>
                <form className="col m6 offset-m3" action={`/search?name=${this.state.name}&location=${this.state.location}`}>
                    <div className="row ">
                        <div className="input-field col s8 m7" style={{ padding: "0px" }}>
                            <input id="place" name="name" required type="text" className="grey-text " placeholder="Search" style={{ background: "#fff",  paddingLeft: "20px", paddingRight: "20px", boxSizing: "border-box" }} />
                        </div>
                        <div className="input-field col s4 m3" style={{ padding: "0px"}}>
                            <input id="city" name="location" type="text" className="grey-text" placeholder="location" style={{ background: "#fff", paddingLeft: "20px", borderLeft: "1px solid #ccc", paddingRight: "20px", boxSizing: "border-box"}}/>
                        </div>

                        <div className="col s12 m2 " style={{ padding: "0px" }}  >
                            <button className="btn red waves-effect waves-red z-dept-0" style={{ padding:"6px 20px 39px 22px",marginTop:"15px"}}><i className="material-icons">search</i></button>

                        </div>

                    </div>
                </form>
                <style>{`
                    .font-h2{
                        // padding:10px
                    }
                    .font-h2 h3{
                        marginBottom: 0px;
                        font-size: 3.2em
                }
                   .adjust-font-x1{
                       font-size: 1.5em;
                        }
                    @media (max-width: 620px) {
                        .font-h2 h3{
                        marginBottom: 0px;
                            font-size: 2.5em
                            }   
                        .adjust-font-x1{
                            font-size: 1em 
                            }
                    }
                 
                `}
                </style>
            </div>
        );
    }
}

export default Searchbar;