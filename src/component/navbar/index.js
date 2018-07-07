import React, { Component } from 'react';
import Sidebar from "./sidebar"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { connect } from "react-redux"
import { bindActionCreator } from "redux"
import setAuthorizationToken from "../auth"
import auth from "../../reducer/index"
import $ from "jquery"
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}
class Navbar extends Component {

    // componentDidMount() {
    //   $(window).scroll(()=>{
    //       var nav = document.getElementsByTagName("nav");
    //       if (window.scrollY > 30) {
    //           $("nav").removeClass("transparent")
    //           $("nav").addClass("grey darken-4 slideInDown ")
    //         //   nav[0].removeAttribute("class", "transparent")
    //         //   nav[0].setAttribute("class", " grey darken-4 slideInDown ")
    //           $(".setnav").addClass("navbar-fixed")
    //       }else {
    //           $("nav").removeClass("grey  darken-4 slideInDown")
              
    //         //   nav[0].removeAttribute("class", "grey  darken-4 slideInDown")
              
    //           window.location.pathname === "/" ? $("nav").addClass("transparent") : $("nav").addClass("grey darken-4")
             
    //       }
    //   }
       
    //   )

    // }
    logout() {
        localStorage.removeItem("jwToken");
        setAuthorizationToken(false);
        var url = window.location.pathname;
        window.location.assign("/")
    }
    render() {
        return (
            <div className="setnav navbar-fixed">
                <nav className={classnames(window.location.pathname === "/" || window.location.pathname === "/commingsoon" ? "transparent grey darken-4" : "grey darken-4")} style={{}}>
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left " style={{zIndex:2}}>
                            <li className="hide-on-large-only "><Sidebar {...this.props}/></li>
                            <li> <Link to="/" className="brand-logo" style={{fontSize:"1.4em"}} >UILAUCTION</Link></li>
                        </ul>

                        <ul id="nav-mobile" className="right hide-on-med-and-down ">
                            {/* <li><Link to="/" style={{ position: "relative" }}>Home  <span className="tab-effect"></span></Link></li> */}
                            {/* <li><Link to="/search" style={{ position: "relative" }}>Search  <span className="tab-effect"></span></Link></li> */}
                            <li><Link to="/" style={{ position: "relative" }}>Home  <span className="tab-effect"></span></Link></li>
                            <li><Link to="/marketplace" style={{ position: "relative" }}>Marketplace  <span className="tab-effect"></span></Link></li>
                            <li><Link to="/about" style={{ position: "relative" }}>About us  <span className="tab-effect"></span></Link></li>
                            <li><Link to="/contact" style={{ position: "relative" }}>Contact us  <span className="tab-effect"></span></Link></li>
                            <li><a href="https://facebook.com" target="_blank" style={{ position: "relative" }}>Follow us  <span className="tab-effect"></span></a></li>
                            {/* <li><a href="/media-channel" style={{ position: "relative" }}>Media Channel  <span className="tab-effect"></span></a></li> */}
                            {/* <li><Link to="/news" style={{ position: "relative" }}>News  <span className="tab-effect"></span></Link></li> */}
                            {/* <li><Link to="/login" style={{ position: "relative" }}>Login  <span className="tab-effect"></span></Link></li> */}
                            {this.props.auth.isAuthenticated ? <li><Link to="/dashboard" style={{ position: "relative" }}>Dashboard  <span className="tab-effect"></span></Link></li> : null}
                            {this.props.auth.isAuthenticated ? <li><Link to="#" onClick={this.logout.bind(this)} className="waves-effect btn transparent" style={{ border: "1.5px solid #eee", textTransform: "capitalize" }}>Logout</Link></li>
                                : <li><Link to="/login" className=" btn transparent" style={{ border: "1.5px solid #eee", textTransform: "capitalize" }}>Login/Register</Link></li>}
                        </ul>
                    </div>
                    
                </nav>
                <style>
                    {`
                    nav{
                        display:grid;
                        box-shadow: none;
                        padding: 10px 40px
                    }
                    nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i{
                        height:75px;
                    }
                    nav .tab-effect{
                        left:0;
                        width:0%; 
                        margin:0px auto;   
                        height:2px;
                        position:absolute;
                        background:#f57f17 !important;
                        transition:0.2s ease-in;
                    }
                    nav a:hover .tab-effect{
                        width:100%;
                        margin:0px auto;   
                        transition:0.2s ease-in;
                        
                    }
                         #sidenav-overlay{
                        z-index:2
                    }
                          @media (max-width: 620px) {
                       nav{
                        padding: 0px 0px !important;
                        height:50px;
                    }
                    .row{
                        margin:0px !important
                    }
                    .brand-logo{
                        font-size:0.9em !important;

                    }
                    .navbar-fixed{
                        height:50px !important;
                    }
                    .brand-logo img{
                       width:40px;
                       margin-top:5px;
                        
                    }
                  
                    }
                    `}
                </style>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navbar);