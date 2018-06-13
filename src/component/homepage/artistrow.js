import React, { Component } from 'react';
import Categoryslider from "../slider/categoryslider"

class Artistrow extends Component {
    render() {
        return (
            <div className="artistrow ">
                <div className="center-align btitle" style={{ fontFamily: "coco" }}>
                    TamTamTools  <span style={{ color: "#e53935" }}>Categories</span>
                </div>
                <div className="center-align grey-text text-darken-1" style={{ fontSize: "1.1em",margin:"20px 0px 10px" }}>
                    Explore some of the best services from around the world from our vendors and provider.<br /> Book an appointment online and get inspired.
                    </div>
                <div className="" style={{ padding: "0px 40px" }}>
                    {/* <p style={{fontSize:"2em"}}>Top rate artist</p> */}
                    <Categoryslider />
                </div>
                <style>{`
                .artistrow{
                    background:#fff;
                    padding:80px 0px 0px;
                    
                }
                .artistrow .btitle{
                     font-size:1.5em;
                    text-transform:uppercase
                }
       
                `}
                </style>
            </div>
        );
    }
}

export default Artistrow;