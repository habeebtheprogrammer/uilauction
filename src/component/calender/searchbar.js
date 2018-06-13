import React, { Component } from 'react';

class Searchbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:"",
            location:""
        }
    }
    typing(e){
        this.setState({[e.target.value]:e.target.name})
    }

    render() {
        return (
            <div className="row" >
              
                <form className="col s12" action={`/events?name=${this.state.name}&location=${this.state.location}`}>
                    <div className="row ">
                        <div className="input-field col s8 m7" style={{ padding: "0px" }}>
                            <input id="place" name="name" required type="text" className="grey-text " placeholder="Search" style={{ background: "#fff", paddingLeft: "20px", paddingRight: "20px", boxSizing: "border-box" }} />
                        </div>
                        <div className="input-field col s4 m3" style={{ padding: "0px" }}>
                            <input id="city" name="location" type="text" className="grey-text" placeholder="location" style={{ background: "#fff", paddingLeft: "20px", borderLeft: "1px solid #ccc", paddingRight: "20px", boxSizing: "border-box" }} />
                        </div>
                        <div className="col s12 m2 " style={{ padding: "0px" }}  >
                            <button className="btn red waves-effect waves-red z-dept-0" style={{ width: "100%", padding: "6px 20px 39px 22px", marginTop: "15px" }}><i className="material-icons">search</i></button>

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
              input{                  
                            border:1px solid lightgrey !important;
                            border-radius:0px !important;
                            padding-left:10px !important;
                            box-sizing: border-box !important;
                            padding-right:10px !important;
                            
                        }input::placeholder{
                            padding-left:10px !important;
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